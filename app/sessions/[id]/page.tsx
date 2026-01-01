import { getAllSessions, getSessionById } from "@/lib/sessions";
import { Session } from "@/types/session";

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
  if (!session) return <p>Session not found</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{session.title}</h1>
      <p className="mb-1">
        <strong>Speaker:</strong> {session.speaker}
      </p>
      <p className="mb-1">
        <strong>Track:</strong> {session.track}
      </p>
      <p className="mb-1">
        <strong>Time:</strong> {session.startDateTime} - {session.endDateTime}
      </p>
      <p className="mb-1">
        <strong>Room:</strong> {session.room}
      </p>
      <p className="mt-4">{session.description}</p>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        Add to My Agenda
      </button>
    </div>
  );
}
