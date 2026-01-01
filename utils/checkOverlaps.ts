import { Session } from "@/types/session";

export function checkOverlaps(sessions: Session[]): string[] {
  const overlappingIds: string[] = [];

  for (let i = 0; i < sessions.length; i++) {
    for (let j = i + 1; j < sessions.length; j++) {
      const a = sessions[i];
      const b = sessions[j];
      if (
        new Date(a.startDateTime) < new Date(b.endDateTime) &&
        new Date(a.endDateTime) > new Date(b.startDateTime)
      ) {
        overlappingIds.push(a.id, b.id);
      }
    }
  }

  return Array.from(new Set(overlappingIds));
}
