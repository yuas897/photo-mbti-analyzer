"use client";

import { AnalysisResult, MBTI_TYPES } from "@/lib/mbti-types";

interface ResultCardProps {
  result: AnalysisResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const mbtiInfo = MBTI_TYPES[result.type] || {
    type: result.type,
    name: result.typeName,
    emoji: "✨",
    color: "#6366f1",
  };

  return (
    <div className="animate-bounce-in">
      <div
        style={{
          background: `linear-gradient(135deg, ${mbtiInfo.color}, ${adjustColor(mbtiInfo.color, -30)})`,
        }}
        className="relative overflow-hidden rounded-3xl p-8 shadow-2xl"
      >
        {/* 装飾的な背景パターン */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white rounded-full" />
        </div>

        <div className="relative z-10">
          {/* タイプ表示 */}
          <div className="text-center mb-6">
            <span className="text-6xl mb-4 block">{mbtiInfo.emoji}</span>
            <p className="text-white/80 text-sm font-medium tracking-widest uppercase mb-2">
              Your Type
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-wider mb-2">
              {result.type}
            </h2>
            <p className="text-2xl text-white/90 font-medium">
              {result.typeName}
            </p>
          </div>

          {/* 特性タグ */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {result.traits.map((trait, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* 説明 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4">
            <p className="text-white/95 text-base leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* 判定根拠 */}
          <div className="text-center">
            <p className="text-white/70 text-sm">
              <span className="inline-block mr-2">📸</span>
              {result.reasoning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 色を暗く/明るくするヘルパー関数
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}