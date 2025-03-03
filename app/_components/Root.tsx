import { Providers } from "@/app/(routes)/providers";
import Header from "./Header";
import { ReactNode } from "react";
import { fontSans } from "@/app/_config/fonts";
import clsx from "clsx";

type TRootProps = {
  children: ReactNode;
};

export default function Root({ children }: TRootProps) {
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
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
