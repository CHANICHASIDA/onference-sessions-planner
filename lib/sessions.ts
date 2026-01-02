import fs from "fs";
import path from "path";
import { Session } from "@/types/session";

const sessionsFilePath = path.join(process.cwd(), "data", "sessions.json");

export async function getAllSessions(): Promise<Session[]> {
  const data = fs.readFileSync(sessionsFilePath, "utf-8");
  return JSON.parse(data) as Session[];
}

export async function getSessionById(id: string): Promise<Session | null> {
  const sessions = await getAllSessions();
  return sessions.find((s) => s.id === id) || null;
}
