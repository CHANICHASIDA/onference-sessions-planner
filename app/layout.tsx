import type { Metadata } from "next";
import "./globals.css";
import { AgendaProvider } from "@/context/AgendaContext";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ConfHub - Conference Planner",
  description: "Manage your conference sessions and agenda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        <AgendaProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
        </AgendaProvider>
      </body>
    </html>
  );
}
