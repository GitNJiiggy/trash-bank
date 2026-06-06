// Trash Bank Frontend - Interactive Demo
class TrashBankApp {
  constructor() {
    this.apiUrl = window.location.hostname === 'gitnjiiggy.github.io' 
      ? 'https://80.241.212.30:3001' // Production API (need to expose)
      : 'http://localhost:3001';
    this.currentView = 'home';
    this.tasks = [];
    this.init();
  }

  async init() {
    await this.loadTasks();
    this.setupEventListeners();
    this.render();
  }

  // API Calls
  async api(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return { error: error.message };
    }
  }

  async loadTasks() {
    const result = await this.api('/api/tasks');
    if (result.tasks) {
      this.tasks = result.tasks;
    }
  }

  async loadMcClawTasks() {
    const result = await this.api('/api/mcclaw/tasks');
    if (result.tasks) {
      return result.tasks;
    }
    return [];
  }

  // Task Operations
  async createTask(taskData) {
    const result = await this.api('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
    if (result.success) {
      await this.loadTasks();
      this.showNotification('Task created successfully!', 'success');
      return result.task;
    }
    this.showNotification(result.error || 'Failed to create task', 'error');
    return null;
  }

  async submitProof(taskId, proofData) {
    const result = await this.api(`/api/tasks/${taskId}/submit`, {
      method: 'POST',
      body: JSON.stringify(proofData)
    });
    if (result.success) {
      this.showNotification('Proof submitted! Awaiting validation.', 'success');
      return result.proof;
    }
    this.showNotification(result.error || 'Failed to submit proof', 'error');
    return null;
  }

  // UI Helpers
  showNotification(message, type = 'info') {
    const container = document.getElementById('notifications') || this.createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  }

  createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notifications';
    container.style.cssText = `
      position: fixed; top: 80px; right: 20px; z-index: 9999;
      display: flex; flex-direction: column; gap: 10px;
    `;
    document.body.appendChild(container);
    return container;
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const action = el.dataset.action;
        this.handleAction(action);
      });
    });
  }

  handleAction(action) {
    switch(action) {
      case 'create-task':
        this.showCreateTaskModal();
        break;
      case 'view-tasks':
        this.navigateTo('tasks');
        break;
      case 'view-mcclaw':
        this.navigateTo('mcclaw');
        break;
      case 'submit-proof':
        this.showSubmitProofModal();
        break;
    }
  }

  navigateTo(view) {
    this.currentView = view;
    this.render();
  }

  // Modals
  showCreateTaskModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Create Cleanup Task</h2>
        <form id="create-task-form">
          <input type="text" name="title" placeholder="Task Title" required>
          <textarea name="description" placeholder="Describe the cleanup task..." rows="3"></textarea>
          <input type="text" name="location" placeholder="Location (e.g., Central Park)">
          <input type="number" name="reward" placeholder="Reward (Trash Coins)" value="100">
          <small>GPS coordinates (optional)</small>
          <div class="coords-row">
            <input type="number" step="any" name="lat" placeholder="Latitude">
            <input type="number" step="any" name="lng" placeholder="Longitude">
          </div>
          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">Create Task</button>
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const taskData = {
        title: form.title.value,
        description: form.description.value,
        location: form.location.value,
        reward: parseInt(form.reward.value) || 100,
        coordinates: form.lat.value && form.lng.value ? {
          lat: parseFloat(form.lat.value),
          lng: parseFloat(form.lng.value)
        } : undefined
      };
      const task = await this.createTask(taskData);
      if (task) {
        modal.remove();
        this.navigateTo('tasks');
      }
    });
  }

  showSubmitProofModal(taskId) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Submit Proof of Work</h2>
        <p class="proof-instructions">Upload 4 photos: Before, Collected, After, Disposal</p>
        <form id="submit-proof-form">
          <input type="hidden" name="taskId" value="${taskId}">
          <input type="text" name="workerId" placeholder="Your Worker ID" value="worker_demo">
          <div class="photo-grid">
            <label class="photo-upload">
              <span>📷 Before</span>
              <input type="file" accept="image/*" name="photo1">
            </label>
            <label class="photo-upload">
              <span>🗑️ Collected</span>
              <input type="file" accept="image/*" name="photo2">
            </label>
            <label class="photo-upload">
              <span>✨ After</span>
              <input type="file" accept="image/*" name="photo3">
            </label>
            <label class="photo-upload">
              <span>♻️ Disposal</span>
              <input type="file" accept="image/*" name="photo4">
            </label>
          </div>
          <textarea name="notes" placeholder="Notes (optional)" rows="2"></textarea>
          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">Submit Proof</button>
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('form').addEventListener('submit', async (e) => {
      e.preventDefault();
      // Demo mode - simulate photo URLs
      const proofData = {
        workerId: 'worker_demo',
        photos: ['before.jpg', 'collected.jpg', 'after.jpg', 'disposal.jpg'],
        notes: e.target.notes.value
      };
      const proof = await this.submitProof(taskId, proofData);
      if (proof) {
        modal.remove();
      }
    });
  }

  // Render
  render() {
    const main = document.querySelector('main') || document.createElement('main');
    
    switch(this.currentView) {
      case 'tasks':
        main.innerHTML = this.renderTasksView();
        break;
      case 'mcclaw':
        main.innerHTML = this.renderMcClawView();
        this.loadMcClawTasks().then(tasks => {
          const container = document.getElementById('mcclaw-tasks');
          if (container) {
            container.innerHTML = tasks.length > 0 
              ? tasks.map(t => this.renderTaskCard(t)).join('')
              : '<p>No McClaw tasks found</p>';
          }
        });
        break;
      default:
        main.innerHTML = this.renderHomeView();
    }
    
    if (!document.querySelector('main')) {
      document.body.appendChild(main);
    }
    
    this.setupEventListeners();
  }

  renderHomeView() {
    return `
      <section class="demo-section">
        <div class="container">
          <h2>🎉 Try Trash Bank</h2>
          <p>Experience the cleanup economy in action</p>
          
          <div class="action-cards">
            <div class="action-card" onclick="app.navigateTo('tasks')">
              <h3>📋 View Tasks</h3>
              <p>Browse cleanup tasks and earn rewards</p>
              <span class="badge">${this.tasks.length} Available</span>
            </div>
            <div class="action-card" onclick="app.navigateTo('mcclaw')">
              <h3>🔗 McClaw Tasks</h3>
              <p>See live tasks from McClaw integration</p>
              <span class="badge">Live</span>
            </div>
            <div class="action-card" data-action="create-task">
              <h3>➕ Create Task</h3>
              <p>Post a cleanup task for your community</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderTasksView() {
    return `
      <section class="tasks-section">
        <div class="container">
          <button class="btn btn-secondary" onclick="app.navigateTo('home')">← Back</button>
          <h2>Cleanup Tasks</h2>
          
          <div class="tasks-header">
            <span>${this.tasks.length} tasks available</span>
            <button class="btn btn-primary" data-action="create-task">+ Create New Task</button>
          </div>
          
          <div class="tasks-list">
            ${this.tasks.length > 0 
              ? this.tasks.map(t => this.renderTaskCard(t)).join('')
              : this.renderEmptyTasks()
            }
          </div>
        </div>
      </section>
    `;
  }

  renderMcClawView() {
    return `
      <section class="mcclaw-section">
        <div class="container">
          <button class="btn btn-secondary" onclick="app.navigateTo('home')">← Back</button>
          <h2>McClaw Integration</h2>
          <p class="subtitle">Live tasks from McClaw.io API</p>
          
          <div class="integration-highlight">
            <h3>✅ Connected to McClaw API</h3>
            <p>Tasks below are fetched live from the McClaw platform</p>
          </div>
          
          <div id="mcclaw-tasks" class="tasks-list">
            <p>Loading...</p>
          </div>
        </div>
      </section>
    `;
  }

  renderTaskCard(task) {
    const status = task.status || 'open';
    const statusClass = status === 'open' ? 'status-open' : 
                        status === 'pending_validation' ? 'status-pending' : 
                        'status-completed';
    
    return `
      <div class="task-card ${statusClass}">
        <div class="task-header">
          <h3>${this.escapeHtml(task.title)}</h3>
          <span class="task-status ${statusClass}">${status}</span>
        </div>
        <p class="task-description">${this.escapeHtml(task.description || 'No description')}</p>
        <div class="task-meta">
          <span>📍 ${this.escapeHtml(task.location || 'Unknown')}</span>
          <span>💰 ${task.reward || 100} Coins</span>
          ${task.mcclawId ? '<span class="mcclaw-badge">🔗 McClaw</span>' : ''}
        </div>
        ${status === 'open' ? `
          <button class="btn btn-primary" onclick="app.showSubmitProofModal('${task.id}')">
            Submit Proof
          </button>
        ` : ''}
      </div>
    `;
  }

  renderEmptyTasks() {
    return `
      <div class="empty-state">
        <h3>No tasks yet</h3>
        <p>Be the first to create a cleanup task!</p>
        <button class="btn btn-primary" data-action="create-task">Create Task</button>
      </div>
    `;
  }

  escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }
}

// Styles
const styles = document.createElement('style');
styles.textContent = `
  /* App Styles */
  main { min-height: calc(100vh - 200px); padding: 20px; }
  
  .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
  
  .demo-section { background: linear-gradient(135deg, rgba(0,255,136,0.05) 0%, transparent 100%); padding: 60px 20px; }
  
  .action-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-top: 40px; }
  
  .action-card {
    background: var(--bg-card, #0d0d0d);
    border: 1px solid var(--border, #1f1f1f);
    border-radius: 20px;
    padding: 32px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .action-card:hover {
    border-color: var(--accent, #00ff88);
    transform: translateY(-4px);
  }
  .action-card h3 { font-size: 20px; margin-bottom: 12px; color: #fff; }
  .action-card p { color: var(--text-secondary, #a3a3a3); font-size: 14px; }
  .badge { 
    display: inline-block; 
    background: var(--accent, #00ff88); 
    color: #000; 
    padding: 4px 12px; 
    border-radius: 100px; 
    font-size: 12px; 
    font-weight: 600; 
    margin-top: 16px; 
  }
  
  /* Tasks */
  .tasks-section { padding: 40px 20px; }
  .tasks-header { display: flex; justify-content: space-between; align-items: center; margin: 32px 0; }
  
  .task-card {
    background: var(--bg-card, #0d0d0d);
    border: 1px solid var(--border, #1f1f1f);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 16px;
  }
  .task-card:hover { border-color: var(--accent, #00ff88); }
  
  .task-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .task-header h3 { font-size: 18px; color: #fff; margin: 0; }
  
  .task-status { 
    font-size: 11px; 
    padding: 4px 10px; 
    border-radius: 100px; 
    text-transform: uppercase; 
    font-weight: 600; 
  }
  .status-open { background: rgba(0,255,136,0.2); color: #00ff88; }
  .status-pending { background: rgba(255,170,0,0.2); color: #ffaa00; }
  .status-completed { background: rgba(100,100,100,0.2); color: #888; }
  
  .task-description { color: var(--text-secondary, #a3a3a3); font-size: 14px; margin-bottom: 16px; }
  .task-meta { display: flex; gap: 16px; font-size: 13px; color: var(--text-muted, #525252); }
  .mcclaw-badge { background: rgba(0,255,136,0.1); color: #00ff88; padding: 2px 8px; border-radius: 4px; }
  
  /* Modal */
  .modal {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8);
    display: flex; align-items: center; justify-content: center;
    z-index: 10000; padding: 20px;
  }
  .modal-content {
    background: var(--bg-card, #0d0d0d);
    border: 1px solid var(--border, #1f1f1f);
    border-radius: 24px; padding: 32px;
    max-width: 500px; width: 100%;
    max-height: 90vh; overflow-y: auto;
  }
  .modal-content h2 { margin-bottom: 24px; }
  .modal-content input, .modal-content textarea {
    width: 100%; padding: 12px 16px;
    background: var(--bg-dark, #050505);
    border: 1px solid var(--border, #1f1f1f);
    border-radius: 12px; color: #fff;
    font-size: 14px; margin-bottom: 16px;
  }
  .modal-content input:focus, .modal-content textarea:focus {
    outline: none; border-color: var(--accent, #00ff88);
  }
  .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
  
  .photo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 16px 0; }
  .photo-upload {
    border: 2px dashed var(--border, #1f1f1f);
    border-radius: 12px; padding: 20px;
    text-align: center; cursor: pointer;
    transition: all 0.2s;
  }
  .photo-upload:hover { border-color: var(--accent, #00ff88); }
  .photo-upload input { display: none; }
  .photo-upload span { font-size: 32px; }
  
  /* Notifications */
  .notification {
    background: var(--bg-card, #0d0d0d);
    border: 1px solid var(--border, #1f1f1f);
    border-radius: 12px; padding: 16px 20px;
    display: flex; align-items: center; gap: 12px;
    animation: slideIn 0.3s ease;
  }
  .notification-success { border-color: var(--accent, #00ff88); }
  .notification-error { border-color: #ff4444; }
  @keyframes slideIn { from { transform: translateX(100%); } }
  
  .btn-primary {
    background: var(--accent, #00ff88);
    color: #000;
    border: none;
  }
  .btn-secondary {
    background: transparent;
    color: #fff;
    border: 1px solid var(--border, #1f1f1f);
  }
  
  .empty-state { text-align: center; padding: 60px 20px; }
  .empty-state h3 { margin-bottom: 12px; color: #fff; }
  .empty-state p { color: var(--text-secondary, #a3a3a3); margin-bottom: 24px; }
  
  .integration-highlight {
    background: rgba(0,255,136,0.1);
    border: 1px solid var(--accent, #00ff88);
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    margin: 24px 0;
  }
  .integration-highlight h3 { color: var(--accent, #00ff88); margin-bottom: 8px; }
  
  @media (max-width: 600px) {
    .photo-grid { grid-template-columns: 1fr; }
    .action-cards { grid-template-columns: 1fr; }
  }
`;
document.head.appendChild(styles);

// Init app
const app = new TrashBankApp();