import { Shield, Clock, Home } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center animate-fade-in">
      <div className="mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Shield className="w-8 h-8 text-primary-700" />
        </div>
        <h1 className="text-4xl font-bold text-primary-700 mb-2">丽常生</h1>
        <p className="text-lg text-gray-500">深度多靶点肠道重疾检查</p>
      </div>

      <div className="max-w-md mb-10 space-y-3 text-left">
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg">
            <Shield className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">6基因 · 30+位点检测</p>
            <p className="text-sm text-gray-500">准确性96%，特异性99.8%</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg">
            <Clock className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">提早5-7年预警</p>
            <p className="text-sm text-gray-500">在癌前病变阶段即可发现风险</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg">
            <Home className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">居家采样 · 无创无痛</p>
            <p className="text-sm text-gray-500">无需肠道准备，自然排便即可</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-3.5 bg-primary-700 text-white rounded-full text-lg font-medium hover:bg-primary-800 transition-colors shadow-lg shadow-primary-700/20"
      >
        开始风险评估
      </button>

      <p className="mt-4 text-sm text-gray-400">
        仅需3个问题 · 1分钟获取结果
      </p>
    </div>
  );
}
