import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ظهور نتيجة الثانوية العامة",
  description: "استعلام عن نتيجة الثانوية العامة برقم الجلوس",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
