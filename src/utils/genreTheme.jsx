import {
  FaMusic,
  FaGuitar,
  FaMicrophone,
  FaHeadphones,
  FaCloud,
  FaCross,
  FaBroadcastTower,
  FaDrumSteelpan,
  FaChild,
} from "react-icons/fa";

// Predefined accents for known core genres
const PREDEFINED_GENRES = {
  jazz:      { icon: FaMusic,          accent: "#E07B00", label: "JAZZ" },
  rock:      { icon: FaGuitar,         accent: "#C1121F", label: "ROCK" },
  hiphop:    { icon: FaMicrophone,     accent: "#00875A", label: "HIP-HOP" },
  lofi:      { icon: FaHeadphones,     accent: "#FF2D55", label: "LOFI" },
  ambient:   { icon: FaCloud,          accent: "#81b1ca", label: "AMBIENT" },
  christian: { icon: FaCross,          accent: "#6A4C93", label: "CHRISTIAN" },
  metal:     { icon: FaGuitar,         accent: "#1A1A1A", label: "METAL" },
  pop:       { icon: FaMusic,          accent: "#D946EF", label: "POP" },
  classical: { icon: FaMusic,          accent: "#854D0E", label: "CLASSICAL" },
  news:      { icon: FaBroadcastTower, accent: "#1aa6ec", label: "NEWS" },
  talk:      { icon: FaMicrophone,     accent: "#059669", label: "TALK" },
  afrobeat:  { icon: FaDrumSteelpan,     accent: "#784dee", label: "AFROBEAT" },
  kids:      { icon: FaChild,     accent: "#be1ea9", label: "KIDS" },
};

// Curated vibrant color palette for auto-assigning accent colors to new/unknown genres
const AUTOMATIC_COLOR_PALETTE = [
  "#E07B00", // Warm Amber
  "#C1121F", // Crimson
  "#00875A", // Emerald
  "#FF2D55", // Neon Pink
  "#0077B6", // Deep Cyan
  "#6A4C93", // Violet
  "#D97706", // Burnt Orange
  "#7C3AED", // Bright Purple
  "#2563EB", // Cobalt
  "#059669", // Jade
  "#DC2626", // Flame Red
  "#DB2777", // Fuchsia
  "#0284C7", // Sky Blue
  "#EA580C", // Bright Coral
  "#9333EA", // Electric Purple
  "#0D9488", // Teal
];

/**
 * Hash function to convert any string deterministically into a numeric index
 */
function hashGenreName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Returns a genre configuration object { accent, icon, label } for any genre name.
 * New / unconfigured genres dynamically receive a consistent, vibrant accent color automatically.
 *
 * @param {string} genreName
 * @param {number} iconSize
 */
export function getGenreConfig(genreName, iconSize = 28) {
  if (!genreName) {
    return {
      accent: "#333333",
      icon: <FaMusic size={iconSize} />,
      label: "RADIO",
    };
  }

  const key = genreName.toLowerCase().trim();

  if (PREDEFINED_GENRES[key]) {
    const item = PREDEFINED_GENRES[key];
    const IconComp = item.icon;
    return {
      accent: item.accent,
      icon: <IconComp size={iconSize} />,
      label: item.label,
    };
  }

  // Automatic color logic: hash string deterministically to palette index
  const colorIndex = hashGenreName(key) % AUTOMATIC_COLOR_PALETTE.length;
  const automaticAccent = AUTOMATIC_COLOR_PALETTE[colorIndex];

  return {
    accent: automaticAccent,
    icon: <FaBroadcastTower size={iconSize} />,
    label: genreName.toUpperCase(),
  };
}
