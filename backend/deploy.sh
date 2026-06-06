#!/bin/bash
# Deploy Trash Bank Backend
# Run on VPS

cd /home/agent/.openclaw/workspace/projects/trash-bank/backend

# Install dependencies
npm install

# Create systemd service
sudo cat > /etc/systemd/system/trashbank.service << 'EOF'
[Unit]
Description=Trash Bank API Server
After=network.target

[Service]
Type=simple
User=agent
WorkingDirectory=/home/agent/.openclaw/workspace/projects/trash-bank/backend
EnvironmentFile=/home/agent/.openclaw/gateway.systemd.env
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable trashbank
sudo systemctl restart trashbank

echo "Trash Bank API deployed on port 3000"
echo "Health: http://localhost:3000/api/health"