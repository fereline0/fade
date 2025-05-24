import "@/app/_styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/app/_config/site";
import { ReactNode, Suspense } from "react";
import { Providers } from "./providers";
import Header from "../_components/shared/Header";
import { fontSans } from "../_config/fonts";
import clsx from "clsx";
import Loading from "../_components/shared/Loading";

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
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="space-y-6">
            <Header />
            <main className="mx-auto w-full max-w-[1024px] px-6 py-4 break-all">
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
