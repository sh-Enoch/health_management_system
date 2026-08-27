import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Management System",
  description: "Modern wellness dashboard and health tracking experience",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
