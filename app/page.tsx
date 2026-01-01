import { getAllSessions } from "@/lib/sessions";
import SessionsPage from "@/components/SessionsPage";

export default async function HomePage() {
  const sessions = await getAllSessions();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conference Sessions</h1>
      <SessionsPage sessions={sessions} />
    </div>
  );
}
