import "@/app/_styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/app/_config/site";
import { ReactNode } from "react";
import Root from "@/app/_components/Root";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

type TRootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: TRootLayoutProps) {
  return <Root>{children}</Root>;
}
