"use client";

const LOADING_MESSAGES = [
  "写真を分析中...",
  "性格特性を読み取っています...",
  "MBTIタイプを判定中...",
  "結果をまとめています...",
];

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* メインローダー */}
      <div className="relative w-24 h-24 mb-8">
        {/* 外側の回転リング */}
        <div className="absolute inset-0 border-4 border-brand-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-brand-500 rounded-full animate-spin" />
        
        {/* 内側のパルス */}
        <div className="absolute inset-4 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full animate-pulse-slow flex items-center justify-center">
          <span className="text-2xl">🔮</span>
        </div>
      </div>

      {/* テキストアニメーション */}
      <div className="text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">
          AIが写真を分析しています
        </p>
        <div className="flex items-center justify-center gap-1">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
