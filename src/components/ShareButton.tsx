"use client";

import { AnalysisResult, MBTI_TYPES } from "@/lib/mbti-types";

interface ShareButtonProps {
  result: AnalysisResult;
}

export default function ShareButton({ result }: ShareButtonProps) {
  const mbtiInfo = MBTI_TYPES[result.type];
  const emoji = mbtiInfo?.emoji || "✨";

  const handleShare = () => {
    const shareText = `📸 写真からMBTI診断した結果...

${emoji} 私のタイプは【${result.type} - ${result.typeName}】でした！

${result.traits.slice(0, 3).map(t => `・${t}`).join("\n")}

#PhotoMBTI`;

    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
    
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  return (
    <button
      onClick={handleShare}
      className="
        group relative flex items-center justify-center gap-3
        w-full py-4 px-8
        bg-black hover:bg-gray-800
        text-white font-bold text-lg
        rounded-2xl shadow-xl
        transition-all duration-300 ease-out
        hover:shadow-2xl hover:scale-[1.02]
        active:scale-[0.98]
      "
    >
      {/* Xロゴ */}
      <svg 
        className="w-6 h-6 transition-transform group-hover:scale-110" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      
      <span>Xでシェアする</span>
      
      {/* ホバーエフェクト */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
