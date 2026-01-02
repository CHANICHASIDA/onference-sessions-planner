"use client";
import { useState } from "react";
import SessionsList from "./SessionsList";
import { Session } from "@/types/session";
import { Track } from "@/types/track";
import FilterSelect from "./FilterSelect";

interface Props {
  sessions: Session[];
}
const trackOptions = [
  { value: "", label: "All Tracks" },
  { value: Track.FRONTEND, label: "Frontend" },
  { value: Track.BACKEND, label: "Backend" },
  { value: Track.DEVOPS, label: "DevOps" },
  { value: Track.AI, label: "AI" },
];

const timeOptions = [
  { value: "", label: "All Times" },
  { value: "Morning", label: "Morning" },
  { value: "Afternoon", label: "Afternoon" },
  { value: "Evening", label: "Evening" },
];

export default function SessionsPage({ sessions }: Props) {
  const [filterTrack, setFilterTrack] = useState("");
  const [search, setSearch] = useState("");
  const [filterTime, setFilterTime] = useState("");

  const filteredSessions = sessions.filter((s) => {
    const matchTrack = filterTrack
      ? s.track.toLowerCase() === filterTrack.toLowerCase()
      : true;
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
    <div className="space-y-12 pb-20">
      <section className="relative py-12 text-center md:text-left">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
            Build your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              perfect schedule.
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl font-medium leading-relaxed">
            Explore 20+ expert-led sessions across Frontend, Backend, AI, and
            DevOps. Save your favorites and avoid scheduling conflicts
            instantly.
          </p>
        </div>
        <div className="absolute top-0 -right-20 w-72 h-72 bg-indigo-100 rounded-full blur-[120px] opacity-50 -z-10"></div>
      </section>

      <div className="sticky top-24 z-40 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by title or speaker"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 pl-12 p-3 text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>

        <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>

        <div className="flex gap-3 w-full md:w-auto">
          <FilterSelect
            label=""
            value={filterTrack}
            options={trackOptions}
            onChange={setFilterTrack}
          />
          <FilterSelect
            label=""
            value={filterTime}
            options={timeOptions}
            onChange={setFilterTime}
          />
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold text-slate-800">
            Upcoming Sessions
          </h2>
          <span className="text-sm font-bold text-slate-400">
            {filteredSessions.length} Results
          </span>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
            <p className="text-xl font-bold text-slate-400">
              No sessions found for this criteria.
            </p>
          </div>
        ) : (
          <SessionsList sessions={filteredSessions} />
        )}
      </div>
    </div>
  );
}
