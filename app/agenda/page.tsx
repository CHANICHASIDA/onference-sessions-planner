"use client";

import { useAgenda } from "@/context/AgendaContext";
import Link from "next/link";

export default function AgendaPage() {
  const { agenda, removeFromAgenda, overlappingIds } = useAgenda();

  // נמיין את האג'נדה לפי שעת התחלה כדי שזה יראה כמו לו"ז אמיתי
  const sortedAgenda = [...agenda].sort(
    (a, b) =>
      new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()
  );

  if (agenda.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6 bg-white rounded-3xl border border-dashed border-slate-300">
        <div className="text-6?l mb-4">📅</div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">
          Your Agenda is Empty
        </h1>
        <p className="text-slate-500 mb-8">
          Start exploring sessions and build your perfect conference day.
        </p>
        <Link
          href="/"
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          Browse Sessions
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            My Agenda
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            You have {agenda.length} sessions planned
          </p>
        </div>
        <div className="hidden md:block text-right text-xs font-bold text-slate-400 uppercase tracking-widest">
          Personal Schedule
        </div>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 pl-8 space-y-10">
        {sortedAgenda.map((session) => {
          const isOverlapping = overlappingIds.includes(session.id);
          const startTime = new Date(session.startDateTime).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          );
          const endTime = new Date(session.endDateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={session.id} className="relative group">
              <div
                className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-slate-50 transition-colors ${
                  isOverlapping
                    ? "bg-rose-500 ring-4 ring-rose-100"
                    : "bg-indigo-600"
                }`}
              ></div>

              <div
                className={`bg-white rounded-2xl p-6 border transition-all ${
                  isOverlapping
                    ? "border-rose-200 shadow-lg shadow-rose-50 ring-1 ring-rose-200"
                    : "border-slate-100 shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                      {startTime} – {endTime}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Room {session.room}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromAgenda(session.id)}
                    className="text-slate-400 hover:text-rose-600 text-xs font-bold uppercase tracking-tighter transition-colors"
                  >
                    Remove Session ✕
                  </button>
                </div>

                <Link
                  href={`/sessions/${session.id}`}
                  className="block group/title"
                >
                  <h2
                    className={`text-xl font-bold mb-2 transition-colors ${
                      isOverlapping
                        ? "text-rose-900"
                        : "text-slate-900 group-hover/title:text-indigo-600"
                    }`}
                  >
                    {session.title}
                  </h2>
                </Link>

                <p className="text-slate-600 text-sm font-medium flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  {session.speaker} ·{" "}
                  <span className="text-slate-400 font-normal">
                    {session.track}
                  </span>
                </p>

                {isOverlapping && (
                  <div className="flex items-center gap-2 bg-rose-50 text-rose-700 p-3 rounded-xl border border-rose-100 animate-pulse">
                    <span className="text-lg">⚠️</span>
                    <p className="text-xs font-bold leading-tight uppercase">
                      Scheduling Conflict: This session overlaps with another in
                      your agenda!
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
        <p className="text-indigo-700 text-sm font-medium">
          See you there! All sessions are scheduled in your local time zone.
        </p>
      </div>
    </div>
  );
}
