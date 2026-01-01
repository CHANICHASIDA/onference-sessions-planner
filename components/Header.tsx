"use client";

import Link from "next/link";
import { useAgenda } from "@/context/AgendaContext";

export default function Header() {
  const { agenda } = useAgenda();

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Conference Planner
        </Link>

        <Link
          href="/agenda"
          className="text-blue-600 font-medium flex items-center gap-2"
        >
          My Agenda
          {agenda.length > 0 && (
            <span className="text-xs bg-blue-600 text-white rounded-full px-2 py-0.5">
              {agenda.length}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
