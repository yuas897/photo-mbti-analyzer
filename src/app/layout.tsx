import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo MBTI Analyzer | 写真であなたのMBTIを診断",
  description: "写真をアップロードするだけで、AIがあなたのMBTIタイプを診断します。結果はXでシェアできます。",
  openGraph: {
    title: "Photo MBTI Analyzer",
    description: "写真からAIがあなたのMBTIを診断！",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo MBTI Analyzer",
    description: "写真からAIがあなたのMBTIを診断！",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased noise">
        {children}
      </body>
    </html>
  );
}
