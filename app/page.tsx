import { getAllSessions } from "@/lib/sessions";
import SessionsList from "@/components/SessionsList";

export default async function HomePage() {
  const sessions = await getAllSessions();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conference Sessions</h1>
      <SessionsList sessions={sessions} />
    </div>
  );
}
