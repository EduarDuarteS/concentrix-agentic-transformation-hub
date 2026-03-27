import json
import os
from datetime import datetime

# Rutas del Monorepo
SALES_DATA_PATH = "/home/node/.openclaw/workspace/apps/web/src/data/sales/sales_data.json"

def initialize_business_dashboard():
    """Pre-pobla el Business Dashboard con placeholders estratégicos para Concentrix"""
    
    os.makedirs(os.path.dirname(SALES_DATA_PATH), exist_ok=True)
    
    initial_data = {
        "metadata": {
            "last_updated": datetime.now().isoformat(),
            "status": "AWAITING_DEMO_PARAMETERS",
            "architecture_version": "5.2"
        },
        "roi_metrics": {
            "human_cost_per_contact": 4.50,
            "agent_ai_cost_per_contact": 0.15,
            "projected_savings_percentage": 96.6,
            "break_even_months": 2
        },
        "ttm_comparison": {
            "traditional_sprint_days": 14,
            "nhitl_factory_minutes": 40,
            "velocity_increase": "500x"
        },
        "staffing_optimization": {
            "devs_required_traditional": 8,
            "architects_required_nhitl": 1,
            "role": "Solution Architect"
        }
    }
    
    with open(SALES_DATA_PATH, 'w') as f:
        json.dump(initial_data, f, indent=2)
    
    print(f"📊 Sifu: Business Dashboard inicializado con KPIs estratégicos en {SALES_DATA_PATH}")

if __name__ == "__main__":
    initialize_business_dashboard()
