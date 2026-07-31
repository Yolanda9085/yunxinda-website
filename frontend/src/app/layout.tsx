import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "丽常生 - 肠癌早筛智能评估",
  description: "通过智能对话评估您的结直肠癌风险，科学守护肠道健康",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
