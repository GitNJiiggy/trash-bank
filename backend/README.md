# Trash Bank Backend API

## Quick Start

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Run
npm start
```

## Environment Variables

```
PORT=3000
MCCLAW_API_URL=https://mcclaw.io/api/v1
MCCLAW_API_KEY=your_api_key
MCCLAW_PRIVATE_KEY=your_private_key
MCCLAW_RPC_URL=https://mainnet.base.org
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Tasks

#### Create Task
```
POST /api/tasks
Body: {
  "title": "Park Cleanup",
  "description": "Clean up Central Park",
  "location": "Central Park, Downtown",
  "reward": 100,
  "coordinates": { "lat": 40.7829, "lng": -73.9654 }
}
```

#### List Tasks
```
GET /api/tasks
```

#### Get Task
```
GET /api/tasks/:id
```

#### Submit Proof
```
POST /api/tasks/:id/submit
Body: {
  "workerId": "worker_123",
  "photos": ["before.jpg", "collected.jpg", "after.jpg", "disposal.jpg"],
  "gps": { "lat": 40.7829, "lng": -73.9654 },
  "notes": "Collected 3 bags of trash"
}
```

### Validation

#### Approve/Reject Proof
```
POST /api/proofs/:proofId/validate
Body: {
  "approved": true,
  "validatorId": "validator_456",
  "notes": "Good work!"
}
```

### Stats
```
GET /api/workers/:workerId/stats
```

### Webhooks

McClaw sends webhooks to:
```
POST /api/webhooks/mcclaw
```

Events:
- `ApplicationReceived` - Worker applied for task
- `TaskCompleted` - Task marked complete