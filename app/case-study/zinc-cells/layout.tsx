import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zinc-Powered Cells Case Study - Evap Solar",
  description: "Advanced zinc-ion solar cell technology case study",
  generator: "v0.app",
};

export default function CaseStudyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
