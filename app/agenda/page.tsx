"use client";

import { useAgenda } from "@/context/AgendaContext";

export default function AgendaPage() {
  const { agenda, removeFromAgenda, overlappingIds } = useAgenda();

  if (agenda.length === 0) {
    return (
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Agenda</h1>
        <p>No sessions added yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Agenda</h1>

      <ul className="space-y-4">
        {agenda.map((session) => {
          const isOverlapping = overlappingIds.includes(session.id);

          return (
            <li
              key={session.id}
              className={`border p-4 rounded shadow-sm ${
                isOverlapping ? "border-red-600 bg-red-50" : ""
              }`}
            >
              <h2 className="text-lg font-semibold">
                <a
                  href={`/sessions/${session.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {session.title}
                </a>
              </h2>

              <p className="text-sm">
                {session.speaker} · {session.track}
              </p>

              <p className="text-sm">
                {session.startDateTime} – {session.endDateTime}
              </p>

              <p className="text-sm">Room: {session.room}</p>

              {isOverlapping && (
                <p className="text-red-600 text-sm mt-1 font-bold">
                  ⚠ This session overlaps with another session!
                </p>
              )}

              <button
                onClick={() => removeFromAgenda(session.id)}
                className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm"
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
