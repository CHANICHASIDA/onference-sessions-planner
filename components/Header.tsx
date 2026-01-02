"use client";
import Link from "next/link";
import { useAgenda } from "@/context/AgendaContext";

export default function Header() {
  const { agenda } = useAgenda();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-100/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
            <span className="font-black text-xl">C</span>
          </div>
          <span className="text-xl font-black tracking-tight text-slate-800">
            Conf<span className="text-indigo-600">Hub</span>
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            All Sessions
          </Link>
          <Link
            href="/agenda"
            className="relative flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-sm font-bold hover:bg-indigo-600 hover:scale-105 transition-all shadow-xl shadow-slate-200"
          >
            My Agenda
            {agenda.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black border-2 border-white">
                {agenda.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
