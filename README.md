A small conference sessions planner built with Next.js (App Router) and TypeScript.
The app allows users to browse conference sessions, filter and search them, view session details, and build a personal agenda with conflict detection.

🚀 How to Run the Project
Option 1: Run locally (recommended for development)
npm install
npm run dev

The app will be available at:
👉 http://localhost:3000

Run tests
npm test

Option 2: Run using Docker

A Docker image is available on Docker Hub:

docker run -p 3000:3000 chanfraind/conference-planner:latest

Then open:
👉 http://localhost:3000

🧱 Architecture & Technical Decisions
Framework & Stack

Next.js 13+ with App Router

TypeScript

Tailwind CSS for styling

React Context + localStorage for agenda state management

Jest + React Testing Library for tests

Data Loading Strategy

Session data is stored in a static JSON file.

The initial sessions list is rendered on the server using Server Components.

Filtering, searching, and sorting are handled on the client side.

Reasoning:
The dataset is small and fully loaded upfront, so handling filters on the client provides a faster and more responsive user experience without additional server requests.

Routing

/ – Sessions list (server-rendered)

/sessions/[id] – Dynamic session details page

/agenda – Personal agenda page

Dynamic routes are implemented using the App Router and server-side data access.

My Agenda & Persistence

Users can add/remove sessions to their personal agenda.

Agenda state is persisted using localStorage, so it survives page reloads.

When sessions overlap in time, conflicts are visually indicated.

🧪 Tests

The project includes unit and integration tests, covering:

Session overlap detection logic

Sessions list rendering with filtering and search term

Full agenda flow (add → persist → reload)

⏳ Trade-offs & Shortcuts

No backend or database (static JSON only)

No authentication or user accounts

🔮 What I Would Improve With More Time

Suggest alternative sessions from the same track when an agenda conflict occurs

Better conflict resolution UX

Improved accessibility testing
