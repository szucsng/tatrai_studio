import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fotógaléria",
  description: "Kép és videó megosztó alkalmazás eseményekkel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-50 via-white to-gray-50"></div>
        <div className="fixed inset-0 -z-10" style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.05) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(236, 72, 153, 0.05) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(147, 51, 234, 0.05) 0px, transparent 50%)
          `
        }}></div>
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
