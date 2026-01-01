"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@/types/session";
import { checkOverlaps } from "@/utils/checkOverlaps";

interface AgendaContextType {
  agenda: Session[];
  addToAgenda: (session: Session) => void;
  removeFromAgenda: (id: string) => void;
  isInAgenda: (id: string) => boolean;
  overlappingIds: string[];
}

const AgendaContext = createContext<AgendaContextType | null>(null);

export function AgendaProvider({ children }: { children: React.ReactNode }) {
  const [agenda, setAgenda] = useState<Session[]>([]);
  const [overlappingIds, setOverlappingIds] = useState<string[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("agenda");
    if (stored) {
      setAgenda(JSON.parse(stored));
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("agenda", JSON.stringify(agenda));
  }, [agenda]);

  const addToAgenda = (session: Session) => {
    setAgenda((prev) => {
      const newAgenda = prev.find((s) => s.id === session.id)
        ? prev
        : [...prev, session];
      const overlaps = checkOverlaps(newAgenda);
      setOverlappingIds(overlaps);
      return newAgenda;
    });
  };

  const removeFromAgenda = (id: string) => {
    setAgenda((prev) => {
      const newAgenda = prev.filter((s) => s.id !== id);
      const overlaps = checkOverlaps(newAgenda);
      setOverlappingIds(overlaps);
      return newAgenda;
    });
  };
  const isInAgenda = (id: string) => {
    return agenda.some((s) => s.id === id);
  };

  return (
    <AgendaContext.Provider
      value={{
        agenda,
        addToAgenda,
        removeFromAgenda,
        isInAgenda,
        overlappingIds,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
}

export function useAgenda() {
  const ctx = useContext(AgendaContext);
  if (!ctx) {
    throw new Error("useAgenda must be used within AgendaProvider");
  }
  return ctx;
}
