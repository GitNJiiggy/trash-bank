#!/usr/bin/env python3
import http.server
import socketserver
import base64
import os

PORT = 8080
USERNAME = "TrashPanda"
PASSWORD = "TrashBankTakeOver2026"

class AuthHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if not self.authenticate():
            self.send_response(401)
            self.send_header('WWW-Authenticate', 'Basic realm="Trash Bank Demo"')
            self.end_headers()
            self.wfile.write(b'Authentication required')
            return
        super().do_GET()
    
    def do_HEAD(self):
        if not self.authenticate():
            self.send_response(401)
            self.send_header('WWW-Authenticate', 'Basic realm="Trash Bank Demo"')
            self.end_headers()
            return
        super().do_HEAD()
    
    def authenticate(self):
        auth = self.headers.get('Authorization')
        if auth is None:
            return False
        try:
            encoded = auth.split(' ')[1]
            decoded = base64.b64decode(encoded).decode('utf-8')
            username, password = decoded.split(':')
            return username == USERNAME and password == PASSWORD
        except:
            return False

os.chdir('/home/agent/.openclaw/workspace/projects/trash-bank/mockup')

with socketserver.TCPServer(("", PORT), AuthHandler) as httpd:
    print(f"Serving at http://80.241.212.30:{PORT}")
    print(f"Username: {USERNAME}")
    print(f"Password: {PASSWORD}")
    httpd.serve_forever()