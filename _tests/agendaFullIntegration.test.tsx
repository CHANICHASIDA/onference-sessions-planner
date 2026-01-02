import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AgendaProvider } from "@/context/AgendaContext";
import AddToAgenda from "@/app/sessions/[id]/AddToAgenda";
import { Session } from "@/types/session";
import { Track } from "@/types/track";

// This test verifies that the button text toggles correctly and ensures the agenda state persists in LocalStorage after re-renders.
const mockSession: Session = {
  id: "1",
  title: "React Testing",
  speaker: "Dan",
  track: Track.FRONTEND,
  startDateTime: "2026-01-01T09:00",
  endDateTime: "2026-01-01T10:00",
  room: "A",
  description: "Test description",
};

describe("AddToAgenda Persistence Integration", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("should add to agenda, save to localStorage, and persist after re-render", async () => {
    const { unmount } = render(
      <AgendaProvider>
        <AddToAgenda session={mockSession} />
      </AgendaProvider>
    );

    const button = screen.getByLabelText(/add to agenda/i);

    fireEvent.click(button);
    expect(button).toHaveTextContent(/Remove from My Agenda/i);

    const savedData = JSON.parse(localStorage.getItem("agenda") || "[]");
    expect(savedData).toHaveLength(1);
    expect(savedData[0].id).toBe(mockSession.id);

    unmount();

    render(
      <AgendaProvider>
        <AddToAgenda session={mockSession} />
      </AgendaProvider>
    );

    const buttonAfterRefresh = screen.getByLabelText(/add to agenda/i);
    expect(buttonAfterRefresh).toHaveTextContent(/Remove from My Agenda/i);
  });
});
