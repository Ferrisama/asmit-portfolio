import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asmit Ghosh - Full-Stack & Blockchain Engineer",
  description:
    "Software Engineer specializing in full-stack development, web automation, and blockchain. Built systems processing 14,000+ data points.",
  keywords:
    "Asmit Ghosh, Full-Stack Developer, Blockchain Developer, Python, React, AWS, FastAPI, Web3",
  authors: [{ name: "Asmit Ghosh" }],
  openGraph: {
    title: "Asmit Ghosh - Portfolio",
    description: "Full-Stack & Blockchain Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
