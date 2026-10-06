import { FaPlay, FaPause, FaExpandAlt, FaTimes, FaSpinner } from "react-icons/fa";
import { useAudio } from "../context/AudioContext";
import { getGenreConfig } from "../utils/genreTheme";

const MiniPlayer = () => {
  const { currentStation, isPlaying, isLoading, togglePlay, stopPlayback, navigateTo, activeView } = useAudio();

  if (!currentStation || activeView === "nowplaying") return null;

  const config = getGenreConfig(currentStation.genre, 14);

  return (
    <div
      className="fx-mini-player-slide"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#000",
        borderTop: "2px solid #fff",
        padding: "12px 24px",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.8)",
      }}
    >
      {/* Left section: Station info + animated visualizer */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", flex: 1, minWidth: 0 }}
        onClick={() => navigateTo("nowplaying")}
      >
        {/* Genre Accent Badge */}
        <div
          key={currentStation.genre}
          className="fx-station-icon-snap snap"
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: config.accent,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #fff",
            flexShrink: 0,
          }}
        >
          {config.icon}
        </div>

        {/* Info text */}
        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                fontWeight: 700,
                color: "#000",
                backgroundColor: config.accent,
                padding: "1px 6px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {currentStation.frequency} FM
            </span>
            <span
              key={isLoading ? "load" : isPlaying ? "live" : "pause"}
              className="icon-crossfade"
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: isPlaying ? "#00FF66" : "#888",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {isLoading ? "BUFFERING..." : isPlaying ? "• LIVE" : "PAUSED"}
            </span>
          </div>

          <h4
            key={currentStation.name}
            className="icon-crossfade"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: "14px",
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              letterSpacing: "-0.01em",
            }}
          >
            {currentStation.name}
          </h4>
        </div>
      </div>

      {/* Center: Equalizer animation */}
      {isPlaying && (
        <div className="hidden sm:flex items-end gap-1 h-5 px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="fx-mini-bounce-bar"
              style={{
                backgroundColor: config.accent,
              }}
            />
          ))}
        </div>
      )}

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="btn-radio-press"
          style={{
            width: "36px",
            height: "36px",
            backgroundColor: "#fff",
            color: "#000",
            border: "2px solid #fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = config.accent;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#fff";
            e.currentTarget.style.color = "#000";
          }}
        >
          {isLoading ? (
            <FaSpinner size={14} className="animate-spin" />
          ) : isPlaying ? (
            <FaPause size={12} />
          ) : (
            <FaPlay size={12} style={{ marginLeft: "2px" }} />
          )}
        </button>

        {/* Expand Now Playing Button */}
        <button
          onClick={() => navigateTo("nowplaying")}
          title="Expand Now Playing"
          className="btn-radio-press"
          style={{
            padding: "8px",
            backgroundColor: "transparent",
            color: "#fff",
            border: "1.5px solid #555",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#fff";
            e.currentTarget.style.color = config.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#555";
            e.currentTarget.style.color = "#fff";
          }}
        >
          <FaExpandAlt size={12} />
        </button>

        {/* Stop / Close Player Button */}
        <button
          onClick={stopPlayback}
          title="Stop & Close Player"
          className="fx-close-btn-flash btn-radio-press"
          style={{
            padding: "8px",
            backgroundColor: "transparent",
            color: "#888",
            border: "1.5px solid #444",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FF2D55";
            e.currentTarget.style.color = "#FF2D55";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#444";
            e.currentTarget.style.color = "#888";
          }}
        >
          <FaTimes size={12} />
        </button>
      </div>
    </div>
  );
};

export default MiniPlayer;