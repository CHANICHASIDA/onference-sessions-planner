import { getAllSessions, getSessionById } from "@/lib/sessions";
import { Session } from "@/types/session";
import AddToAgenda from "./AddToAgenda";
import Link from "next/link";

export async function generateStaticParams() {
  const sessions = await getAllSessions();
  return sessions.map((session) => ({
    id: session.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SessionPage({ params }: PageProps) {
  const { id } = await params;
  const session: Session | null = await getSessionById(id);
  if (!session)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800">Session not found</h2>
        <Link href="/" className="text-indigo-600 hover:underline mt-4 block">
          Back to all sessions
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      {/* כפתור חזרה */}
      <Link
        href="/"
        className="text-slate-500 hover:text-indigo-600 text-sm font-medium mb-6 inline-flex items-center gap-2 transition-colors"
      >
        ← Back to Sessions
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 md:p-12 text-white">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-indigo-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {session.track}
            </span>
            <span className="text-slate-400 text-sm font-medium">
              {session.room}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6">
            {session.title}
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-xl shadow-inner">
              👤
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                Speaker
              </p>
              <p className="text-xl font-medium text-white">
                {session.speaker}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 pb-8 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-2xl">📅</div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  Date & Time
                </p>
                <p className="text-slate-700 font-semibold">
                  {new Date(session.startDateTime).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  •
                  <span className="text-indigo-600 ml-1">
                    {new Date(session.startDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    -
                    {new Date(session.endDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl text-2xl">📍</div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  Location
                </p>
                <p className="text-slate-700 font-semibold">{session.room}</p>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              About this session
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {session.description}
            </p>
          </div>

          <div className="mt-4">
            <AddToAgenda session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
