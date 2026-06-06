require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { ethers } = require('ethers');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../docs')));

// McClaw API configuration
const MCCLAW_API_URL = process.env.MCCLAW_API_URL || 'https://mcclaw.io/api/v1';
const MCCLAW_API_KEY = process.env.MCCLAW_API_KEY;
const MCCLAW_PRIVATE_KEY = process.env.MCCLAW_PRIVATE_KEY;
const MCCLAW_RPC_URL = process.env.MCCLAW_RPC_URL || 'https://mainnet.base.org';

// In-memory task store (for demo - use DB in production)
const tasks = new Map();
const proofSubmissions = new Map();

// Helper: Call McClaw API
async function mcclawApi(endpoint, method = 'GET', body = null) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`${MCCLAW_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${MCCLAW_API_KEY}`,
      'X-API-Key': MCCLAW_API_KEY
    },
    body: body ? JSON.stringify(body) : null
  });
  return response.json();
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mcclaw: MCCLAW_API_KEY ? 'configured' : 'not_configured'
  });
});

// Create a cleanup task
app.post('/api/tasks', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      location, 
      reward,
      coordinates 
    } = req.body;

    // Create task on McClaw
    const mcclawTask = {
      title: title || 'Community Cleanup Task',
      description: description || 'Help clean up your neighborhood and earn Trash Coins!',
      reward: reward || 100,
      location: location || 'Community Area',
      type: 'cleanup',
      metadata: {
        coordinates,
        platform: 'trash-bank',
        proofRequired: ['before', 'collected', 'after', 'disposal']
      }
    };

    // Try to create on McClaw, but fallback to local for demo
    let mcclawResponse = null;
    try {
      mcclawResponse = await mcclawApi('/tasks', 'POST', mcclawTask);
    } catch (e) {
      console.log('McClaw API not available, creating local task');
    }

    const taskId = mcclawResponse?.id || `tb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const task = {
      id: taskId,
      ...mcclawTask,
      status: 'open',
      createdAt: new Date().toISOString(),
      mcclawId: mcclawResponse?.id || null
    };
    
    tasks.set(taskId, task);
    
    res.json({ success: true, task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List tasks
app.get('/api/tasks', (req, res) => {
  const taskList = Array.from(tasks.values());
  res.json({ tasks: taskList, count: taskList.length });
});

// Get single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Submit proof of work
app.post('/api/tasks/:id/submit', async (req, res) => {
  try {
    const { id } = req.params;
    const { workerId, photos, gps, notes } = req.body;
    
    const task = tasks.get(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Validate proof of work (4-photo system)
    if (!photos || photos.length < 4) {
      return res.status(400).json({ 
        error: 'Insufficient proof', 
        required: ['before', 'collected', 'after', 'disposal'],
        provided: photos?.length || 0
      });
    }

    const proofId = `proof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const proof = {
      id: proofId,
      taskId: id,
      workerId,
      photos,
      gps,
      notes,
      submittedAt: new Date().toISOString(),
      status: 'pending_validation'
    };
    
    proofSubmissions.set(proofId, proof);
    task.status = 'pending_validation';
    tasks.set(id, task);
    
    res.json({ 
      success: true, 
      proof,
      message: 'Proof submitted! Awaiting validation.' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Validate proof (validator endpoint)
app.post('/api/proofs/:proofId/validate', async (req, res) => {
  try {
    const { proofId } = req.params;
    const { approved, validatorId, notes } = req.body;
    
    const proof = proofSubmissions.get(proofId);
    if (!proof) {
      return res.status(404).json({ error: 'Proof not found' });
    }

    proof.status = approved ? 'approved' : 'rejected';
    proof.validatedBy = validatorId;
    proof.validatedAt = new Date().toISOString();
    proof.validationNotes = notes;
    
    proofSubmissions.set(proofId, proof);

    const task = tasks.get(proof.taskId);
    if (task && approved) {
      task.status = 'completed';
      tasks.set(proof.taskId, task);
    }
    
    res.json({ 
      success: true, 
      proof,
      reward: approved ? { coins: 100, karma: 10 } : null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get worker stats
app.get('/api/workers/:workerId/stats', (req, res) => {
  // Demo data
  res.json({
    workerId: req.params.workerId,
    tasksCompleted: 47,
    trashCoins: 4700,
    garbageCans: 470,
    validationsDone: 12,
    memberSince: '2026-01-15'
  });
});

// McClaw webhook handler
app.post('/api/webhooks/mcclaw', async (req, res) => {
  try {
    const { event, data } = req.body;
    
    console.log(`Received McClaw webhook: ${event}`);
    
    switch (event) {
      case 'ApplicationReceived':
        // Someone applied for a task
        console.log(`Worker ${data.workerId} applied for task ${data.taskId}`);
        break;
        
      case 'TaskCompleted':
        // Task marked complete on McClaw
        console.log(`Task ${data.taskId} completed`);
        // Award tokens here
        break;
        
      default:
        console.log(`Unhandled event: ${event}`);
    }
    
    res.json({ received: true, event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

app.listen(PORT, () => {
  console.log(`🗑️ Trash Bank API running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔗 McClaw API: ${MCCLAW_API_URL}`);
});