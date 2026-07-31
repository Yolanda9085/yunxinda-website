"""硬编码的结直肠癌治疗费用和生存率数据。"""

COST_DATA = {
    "early": {
        "stage": "早期（I-II期）",
        "treatment_cost_range": "2-3万元",
        "five_year_survival_rate": "90%以上",
        "description": "早期发现可通过内镜切除或微创手术治疗，费用低、恢复快",
    },
    "late": {
        "stage": "晚期（III-IV期）",
        "treatment_cost_range": "30-100万元",
        "five_year_survival_rate": "约30%",
        "description": "晚期需要手术+化疗+靶向治疗，周期长、费用高、预后差",
    },
}

SCREENING_COST = "889元/次"
SCREENING_BENEFIT = "可提早5-7年发现癌前病变，将治疗费用控制在早期水平"


def get_consequence_data(risk_level: str) -> dict:
    """根据风险等级返回费用对比数据。"""
    return {
        "early_detection": COST_DATA["early"],
        "late_detection": COST_DATA["late"],
        "screening_cost": SCREENING_COST,
        "screening_benefit": SCREENING_BENEFIT,
        "risk_level": risk_level,
    }
