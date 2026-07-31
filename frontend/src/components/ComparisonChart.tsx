import { clsx } from "clsx";

interface ComparisonChartProps {
  screeningCost: string;
  earlyCost: string;
  lateCost: string;
  earlySurvival: string;
  lateSurvival: string;
}

export function ComparisonChart({
  screeningCost,
  earlyCost,
  lateCost,
  earlySurvival,
  lateSurvival,
}: ComparisonChartProps) {
  return (
    <div className="space-y-6">
      {/* Cost Comparison Bars */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          费用对比
        </h3>
        <div className="space-y-4">
          <CostBar
            label="丽常生筛查"
            cost={screeningCost}
            percentage={3}
            color="bg-green-500"
          />
          <CostBar
            label="早期治疗"
            cost={earlyCost}
            percentage={15}
            color="bg-amber-500"
          />
          <CostBar
            label="晚期治疗"
            cost={lateCost}
            percentage={100}
            color="bg-red-500"
          />
        </div>
      </div>

      {/* Survival Rate Comparison */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          5年生存率对比
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <SurvivalCircle
            label="早期发现"
            rate={earlySurvival}
            percentage={90}
            color="text-green-500"
          />
          <SurvivalCircle
            label="晚期发现"
            rate={lateSurvival}
            percentage={30}
            color="text-red-500"
          />
        </div>
      </div>
    </div>
  );
}

function CostBar({
  label,
  cost,
  percentage,
  color,
}: {
  label: string;
  cost: string;
  percentage: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{cost}</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx("h-full rounded-full transition-all duration-1000", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function SurvivalCircle({
  label,
  rate,
  percentage,
  color,
}: {
  label: string;
  rate: string;
  percentage: number;
  color: string;
}) {
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl">
      <div className="relative w-24 h-24 mb-2">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={clsx(color, "transition-all duration-1000")}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-800">{rate}</span>
        </div>
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
