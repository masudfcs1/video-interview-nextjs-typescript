import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InterviewIQ – Smart Video Hiring & Reports",
  description: "InterviewIQ is a cutting-edge video interview platform designed to streamline hiring processes with AI-driven insights. Built with React, Next.js, TypeScript, and Tailwind CSS, it offers seamless video interviews, real-time candidate tracking, movement logs, and automated PDF report generation for detailed performance analysis. Recruiters and hiring managers can assess candidates efficiently with features like facial expression tracking, speech analytics, and customizable evaluation templates.",
  keywords: [
    "video interview platform",
    "AI-driven hiring",
    "candidate tracking",
    "movement logs",
    "automated reports",
    "Video interview platform",
    "AI recruitment software",
    "Automated PDF report generator",
    "Candidate tracking system",
    "Movement log analytics",
    "React interview software",
    "Next.js hiring platform",
    "TypeScript video assessment tool",
    "HR tech with AI insights"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
