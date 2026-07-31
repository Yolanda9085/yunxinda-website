"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface RiskAssessmentProps {
  onSubmit: (data: { age: string; symptoms: string[]; familyHistory: boolean }) => void;
}

const AGE_OPTIONS = [
  { value: "under40", label: "40岁以下" },
  { value: "40-50", label: "40-50岁" },
  { value: "50-60", label: "50-60岁" },
  { value: "over60", label: "60岁以上" },
];

const SYMPTOM_OPTIONS = [
  { value: "无症状", label: "无明显症状" },
  { value: "腹痛腹胀", label: "偶有腹痛/腹胀" },
  { value: "便血或黑便", label: "便血或黑便" },
  { value: "排便习惯改变", label: "排便习惯改变" },
  { value: "体重下降", label: "不明原因体重下降" },
];

export function RiskAssessment({ onSubmit }: RiskAssessmentProps) {
  const [step, setStep] = useState(0);
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [familyHistory, setFamilyHistory] = useState<boolean | null>(null);

  const toggleSymptom = (value: string) => {
    if (value === "无症状") {
      setSymptoms(["无症状"]);
      return;
    }
    setSymptoms((prev) => {
      const filtered = prev.filter((s) => s !== "无症状");
      return filtered.includes(value)
        ? filtered.filter((s) => s !== value)
        : [...filtered, value];
    });
  };

  const canProceed = () => {
    if (step === 0) return age !== "";
    if (step === 1) return symptoms.length > 0;
    if (step === 2) return familyHistory !== null;
    return false;
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      onSubmit({ age, symptoms, familyHistory: familyHistory! });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={clsx(
                "h-2 rounded-full transition-all",
                i === step ? "w-8 bg-primary-600" : i < step ? "w-8 bg-primary-300" : "w-8 bg-gray-200"
              )}
            />
          ))}
        </div>

        {/* Question 1: Age */}
        {step === 0 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-primary-700 text-center mb-2">
              您的年龄段
            </h2>
            <p className="text-gray-500 text-center mb-6">年龄是结直肠癌的重要风险因素</p>
            <div className="grid grid-cols-2 gap-3">
              {AGE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setAge(option.value)}
                  className={clsx(
                    "p-4 rounded-xl border-2 text-center font-medium transition-all",
                    age === option.value
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary-300"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 2: Symptoms */}
        {step === 1 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-primary-700 text-center mb-2">
              近期肠道症状
            </h2>
            <p className="text-gray-500 text-center mb-6">可多选，选择您近期出现的症状</p>
            <div className="space-y-3">
              {SYMPTOM_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleSymptom(option.value)}
                  className={clsx(
                    "w-full p-4 rounded-xl border-2 text-left font-medium transition-all",
                    symptoms.includes(option.value)
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary-300"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question 3: Family History */}
        {step === 2 && (
          <div className="animate-slide-up">
            <h2 className="text-2xl font-bold text-primary-700 text-center mb-2">
              家族肠癌史
            </h2>
            <p className="text-gray-500 text-center mb-6">
              直系亲属（父母/兄弟姐妹）是否有肠癌或肠息肉病史？
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setFamilyHistory(false)}
                className={clsx(
                  "p-6 rounded-xl border-2 text-center font-medium transition-all",
                  familyHistory === false
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary-300"
                )}
              >
                <span className="block text-3xl mb-2">✓</span>
                没有
              </button>
              <button
                onClick={() => setFamilyHistory(true)}
                className={clsx(
                  "p-6 rounded-xl border-2 text-center font-medium transition-all",
                  familyHistory === true
                    ? "border-primary-600 bg-primary-50 text-primary-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-primary-300"
                )}
              >
                <span className="block text-3xl mb-2">⚠</span>
                有
              </button>
            </div>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={!canProceed()}
          className={clsx(
            "w-full mt-8 py-3.5 rounded-full font-medium text-lg flex items-center justify-center gap-2 transition-all",
            canProceed()
              ? "bg-primary-700 text-white hover:bg-primary-800 shadow-lg"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          )}
        >
          {step === 2 ? "获取评估结果" : "下一步"}
          <ChevronRight className="w-5 h-5" />
        </button>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-3 py-2 text-gray-500 text-sm hover:text-primary-600 transition-colors"
          >
            返回上一步
          </button>
        )}
      </div>
    </div>
  );
}
