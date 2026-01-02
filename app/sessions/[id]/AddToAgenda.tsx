"use client";

import { Session } from "@/types/session";
import { useAgenda } from "@/context/AgendaContext";

export default function AddToAgenda({ session }: { session: Session }) {
  const { addToAgenda, removeFromAgenda, isInAgenda } = useAgenda();

  const inAgenda = isInAgenda(session.id);

  return (
    <button
      aria-label="add to agenda"
      onClick={() =>
        inAgenda ? removeFromAgenda(session.id) : addToAgenda(session)
      }
      className={`w-full mt-8 py-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
        inAgenda
          ? "bg-rose-50 text-rose-600 hover:bg-rose-100 shadow-rose-100"
          : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
      }`}
    >
      {inAgenda ? "✕ Remove from My Agenda" : "★ Add to My Agenda"}
    </button>
  );
}
