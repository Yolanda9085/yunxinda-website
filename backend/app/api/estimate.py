"""结构化风险评估端点。"""

from fastapi import APIRouter, HTTPException

from app.agent.estimate_graph import run_estimate
from app.models.estimate import EstimateRequest, EstimateResponse

router = APIRouter()


@router.post("/estimate", response_model=EstimateResponse)
async def estimate(request: EstimateRequest):
    """运行多步骤评估管道，返回结构化风险评估结果。"""
    try:
        result = await run_estimate(request.user_input)
        return EstimateResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"评估流程出错: {str(e)}")
