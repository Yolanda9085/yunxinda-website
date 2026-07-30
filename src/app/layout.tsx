import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "云心达 | 智慧健康管理 · 全科医生咨询",
  description: "云心达提供 365 天全天候全科医生咨询、健康早筛、日常监测与智能健康管理服务，守护您与家人的健康。",
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
