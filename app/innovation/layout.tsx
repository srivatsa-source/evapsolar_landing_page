import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Innovation Pipeline | EVAP Solar",
  description:
    "Building tomorrow's energy technologies — Perovskite Solar Accelerator, Zinc-Based Battery Energy Storage Systems, and R&D collaborations.",
};

export default function InnovationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
