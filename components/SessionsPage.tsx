"use client";
import { useState } from "react";
import SessionsList from "./SessionsList";
import { Session } from "@/types/session";

interface Props {
  sessions: Session[];
}

export default function SessionsPage({ sessions }: Props) {
  const [filterTrack, setFilterTrack] = useState("");
  const [search, setSearch] = useState("");
  const [filterTime, setFilterTime] = useState("");

  const filteredSessions = sessions.filter((s) => {
    const matchTrack = filterTrack ? s.track === filterTrack : true;
    const matchSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase());
    let matchTime = true;
    if (filterTime) {
      const startHour = new Date(s.startDateTime).getHours();
      if (filterTime === "Morning")
        matchTime = startHour >= 8 && startHour < 12;
      if (filterTime === "Afternoon")
        matchTime = startHour >= 12 && startHour < 17;
      if (filterTime === "Evening")
        matchTime = startHour >= 17 && startHour < 21;
    }

    return matchTrack && matchSearch && matchTime;
  });

  return (
    <div className="p-4">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title or speaker"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={filterTrack}
          onChange={(e) => setFilterTrack(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Tracks</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
          <option value="AI">AI</option>
        </select>
        <select
          value={filterTime}
          onChange={(e) => setFilterTime(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Times</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </div>
      {filteredSessions.length === 0 && (
        <p className="text-center col-span-full">No sessions found.</p>
      )}
      <SessionsList sessions={filteredSessions} />
    </div>
  );
}
