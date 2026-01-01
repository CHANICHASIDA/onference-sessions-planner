import Link from "next/link";
import { Session } from "@/types/session";

interface Props {
  sessions: Session[];
}

export default function SessionsList({ sessions }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <Link
            href={`/sessions/${session.id}`}
            className="text-blue-600 font-bold text-lg"
          >
            {session.title}
          </Link>
          <p className="text-sm">
            {session.speaker} - {session.track}
          </p>
          <p className="text-sm">
            {session.startDateTime} - {session.endDateTime}
          </p>
          <p className="text-sm">Room: {session.room}</p>
        </div>
      ))}
    </div>
  );
}
