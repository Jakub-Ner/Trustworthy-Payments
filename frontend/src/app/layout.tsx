import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trustworthy Transfer",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-gradient-to-br from-black via-[#0f0c29] to-[#302b63] text-[#f1f1f1] font-mono selection:bg-pink-500 selection:text-black">
        <div className="relative z-10">{children}</div>

        {/* Subtle cyberpunk flicker background */}
        <div className="pointer-events-none fixed inset-0 z-0 opacity-10 mix-blend-screen bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_70%)] animate-pulse" />
      </body>
    </html>
  );
}

