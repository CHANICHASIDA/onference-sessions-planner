"use client";

import { Session } from "@/types/session";
import { useAgenda } from "@/context/AgendaContext";

export default function AddToAgenda({ session }: { session: Session }) {
  const { addToAgenda, removeFromAgenda, isInAgenda } = useAgenda();

  const inAgenda = isInAgenda(session.id);

  return (
    <button
      onClick={() =>
        inAgenda ? removeFromAgenda(session.id) : addToAgenda(session)
      }
      className={`mt-6 px-4 py-2 rounded text-white ${
        inAgenda ? "bg-red-600" : "bg-blue-600"
      }`}
    >
      {inAgenda ? "Remove from My Agenda" : "Add to My Agenda"}
    </button>
  );
}
