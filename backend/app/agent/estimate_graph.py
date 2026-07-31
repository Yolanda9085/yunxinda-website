"""基于 LangGraph 的多步骤风险评估管道。

流程：assess_risk → estimate_consequence → generate_recommendation → critique
"""

import json
import os
import re
from typing import TypedDict

from langgraph.graph import StateGraph, END
from openai import AsyncOpenAI

from app.agent.prompts import (
    ASSESS_RISK_PROMPT,
    GENERATE_RECOMMENDATION_PROMPT,
    CRITIQUE_PROMPT,
)
from app.services.cost_data import get_consequence_data


class EstimateState(TypedDict):
    """管道共享状态。"""
    user_input: str
    risk_level: str
    risk_factors: list[str]
    risk_reasoning: str
    early_cost: str
    early_survival: str
    late_cost: str
    late_survival: str
    screening_cost: str
    recommendation: str
    final_recommendation: str


client = AsyncOpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)


async def _call_llm(prompt: str, temperature: float = 0.3) -> str:
    response = await client.chat.completions.create(
        model="deepseek-chat",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
        max_tokens=600,
    )
    return response.choices[0].message.content.strip()


# ─── Node 1: 风险评估 ───────────────────────────────────────────────

async def assess_risk(state: EstimateState) -> dict:
    """根据用户输入评估结直肠癌风险等级。"""
    prompt = ASSESS_RISK_PROMPT.format(user_input=state["user_input"])
    raw = await _call_llm(prompt, temperature=0.2)

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", raw, re.DOTALL)
        if match:
            data = json.loads(match.group())
        else:
            data = {"risk_level": "中", "risk_factors": ["信息不足，默认中风险"], "reasoning": "无法解析LLM输出"}

    return {
        "risk_level": data.get("risk_level", "中"),
        "risk_factors": data.get("risk_factors", []),
        "risk_reasoning": data.get("reasoning", ""),
    }


# ─── Node 2: 费用后果评估（确定性查表） ──────────────────────────────

async def estimate_consequence(state: EstimateState) -> dict:
    """根据风险等级查表返回费用和生存率数据。无LLM调用。"""
    consequence = get_consequence_data(state["risk_level"])
    return {
        "early_cost": consequence["early_detection"]["treatment_cost_range"],
        "early_survival": consequence["early_detection"]["five_year_survival_rate"],
        "late_cost": consequence["late_detection"]["treatment_cost_range"],
        "late_survival": consequence["late_detection"]["five_year_survival_rate"],
        "screening_cost": consequence["screening_cost"],
    }


# ─── Node 3: 生成个性化建议 ─────────────────────────────────────────

async def generate_recommendation(state: EstimateState) -> dict:
    """基于风险和费用数据生成个性化筛查建议。"""
    prompt = GENERATE_RECOMMENDATION_PROMPT.format(
        risk_level=state["risk_level"],
        risk_factors="、".join(state["risk_factors"]) if state["risk_factors"] else "未识别到明确风险因素",
        early_cost=state["early_cost"],
        early_survival=state["early_survival"],
        late_cost=state["late_cost"],
        late_survival=state["late_survival"],
        screening_cost=state["screening_cost"],
    )
    recommendation = await _call_llm(prompt, temperature=0.7)
    return {"recommendation": recommendation}


# ─── Node 4: 自检审核 ───────────────────────────────────────────────

async def critique(state: EstimateState) -> dict:
    """审核建议内容，确保准确且不过度恐吓。"""
    prompt = CRITIQUE_PROMPT.format(
        recommendation=state["recommendation"],
        risk_level=state["risk_level"],
    )
    final = await _call_llm(prompt, temperature=0.2)
    return {"final_recommendation": final}


# ─── 组装 LangGraph ─────────────────────────────────────────────────

def build_estimate_graph():
    graph = StateGraph(EstimateState)

    graph.add_node("assess_risk", assess_risk)
    graph.add_node("estimate_consequence", estimate_consequence)
    graph.add_node("generate_recommendation", generate_recommendation)
    graph.add_node("critique", critique)

    graph.set_entry_point("assess_risk")
    graph.add_edge("assess_risk", "estimate_consequence")
    graph.add_edge("estimate_consequence", "generate_recommendation")
    graph.add_edge("generate_recommendation", "critique")
    graph.add_edge("critique", END)

    return graph.compile()


estimate_pipeline = build_estimate_graph()


async def run_estimate(user_input: str) -> dict:
    """执行完整评估管道，返回结构化结果。"""
    initial_state: EstimateState = {
        "user_input": user_input,
        "risk_level": "",
        "risk_factors": [],
        "risk_reasoning": "",
        "early_cost": "",
        "early_survival": "",
        "late_cost": "",
        "late_survival": "",
        "screening_cost": "",
        "recommendation": "",
        "final_recommendation": "",
    }

    result = await estimate_pipeline.ainvoke(initial_state)

    return {
        "risk_level": result["risk_level"],
        "risk_factors": result["risk_factors"],
        "cost_range": result["late_cost"],
        "survival_rate": result["early_survival"],
        "recommendation": result["final_recommendation"],
        "screening_cost": result["screening_cost"],
    }
