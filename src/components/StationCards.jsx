import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useAudio } from "../context/AudioContext";
import { getGenreConfig } from "../utils/genreTheme";

const StationCards = ({ onGenreSelect }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { playStation, currentStation, isPlaying, navigateTo, setAllStations } = useAudio();

  useEffect(() => {
    const loadStations = async () => {
      try {
        const response = await fetch("/data_stations.json");

        if (!response.ok) throw new Error("Failed to load stations");

        const data = await response.json();

        const stationList = Object.entries(data.stations?.[0] || {}).map(
          ([frequency, station]) => ({ frequency, ...station })
        );

        setStations(stationList);
        setAllStations(stationList);
      } catch (error) {
        console.error("Failed to load station data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, [setAllStations]);

  const genres = Object.values(
    stations.reduce((groups, station) => {
      const genre = station.genre?.toLowerCase();
      if (!genre) return groups;
      if (!groups[genre]) groups[genre] = { genre: station.genre, stations: [] };
      groups[genre].stations.push(station);
      return groups;
    }, {})
  );

  const handleListenClick = (e, group) => {
    e.stopPropagation();
    if (group.stations.length > 0) {
      playStation(group.stations[0], group.stations);
      navigateTo("nowplaying");
    }
  };

  if (loading) {
    return (
      <div className="fx-loading-container mt-4 border-2 border-white bg-black p-6">
        <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-2">
          <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#aaa", letterSpacing: "0.08em" }}>
            TUNING FREQUENCIES...
          </span>
          <span className="cursor-blink" style={{ fontFamily: "monospace", fontSize: "11px", color: "#00FF66" }}>
            SEARCHING
          </span>
        </div>
        <div className="tuner-ruler mb-6">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`tuner-tick ${i % 5 === 0 ? "active" : ""}`} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`skeleton-shimmer-bar stagger-item stagger-${i}`}
              style={{ height: "220px", border: "2px solid #222" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
      style={{
        gap: "2px",
        backgroundColor: "#000",
        border: "2px solid #000",
        marginTop: "1rem",
      }}
    >
      {genres.map((group, index) => {
        const config = getGenreConfig(group.genre, 24);
        const isCurrentGenrePlaying =
          currentStation?.genre?.toLowerCase() === group.genre.toLowerCase() && isPlaying;

        // Truncate channel list as "+X more" (e.g. "BBC World +3 more")
        const firstStationName = group.stations[0]?.name || "";
        const remainingCount = group.stations.length - 1;
        const channelSummary =
          remainingCount > 0 ? `${firstStationName} +${remainingCount} more` : firstStationName;

        return (
          <div
            key={group.genre}
            onClick={() => onGenreSelect(group)}
            className={`card-radio-surface btn-radio-press stagger-item stagger-${index % 10}`}
            style={{
              "--accent": config.accent,
              backgroundColor: "#fff",
              height: "220px",
              padding: "16px 18px",
              borderRight: "2px solid #000",
              borderBottom: "2px solid #000",
              cursor: "pointer",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = config.accent;
              e.currentTarget.querySelectorAll("[data-text]").forEach(
                (el) => (el.style.color = "#fff")
              );
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#fff";
              e.currentTarget.querySelectorAll("[data-text]").forEach(
                (el) => (el.style.color = "#000")
              );
            }}
          >
            {/* Top row: icon + playing symbol & station count */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span data-text className="fx-genre-icon" style={{ color: "#000", display: "flex", alignItems: "center" }}>
                {config.icon}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {isCurrentGenrePlaying && (
                  <div className="fx-mini-eq" title="Playing">
                    <div className="fx-mini-eq-bar" style={{ backgroundColor: config.accent }} />
                    <div className="fx-mini-eq-bar" style={{ backgroundColor: config.accent }} />
                    <div className="fx-mini-eq-bar" style={{ backgroundColor: config.accent }} />
                  </div>
                )}
                <span
                  data-text
                  className="fx-count-badge"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                    color: "#000",
                    textTransform: "uppercase",
                    border: "1.5px solid currentColor",
                    padding: "2px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {String(group.stations.length).padStart(2, "0")} stations
                </span>
              </div>
            </div>

            {/* Middle row: Genre Title & Channel Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", margin: "8px 0" }}>
              <h3
                data-text
                style={{
                  fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#000",
                  margin: 0,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  textTransform: "uppercase",
                  wordBreak: "break-word",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {group.genre}
              </h3>

              <p
                data-text
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#000",
                  margin: 0,
                  opacity: 0.75,
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={group.stations.map((s) => s.name).join(", ")}
              >
                {channelSummary}
              </p>
            </div>

            {/* Bottom row: Action Button */}
            <div>
              <button
                onClick={(e) => handleListenClick(e, group)}
                className="fx-btn-wipe btn-radio-press"
                style={{
                  fontFamily: "'Arial Black', sans-serif",
                  fontWeight: 900,
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "6px 14px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "2px solid #000",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#fff";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#000";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                <FaPlay size={9} className="fx-play-icon-nudge" /> Listen
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StationCards; 