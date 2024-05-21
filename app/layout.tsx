import './global.css';
import { AppLayout } from "@/components/layout/AppLayout";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Thing"
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  )
}
