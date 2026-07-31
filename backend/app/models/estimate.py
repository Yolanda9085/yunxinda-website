"""/api/estimate 端点的请求和响应模型。"""

from pydantic import BaseModel, Field


class EstimateRequest(BaseModel):
    user_input: str = Field(
        ...,
        description="用户健康信息摘要（年龄、症状、家族史、生活习惯）",
        min_length=5,
        max_length=2000,
    )


class EstimateResponse(BaseModel):
    risk_level: str = Field(..., description="风险等级：低/中/高")
    risk_factors: list[str] = Field(default_factory=list, description="识别到的风险因素")
    cost_range: str = Field(..., description="如不筛查、晚期发现的治疗费用范围")
    survival_rate: str = Field(..., description="早期发现的五年生存率")
    recommendation: str = Field(..., description="个性化筛查建议")
    screening_cost: str = Field(default="889元/次", description="丽常生筛查费用")
