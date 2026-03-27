import os
import json
import base64
import subprocess

NODE_ID = "0b60b0be3c14c58d78526fd51742fde7ba97e9c0e6eddad44ea0c6a9ccdad5c7"
LOCAL_DIR = "/home/node/.openclaw/workspace/demo_factory"
REMOTE_BASE = "E:\\concentrix\\demo_factory"

def run_remote_cmd(ps_cmd):
    params = json.dumps({"command": f"powershell -Command \"{ps_cmd}\""})
    cmd = [
        "openclaw", "nodes", "invoke", 
        "--node", NODE_ID, 
        "--command", "system.run", 
        "--params", params
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result

def deploy():
    print(f"🚀 Starting deployment to {REMOTE_BASE} on node {NODE_ID}...")
    
    # 1. List files
    files_to_transfer = []
    for root, dirs, files in os.walk(LOCAL_DIR):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, LOCAL_DIR)
            files_to_transfer.append((full_path, rel_path))

    for local_path, rel_path in files_to_transfer:
        remote_path = os.path.join(REMOTE_BASE, rel_path).replace("/", "\\")
        remote_dir = os.path.dirname(remote_path)
        
        print(f"📦 Transferring: {rel_path} -> {remote_path}")
        
        with open(local_path, "rb") as f:
            content_b64 = base64.b64encode(f.read()).decode("utf-8")
        
        # PS command to ensure dir and write file from b64
        ps_script = f"""
        $path = '{remote_path}';
        $dir = Split-Path $path;
        if (!(Test-Path $dir)) {{ New-Item -ItemType Directory -Force -Path $dir | Out-Null }};
        $bytes = [Convert]::FromBase64String('{content_b64}');
        [IO.File]::WriteAllBytes($path, $bytes);
        """
        # Cleanup ps_script for single line
        ps_script = ps_script.replace("\n", "").replace("  ", "")
        
        res = run_remote_cmd(ps_script)
        if res.returncode != 0:
            print(f"❌ Error transferring {rel_path}: {res.stderr}")
        else:
            print(f"✅ OK")

if __name__ == "__main__":
    deploy()
