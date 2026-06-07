require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3001;
const isVercel = process.env.VERCEL === '1';
const API_KEY = process.env.TRASHBANK_API_KEY || 'demo-key-please-change';

// Vercel serverless exports
if (isVercel) {
  module.exports = app;
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});

// CORS - restrict in production
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['https://gitnjiiggy.github.io', 'http://localhost:3000', 'http://localhost:3001'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../docs')));

// Apply rate limiting to API routes
app.use('/api/', limiter);

// McClaw API configuration
const MCCLAW_API_URL = process.env.MCCLAW_API_URL || 'https://mcclaw.io/api/v1';
const MCCLAW_API_KEY = process.env.MCCLAW_API_KEY;

// In-memory stores (for demo - use DB in production)
const tasks = new Map();
const proofSubmissions = new Map();
const apiKeys = new Set([API_KEY]); // Add more keys as needed

// Input validation
function validateTaskInput(body) {
  const errors = [];
  if (body.title && body.title.length > 200) errors.push('Title too long');
  if (body.description && body.description.length > 2000) errors.push('Description too long');
  if (body.reward && (body.reward < 1 || body.reward > 10000)) errors.push('Reward must be 1-10000');
  if (body.coordinates) {
    if (body.coordinates.lat && (body.coordinates.lat < -90 || body.coordinates.lat > 90)) {
      errors.push('Invalid latitude');
    }
    if (body.coordinates.lng && (body.coordinates.lng < -180 || body.coordinates.lng > 180)) {
      errors.push('Invalid longitude');
    }
  }
  return errors;
}

function sanitize(str) {
  if (!str) return str;
  return str.replace(/[<>]/g, '');
}

// API Key auth middleware
function requireAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  
  // Demo mode - allow without auth for hackathon
  if (process.env.DEMO_MODE === 'true') {
    return next();
  }
  
  if (!apiKey || !apiKeys.has(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  next();
}

// Helper: Call McClaw API
async function mcclawApi(endpoint, method = 'GET', body = null) {
  const fetch = (await import('node-fetch')).default;
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': MCCLAW_API_KEY
  };
  
  const response = await fetch(`${MCCLAW_API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });
  return response.json();
}

// Routes

// Health check (public)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mcclaw: MCCLAW_API_KEY ? 'configured' : 'not_configured',
    version: '1.0.0'
  });
});

// Sync tasks from McClaw (public for demo)
app.get('/api/mcclaw/tasks', async (req, res) => {
  try {
    const result = await mcclawApi('/tasks');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch McClaw tasks' });
  }
});

// Create a cleanup task
app.post('/api/tasks', requireAuth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      location, 
      reward,
      coordinates 
    } = req.body;

    // Validate input
    const errors = validateTaskInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Create task on McClaw
    const mcclawTask = {
      title: sanitize(title) || 'Community Cleanup Task',
      description: sanitize(description) || 'Help clean up your neighborhood and earn Trash Coins!',
      reward: parseInt(reward) || 100,
      location: sanitize(location) || 'Community Area',
      type: 'cleanup',
      metadata: {
        coordinates,
        platform: 'trash-bank',
        proofRequired: ['before', 'collected', 'after', 'disposal']
      }
    };

    // Try to create on McClaw, fallback to local for demo
    let mcclawResponse = null;
    try {
      mcclawResponse = await mcclawApi('/tasks', 'POST', mcclawTask);
      if (mcclawResponse.error) {
        console.log('McClaw error:', mcclawResponse.error);
        mcclawResponse = null;
      }
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
    
    res.json({ success: true, task, mcclawSynced: !!mcclawResponse });
  } catch (error) {
    console.error('Task creation error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// List tasks (public for demo)
app.get('/api/tasks', (req, res) => {
  const taskList = Array.from(tasks.values());
  res.json({ tasks: taskList, count: taskList.length });
});

// Get single task (public for demo)
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// Submit proof of work
app.post('/api/tasks/:id/submit', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { workerId, photos, gps, notes } = req.body;
    
    // Validate
    if (!photos || photos.length < 4) {
      return res.status(400).json({ 
        error: 'Insufficient proof', 
        required: ['before', 'collected', 'after', 'disposal'],
        provided: photos?.length || 0
      });
    }

    const task = tasks.get(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const proofId = `proof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const proof = {
      id: proofId,
      taskId: id,
      workerId: sanitize(workerId) || 'anonymous',
      photos: photos.map(sanitize),
      gps,
      notes: sanitize(notes),
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
    console.error('Proof submission error:', error);
    res.status(500).json({ error: 'Failed to submit proof' });
  }
});

// Validate proof (requires auth in production)
app.post('/api/proofs/:proofId/validate', requireAuth, async (req, res) => {
  try {
    const { proofId } = req.params;
    const { approved, validatorId, notes } = req.body;
    
    const proof = proofSubmissions.get(proofId);
    if (!proof) {
      return res.status(404).json({ error: 'Proof not found' });
    }

    if (proof.status !== 'pending_validation') {
      return res.status(400).json({ error: 'Proof already validated' });
    }

    proof.status = approved ? 'approved' : 'rejected';
    proof.validatedBy = sanitize(validatorId) || 'validator';
    proof.validatedAt = new Date().toISOString();
    proof.validationNotes = sanitize(notes);
    
    proofSubmissions.set(proofId, proof);

    const task = tasks.get(proof.taskId);
    if (task && approved) {
      task.status = 'completed';
      task.completedBy = proof.workerId;
      tasks.set(proof.taskId, task);
    }
    
    res.json({ 
      success: true, 
      proof,
      reward: approved ? { coins: task?.reward || 100, karma: 10 } : null
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ error: 'Failed to validate proof' });
  }
});

// Get worker stats (public for demo)
app.get('/api/workers/:workerId/stats', (req, res) => {
  const proofs = Array.from(proofSubmissions.values())
    .filter(p => p.workerId === req.params.workerId);
  
  const completed = proofs.filter(p => p.status === 'approved').length;
  
  res.json({
    workerId: req.params.workerId,
    tasksCompleted: completed,
    trashCoins: completed * 100,
    garbageCans: completed * 10,
    validationsDone: 0,
    memberSince: '2026-01-15'
  });
});

// McClaw webhook handler with signature verification
app.post('/api/webhooks/mcclaw', async (req, res) => {
  try {
    const signature = req.headers['x-mcclaw-signature'];
    const payload = JSON.stringify(req.body);
    
    // Verify signature in production
    if (process.env.MCCLAW_WEBHOOK_SECRET && !process.env.DEMO_MODE) {
      const expected = crypto
        .createHmac('sha256', process.env.MCCLAW_WEBHOOK_SECRET)
        .update(payload)
        .digest('hex');
      
      if (signature !== expected) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }
    
    const { event, data } = req.body;
    console.log(`Received McClaw webhook: ${event}`);
    
    switch (event) {
      case 'ApplicationReceived':
        console.log(`Worker ${data.workerId} applied for task ${data.taskId}`);
        break;
        
      case 'TaskCompleted':
        console.log(`Task ${data.taskId} completed`);
        break;
        
      default:
        console.log(`Unhandled event: ${event}`);
    }
    
    res.json({ received: true, event });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  // On Vercel, serve static docs
  if (isVercel) {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../docs/index.html'));
  }
});

// Vercel serverless export
export default app;

// Only listen on non-Vercel environments (local development)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🗑️ Trash Bank API running on port ${PORT}`);
    console.log(`📊 Health: http://localhost:${PORT}/api/health`);
    console.log(`🔗 McClaw API: ${MCCLAW_API_URL}`);
    console.log(`🔒 Security: CORS restricted, rate limiting enabled`);
  });
}