import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
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

        {/* Adsterra - Social Bar */}
        <Script
          src="https://pl30590404.effectivecpmnetwork.com/75/fa/9b/75fa9b12c62bc7b4a9ed957e1abd2fd0.js"
          strategy="lazyOnload"
        />

        {/* Adsterra - Popunder */}
        <Script
          src="https://pl30590405.effectivecpmnetwork.com/fb/bf/93/fbbf939cf749b3d7db76a0fcb9999a35.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
