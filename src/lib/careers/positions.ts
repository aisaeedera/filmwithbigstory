export const CAREER_POSITIONS = [
  "DOP / Cinematographer",
  "1st AC",
  "Wedding Videographer",
  "Wedding Photographer",
  "Drone Operator",
  "Production Assistant",
  "Arabic Liaison",
  "Editor / Colorist",
  "Motion Designer",
  "Social Media Manager",
] as const;

export type CareerPosition = (typeof CAREER_POSITIONS)[number];
