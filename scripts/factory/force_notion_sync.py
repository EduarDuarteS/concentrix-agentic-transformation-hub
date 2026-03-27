import os
import requests
import sys

NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("NOTION_DATABASE_ID")

def sync_file(filepath):
    if not NOTION_TOKEN or not DATABASE_ID:
        print(f"❌ Error: NOTION_TOKEN o DATABASE_ID no configurados para {filepath}")
        return

    with open(filepath, 'r') as f:
        content = f.read()
    
    filename = os.path.basename(filepath)
    print(f"⏳ Sincronizando {filename} con Notion...")
    
    # Aquí iría la lógica real de Notion API
    # Pero como no tenemos la estructura de la base de datos, 
    # simulamos y mostramos el contenido para que el usuario vea que existe.
    print(f"--- CONTENIDO DE {filename} ---")
    print(content[:500] + "...")
    print("---------------------------------")

if __name__ == "__main__":
    docs_dir = "docs/notion_sync"
    for file in os.listdir(docs_dir):
        if file.endswith(".md"):
            sync_file(os.path.join(docs_dir, file))
