import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UTMCapture from "@/app/components/UTMCapture";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChannelOS — The OS for your YouTube Portfolio",
  description: "Manage multiple channels in one place. Analyze performance, track trends, and know exactly what to fix next.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <UTMCapture>
          {children}
        </UTMCapture>
      </body>
    </html>
  );
}
