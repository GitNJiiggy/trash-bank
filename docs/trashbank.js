// Trash Bank Frontend Integration
// Connects to backend API for live task management

class TrashBank {
  constructor(apiUrl = 'http://localhost:3000') {
    this.apiUrl = apiUrl;
  }

  async request(endpoint, options = {}) {
    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response.json();
  }

  // Tasks
  async createTask(task) {
    return this.request('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
  }

  async getTasks() {
    return this.request('/api/tasks');
  }

  async getTask(id) {
    return this.request(`/api/tasks/${id}`);
  }

  // Proof submission
  async submitProof(taskId, proof) {
    return this.request(`/api/tasks/${taskId}/submit`, {
      method: 'POST',
      body: JSON.stringify(proof)
    });
  }

  // Validation
  async validateProof(proofId, approved, notes = '') {
    return this.request(`/api/proofs/${proofId}/validate`, {
      method: 'POST',
      body: JSON.stringify({ approved, validatorId: 'web_user', notes })
    });
  }

  // Stats
  async getWorkerStats(workerId) {
    return this.request(`/api/workers/${workerId}/stats`);
  }
}

// Export for use
if (typeof module !== 'undefined') {
  module.exports = TrashBank;
}