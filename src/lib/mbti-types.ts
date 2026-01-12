export interface MBTIType {
  type: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
}

export const MBTI_TYPES: Record<string, MBTIType> = {
  INTJ: {
    type: "INTJ",
    name: "建築家",
    emoji: "🏗️",
    color: "#6366f1",
    gradient: "from-indigo-500 to-purple-600",
  },
  INTP: {
    type: "INTP",
    name: "論理学者",
    emoji: "🔬",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-purple-600",
  },
  ENTJ: {
    type: "ENTJ",
    name: "指揮官",
    emoji: "👑",
    color: "#dc2626",
    gradient: "from-red-500 to-rose-600",
  },
  ENTP: {
    type: "ENTP",
    name: "討論者",
    emoji: "⚡",
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-600",
  },
  INFJ: {
    type: "INFJ",
    name: "提唱者",
    emoji: "🌟",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
  },
  INFP: {
    type: "INFP",
    name: "仲介者",
    emoji: "🦋",
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-500",
  },
  ENFJ: {
    type: "ENFJ",
    name: "主人公",
    emoji: "🌈",
    color: "#f97316",
    gradient: "from-orange-500 to-amber-500",
  },
  ENFP: {
    type: "ENFP",
    name: "広報運動家",
    emoji: "🎭",
    color: "#eab308",
    gradient: "from-yellow-500 to-orange-500",
  },
  ISTJ: {
    type: "ISTJ",
    name: "管理者",
    emoji: "📊",
    color: "#475569",
    gradient: "from-slate-500 to-gray-600",
  },
  ISFJ: {
    type: "ISFJ",
    name: "擁護者",
    emoji: "🛡️",
    color: "#0891b2",
    gradient: "from-cyan-500 to-blue-500",
  },
  ESTJ: {
    type: "ESTJ",
    name: "幹部",
    emoji: "📋",
    color: "#0d9488",
    gradient: "from-teal-500 to-emerald-600",
  },
  ESFJ: {
    type: "ESFJ",
    name: "領事官",
    emoji: "🤝",
    color: "#2563eb",
    gradient: "from-blue-500 to-indigo-500",
  },
  ISTP: {
    type: "ISTP",
    name: "巨匠",
    emoji: "🔧",
    color: "#64748b",
    gradient: "from-slate-500 to-zinc-600",
  },
  ISFP: {
    type: "ISFP",
    name: "冒険家",
    emoji: "🎨",
    color: "#a855f7",
    gradient: "from-purple-500 to-pink-500",
  },
  ESTP: {
    type: "ESTP",
    name: "起業家",
    emoji: "🚀",
    color: "#ef4444",
    gradient: "from-red-500 to-orange-500",
  },
  ESFP: {
    type: "ESFP",
    name: "エンターテイナー",
    emoji: "🎉",
    color: "#d946ef",
    gradient: "from-fuchsia-500 to-pink-500",
  },
};

export interface AnalysisResult {
  type: string;
  typeName: string;
  description: string;
  traits: string[];
  reasoning: string;
}
