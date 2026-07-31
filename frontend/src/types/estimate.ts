export interface EstimateRequest {
  user_input: string;
}

export interface EstimateResponse {
  risk_level: string;
  risk_factors: string[];
  cost_range: string;
  survival_rate: string;
  recommendation: string;
  screening_cost: string;
}
