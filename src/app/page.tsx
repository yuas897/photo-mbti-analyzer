"use client";

import { useState, useCallback } from "react";
import ImageUploader from "@/components/ImageUploader";
import ResultCard from "@/components/ResultCard";
import ShareButton from "@/components/ShareButton";
import Loading from "@/components/Loading";
import { AnalysisResult } from "@/lib/mbti-types";

type AppState = "idle" | "ready" | "loading" | "result" | "error";

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [imageData, setImageData] = useState<{ base64: string; mimeType: string } | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((base64: string, mimeType: string) => {
    if (base64) {
      setImageData({ base64, mimeType });
      setState("ready");
      setResult(null);
      setError(null);
    } else {
      setImageData(null);
      setState("idle");
    }
  }, []);

  const handleAnalyze = async () => {
    if (!imageData) return;

    setState("loading");
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData.base64,
          mimeType: imageData.mimeType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "分析に失敗しました");
      }

      setResult(data);
      setState("result");
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setState("error");
    }
  };

  const handleReset = () => {
    setImageData(null);
    setResult(null);
    setError(null);
    setState("idle");
  };

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* ヘッダー */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-brand-400 to-brand-600 rounded-3xl shadow-lg shadow-brand-500/30 animate-float">
            <span className="text-4xl">📸</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
            <span className="text-gradient">Photo MBTI</span>
          </h1>
          <p className="text-gray-600 text-lg">
            写真をアップロードして
            <br className="md:hidden" />
            あなたのMBTIを診断
          </p>
        </header>

        {/* メインコンテンツ */}
        <div className="glass rounded-3xl p-6 md:p-8 shadow-xl">
          {/* 画像アップローダー */}
          <div className="mb-6">
            <ImageUploader
              onImageSelect={handleImageSelect}
              disabled={state === "loading"}
            />
          </div>

          {/* ローディング */}
          {state === "loading" && <Loading />}

          {/* エラー表示 */}
          {state === "error" && error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* 結果表示 */}
          {state === "result" && result && (
            <div className="mb-6 animate-slide-up">
              <ResultCard result={result} />
            </div>
          )}

          {/* アクションボタン */}
          <div className="space-y-4">
            {(state === "ready" || state === "error") && (
              <button
                onClick={handleAnalyze}
                disabled={!imageData}
                className="
                  w-full py-4 px-8
                  bg-gradient-to-r from-brand-500 to-brand-600
                  hover:from-brand-600 hover:to-brand-700
                  disabled:from-gray-300 disabled:to-gray-400
                  text-white font-bold text-lg
                  rounded-2xl shadow-lg shadow-brand-500/30
                  transition-all duration-300 ease-out
                  hover:shadow-xl hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100
                "
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  診断する
                </span>
              </button>
            )}

            {state === "result" && result && (
              <>
                <ShareButton result={result} />
                <button
                  onClick={handleReset}
                  className="
                    w-full py-3 px-8
                    bg-white hover:bg-gray-50
                    text-gray-700 font-medium
                    border-2 border-gray-200
                    rounded-2xl
                    transition-all duration-300
                    hover:border-gray-300
                  "
                >
                  もう一度診断する
                </button>
              </>
            )}
          </div>
        </div>

        {/* フッター */}
        <footer className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            ※ 診断結果はAIによる推測です。
            <br />
            あくまでエンターテイメントとしてお楽しみください。
          </p>
        </footer>
      </div>
    </main>
  );
}
