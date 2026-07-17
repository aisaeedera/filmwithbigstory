// Synced with the live Google Form (form ID 1LpYaPttNWa7CesY-WGoQv1vpSTw8LGdL2T6VTnyXBbc)
// as of 2026-07-17. When you change these, also update the Google Form's
// "Primary Role" dropdown to match.
export const CAREER_POSITIONS = [
  "Actor / On-screen Talent",
  "Voice-over Artist",
  "Director",
  "Assistant Director (1st/2nd AD)",
  "Producer",
  "Production Manager",
  "Production Assistant / Runner",
  "DP / Cinematographer",
  "Camera Operator",
  "1st / 2nd AC (Focus Puller / Camera Assistant)",
  "Gaffer / Lighting Technician",
  "Grip",
  "Sound Recordist",
  "Boom Operator",
  "Drone Operator",
  "Photographer",
  "Video Editor",
  "Colorist",
  "Motion Graphics / VFX Artist",
  "Art Department / Production Designer",
  "Set Dresser / Props",
  "Stylist / Wardrobe",
  "Hair & Makeup (HMUA)",
  "Location Manager / Scout",
  "Casting Director",
  "Other media-production role (specify in notes)",
] as const;

export type CareerPosition = (typeof CAREER_POSITIONS)[number];
