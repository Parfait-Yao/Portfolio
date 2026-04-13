import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ColorProvider } from "@/components/ColorProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Parfait Eric | Développeur Fullstack",
  description: "Portfolio de Parfait Eric Yao, Développeur Fullstack spécialisé dans la création d'expériences digitales mémorables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-jakarta bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ColorProvider>
            <LanguageProvider>
              {children}
              <Toaster position="top-right" />
            </LanguageProvider>
          </ColorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

