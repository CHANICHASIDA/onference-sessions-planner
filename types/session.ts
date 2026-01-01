import { Track } from "./track";

export interface Session {
  id: string;
  title: string;
  speaker: string;
  track: Track;
  startDateTime: string;
  endDateTime: string;
  room: string;
  description: string;
}
