import { AlertTriangle, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { clsx } from "clsx";
import { EstimateResponse } from "@/types/estimate";
import { ComparisonChart } from "./ComparisonChart";

interface ResultsPanelProps {
  result: EstimateResponse;
  onReset: () => void;
}

const RISK_CONFIG = {
  "低": { icon: CheckCircle, color: "text-green-600", bg: "bg-green-50", border: "border-green-200", label: "低风险" },
  "中": { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200", label: "中风险" },
  "高": { icon: AlertCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200", label: "高风险" },
};

export function ResultsPanel({ result, onReset }: ResultsPanelProps) {
  const riskKey = result.risk_level as keyof typeof RISK_CONFIG;
  const config = RISK_CONFIG[riskKey] || RISK_CONFIG["中"];
  const Icon = config.icon;

  return (
    <div className="min-h-screen px-4 py-8 animate-fade-in">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-700 mb-1">评估结果</h1>
          <p className="text-sm text-gray-500">基于您的信息，AI为您生成以下风险评估</p>
        </div>

        {/* Risk Level Badge */}
        <div className={clsx("flex items-center gap-4 p-5 rounded-2xl border-2", config.bg, config.border)}>
          <Icon className={clsx("w-10 h-10 flex-shrink-0", config.color)} />
          <div>
            <p className={clsx("text-xl font-bold", config.color)}>{config.label}</p>
            {result.risk_factors.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                风险因素：{result.risk_factors.join("、")}
              </p>
            )}
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <ComparisonChart
            screeningCost={result.screening_cost}
            earlyCost="2-3万元"
            lateCost={result.cost_range}
            earlySurvival={result.survival_rate}
            lateSurvival="约30%"
          />
        </div>

        {/* Recommendation */}
        <div className="bg-primary-50 p-5 rounded-2xl border border-primary-100">
          <h3 className="font-semibold text-primary-700 mb-2">专业建议</h3>
          <p className="text-gray-700 leading-relaxed text-sm">
            {result.recommendation}
          </p>
        </div>

        {/* CTA */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
          <p className="text-gray-600 mb-3 text-sm">
            仅需 <span className="font-bold text-primary-700 text-lg">{result.screening_cost}</span>，居家即可完成筛查
          </p>
          <button className="w-full py-3.5 bg-primary-700 text-white rounded-full font-medium text-lg hover:bg-primary-800 transition-colors shadow-lg shadow-primary-700/20">
            立即预约丽常生筛查
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2 text-gray-500 text-sm hover:text-primary-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重新评估
        </button>
      </div>
    </div>
  );
}
