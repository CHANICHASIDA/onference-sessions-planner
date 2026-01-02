import Link from "next/link";
import { Session } from "@/types/session";

interface Props {
  sessions: Session[];
}

export default function SessionsList({ sessions }: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
                {session.track}
              </span>
              <span className="text-slate-400 text-xs font-medium uppercase tracking-tighter">
                {session.room}
              </span>
            </div>
            <Link href={`/sessions/${session.id}`} className="block mb-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                {session.title}
              </h3>
            </Link>
            <p className="text-slate-600 font-medium mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">
                👤
              </span>
              {session.speaker}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
            <div className="text-xs text-slate-500">
              <span
                suppressHydrationWarning
                className="font-bold text-slate-700"
              >
                {new Date(session.startDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <Link
              href={`/sessions/${session.id}`}
              className="text-indigo-600 text-sm font-bold hover:underline"
            >
              Details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
