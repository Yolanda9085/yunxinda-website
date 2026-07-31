"use client";

import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { RiskAssessment } from "@/components/RiskAssessment";
import { ResultsPanel } from "@/components/ResultsPanel";
import { submitEstimate } from "@/lib/api";
import { EstimateResponse } from "@/types/estimate";
import { Loader2 } from "lucide-react";

type Step = "hero" | "assessment" | "loading" | "results";

export default function Home() {
  const [step, setStep] = useState<Step>("hero");
  const [result, setResult] = useState<EstimateResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    age: string;
    symptoms: string[];
    familyHistory: boolean;
  }) => {
    setStep("loading");
    setError("");

    const ageMap: Record<string, string> = {
      under40: "40岁以下",
      "40-50": "40-50岁",
      "50-60": "50-60岁",
      over60: "60岁以上",
    };

    const userInput = [
      `年龄：${ageMap[data.age] || data.age}`,
      `症状：${data.symptoms.join("、")}`,
      `家族史：${data.familyHistory ? "有直系亲属肠癌/息肉病史" : "无家族史"}`,
    ].join("；");

    try {
      const response = await submitEstimate(userInput);
      setResult(response);
      setStep("results");
    } catch {
      setError("评估服务暂时不可用，请稍后再试");
      setStep("assessment");
    }
  };

  const handleReset = () => {
    setStep("hero");
    setResult(null);
    setError("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white">
      {step === "hero" && <HeroSection onStart={() => setStep("assessment")} />}

      {step === "assessment" && (
        <div>
          {error && (
            <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm z-50">
              {error}
            </div>
          )}
          <RiskAssessment onSubmit={handleSubmit} />
        </div>
      )}

      {step === "loading" && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 animate-fade-in">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          <p className="text-gray-600 font-medium">AI正在分析您的风险...</p>
          <p className="text-sm text-gray-400">预计需要5-10秒</p>
        </div>
      )}

      {step === "results" && result && (
        <ResultsPanel result={result} onReset={handleReset} />
      )}
    </main>
  );
}
