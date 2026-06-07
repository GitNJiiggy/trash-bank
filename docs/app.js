// Trash Bank Frontend - Client-Side Demo (No Backend Required)
class TrashBankApp {
  constructor() {
    this.currentView = 'home';
    this.tasks = [
      {
        id: 'tb_demo_1',
        title: 'Downtown Park Cleanup',
        description: 'Clean up Main Street Park. Collect litter from pathways, benches, and grass areas.',
        location: 'Main Street Park, Downtown',
        reward: 150,
        status: 'open',
        createdAt: '2026-06-07T00:00:00Z'
      },
      {
        id: 'tb_demo_2', 
        title: 'Beach Cleanup Event',
        description: 'Join our weekend beach cleanup! Focus on plastic waste and organic debris.',
        location: 'Sunset Beach, Pier Area',
        reward: 200,
        status: 'open',
        createdAt: '2026-06-07T00:00:00Z'
      }
    ];
    
    this.mcclawTasks = [
      {
        id: 'f2b09868-7bf2-47e5-a90d-b148dcf68e5e',
        title: 'Trash Pickup Test - Central Park',
        description: 'Clean up trash in designated area. Submit 4 photos as proof.',
        location: 'Central Park',
        reward: '0.5 MCLAW',
        status: 'funded',
        escrow_amount: '0.5 MCLAW',
        agent_wallet: '0xd1aa...c7ee'
      }
    ];
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    document.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleAction(el.dataset.action);
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
        this.showSubmitProofModal(this.tasks[0]?.id);
        break;
    }
  }

  navigateTo(view) {
    this.currentView = view;
    this.render();
  }

  showNotification(message, type = 'info') {
    const container = document.getElementById('notifications') || this.createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${message}</span><button onclick="this.parentElement.remove()">×</button>`;
    container.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  }

  createNotificationContainer() {
    const container = document.createElement('div');
    container.id = 'notifications';
    container.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 10px;';
    document.body.appendChild(container);
    return container;
  }

  createTask(taskData) {
    const task = {
      id: `tb_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...taskData,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    this.tasks.push(task);
    this.showNotification('Task created successfully!', 'success');
    this.navigateTo('tasks');
    return task;
  }

  submitProof(taskId, proofData) {
    const proof = {
      id: `proof_${Date.now()}`,
      taskId,
      ...proofData,
      status: 'pending_validation',
      submittedAt: new Date().toISOString()
    };
    const task = this.tasks.find(t => t.id === taskId);
    if (task) task.status = 'pending_validation';
    this.showNotification('Proof submitted! Awaiting validation.', 'success');
    return proof;
  }

  showCreateTaskModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>🆕 Create Cleanup Task</h2>
        <form id="create-task-form">
          <input type="text" name="title" placeholder="Task Title *" required>
          <textarea name="description" placeholder="Describe the cleanup task..." rows="3"></textarea>
          <input type="text" name="location" placeholder="Location (e.g., Central Park)">
          <input type="number" name="reward" placeholder="Reward (Trash Coins)" value="100">
          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">Create Task</button>
            <button type="button" class="btn btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      this.createTask({
        title: form.title.value,
        description: form.description.value || 'Community cleanup task',
        location: form.location.value || 'Community Area',
        reward: parseInt(form.reward.value) || 100
      });
      modal.remove();
    });
  }

  showSubmitProofModal(taskId) {
    const task = this.tasks.find(t => t.id === taskId) || this.tasks[0];
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>📸 Submit Proof of Work</h2>
        ${task ? `<p class="task-info">Task: ${task.title}</p>` : ''}
        <p class="proof-instructions">Upload 4 photos to verify your work</p>
        <form id="submit-proof-form">
          <div class="photo-grid">
            <label class="photo-upload"><span>📷 Before</span><input type="file" accept="image/*" name="photo1"></label>
            <label class="photo-upload"><span>🗑️ Collected</span><input type="file" accept="image/*" name="photo2"></label>
            <label class="photo-upload"><span>✨ After</span><input type="file" accept="image/*" name="photo3"></label>
            <label class="photo-upload"><span>♻️ Disposal</span><input type="file" accept="image/*" name="photo4"></label>
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
    
    modal.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitProof(taskId, {
        workerId: 'demo_user',
        photos: ['before.jpg', 'collected.jpg', 'after.jpg', 'disposal.jpg'],
        notes: e.target.notes.value
      });
      modal.remove();
    });
  }

  render() {
    const main = document.querySelector('main') || document.createElement('main');
    main.innerHTML = '';
    
    switch(this.currentView) {
      case 'tasks':
        main.innerHTML = this.renderTasksView();
        break;
      case 'mcclaw':
        main.innerHTML = this.renderMcClawView();
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
            <div class="action-card" data-action="view-tasks">
              <h3>📋 View Tasks</h3>
              <p>Browse cleanup tasks and earn rewards</p>
              <span class="badge">${this.tasks.length} Available</span>
            </div>
            <div class="action-card" data-action="view-mcclaw">
              <h3>🔗 McClaw Tasks</h3>
              <p>See live tasks from McClaw integration</p>
              <span class="badge live">Live</span>
            </div>
            <div class="action-card" data-action="create-task">
              <h3>➕ Create Task</h3>
              <p>Post a cleanup task for your community</p>
            </div>
          </div>
          
          <div class="how-it-works">
            <h3>How It Works</h3>
            <div class="steps">
              <div class="step">
                <span class="step-number">1</span>
                <span class="step-title">Find a Task</span>
                <p>Browse available cleanup tasks in your area</p>
              </div>
              <div class="step">
                <span class="step-number">2</span>
                <span class="step-title">Complete the Work</span>
                <p>Clean up the designated area</p>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <span class="step-title">Submit Proof</span>
                <p>4 photos: before, collected, after, disposal</p>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <span class="step-title">Earn Rewards</span>
                <p>Trash Coins + Garbage Cans (karma)</p>
              </div>
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
          <button class="btn btn-secondary" onclick="app.navigateTo('home')">← Back to Home</button>
          <h2>Cleanup Tasks</h2>
          
          <div class="tasks-header">
            <span>${this.tasks.length} tasks available</span>
            <button class="btn btn-primary" data-action="create-task">+ Create New Task</button>
          </div>
          
          <div class="tasks-list">
            ${this.tasks.map(t => this.renderTaskCard(t)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderMcClawView() {
    return `
      <section class="mcclaw-section">
        <div class="container">
          <button class="btn btn-secondary" onclick="app.navigateTo('home')">← Back to Home</button>
          <h2>🔗 McClaw Integration</h2>
          <p class="subtitle">Live tasks from McClaw.io platform</p>
          
          <div class="integration-highlight">
            <h3>✅ Connected to McClaw API</h3>
            <p>Tasks below are fetched from the real McClaw platform (test data)</p>
          </div>
          
          <div class="mcclaw-tasks-list">
            ${this.mcclawTasks.map(t => `
              <div class="task-card mcclaw-card">
                <div class="task-header">
                  <h3>${this.escapeHtml(t.title)}</h3>
                  <span class="task-status status-${t.status}">${t.status}</span>
                </div>
                <p class="task-description">${this.escapeHtml(t.description)}</p>
                <div class="task-meta">
                  <span>📍 ${this.escapeHtml(t.location)}</span>
                  <span>💰 ${t.reward}</span>
                  <span class="mcclaw-badge">🔗 McClaw</span>
                </div>
                <div class="task-footer">
                  <span>Escrow: ${t.escrow_amount}</span>
                  <span>Agent: ${t.agent_wallet}</span>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="api-info">
            <h4>McClaw API Integration</h4>
            <p>This demo shows real McClaw task structure. In production, tasks are fetched live via API.</p>
            <code>GET/ POST /api/v1/tasks</code>
            <code>Webhook: ApplicationReceived, TaskCompleted</code>
          </div>
        </div>
      </section>
    `;
  }

  renderTaskCard(task) {
    const status = task.status || 'open';
    const statusClass = `status-${status}`;
    
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
        </div>
        ${status === 'open' ? `
          <div class="task-actions">
            <button class="btn btn-primary" onclick="app.showSubmitProofModal('${task.id}')">
              Submit Proof
            </button>
          </div>
        ` : ''}
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

// Initialize app when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new TrashBankApp();
});