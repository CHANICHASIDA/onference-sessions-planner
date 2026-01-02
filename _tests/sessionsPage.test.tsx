import { render, screen, fireEvent } from "@testing-library/react";
import SessionsPage from "@/components/SessionsPage";
import { sessionsMock } from "@/mocks/sessionsMock";
import "@testing-library/jest-dom";
//this test check the filters and search function in sessios page

describe("SessionsPage", () => {
  it("filters sessions by track", () => {
    render(<SessionsPage sessions={sessionsMock} />);

    const selects = screen.getAllByRole("combobox");
    const select = selects[0];
    fireEvent.change(select, { target: { value: "frontend" } });
    sessionsMock.forEach((session) => {
      if (session.track === "frontend") {
        expect(screen.getByText(session.title)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(session.title)).not.toBeInTheDocument();
      }
    });
  });

  it("filters sessions by search input", () => {
    render(<SessionsPage sessions={sessionsMock} />);
    const input = screen.getByPlaceholderText("Search by title or speaker");

    fireEvent.change(input, { target: { value: "Alice" } });

    expect(screen.getByText("React 18 Deep Dive")).toBeInTheDocument();
    expect(screen.queryByText("Next.js App Router")).not.toBeInTheDocument();
  });
});
