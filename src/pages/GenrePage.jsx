import { FaHeart, FaPlay, FaPause, FaArrowLeft } from "react-icons/fa";
import { useAudio } from "../context/AudioContext";
import { getGenreConfig } from "../utils/genreTheme";
import LiveClock from "../components/LiveClock";
// import SpeedIndicator from "../components/SpeedIndicator";

const GenrePage = ({ genre, stations, onBack }) => {
  const config = getGenreConfig(genre, 28);
  const { playStation, currentStation, isPlaying, favorites, toggleFavorite, navigateTo } = useAudio();

  const handlePlayStation = (station, e) => {
    e.stopPropagation();
    playStation(station, stations);
    navigateTo("nowplaying");
  };

  return (
    <section className="min-h-screen bg-black py-8 pb-28">
      <div className="px-4 lg:px-8">

        {/* Header */}
        <div className="mb-4 flex items-baseline gap-4">
          <button
            onClick={onBack}
            className="fx-back-btn btn-radio-press"
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#555",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <FaArrowLeft className="fx-back-arrow" size={10} /> <span className="fx-back-text">Back</span>
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <h1
              className="fx-genre-title-reveal"
              style={{
                fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(24px, 4vw, 44px)",
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {genre}
            </h1>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {stations.length} stations
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <LiveClock />
            {/* <SpeedIndicator /> */}
          </div>
        </div>

        {/* Station grid with uniform card heights and non-warping audio symbol */}
        <div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "2px",
            backgroundColor: "#000",
            border: "2px solid #000",
          }}
        >
          {stations.map((station, index) => {
            const isSelected = currentStation?.frequency === station.frequency;
            const isPlayingThis = isSelected && isPlaying;
            const isFav = favorites.includes(station.frequency);

            return (
              <div
                key={station.frequency}
                onClick={(e) => handlePlayStation(station, e)}
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
                {/* Persistent Accent Bar for Playing Station */}
                <div
                  className={`fx-playing-top-bar ${isPlayingThis ? "active" : ""}`}
                  style={{ "--accent": config.accent }}
                />

                {/* Frequency & Active audio symbol */}
                <div className="flex justify-between items-center gap-2">
                  <span
                    data-text
                    style={{
                      fontFamily: "'Arial Black', monospace",
                      fontSize: "13px",
                      fontWeight: 900,
                      color: "#000",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {station.frequency} FM
                  </span>
                  {isPlayingThis && (
                    <div className="fx-mini-eq" title="Playing">
                      <div className="fx-mini-eq-bar" style={{ backgroundColor: config.accent }} />
                      <div className="fx-mini-eq-bar" style={{ backgroundColor: config.accent }} />
                      <div className="fx-mini-eq-bar" style={{ backgroundColor: config.accent }} />
                    </div>
                  )}
                </div>

                {/* Middle row: Station Name & Details */}
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
                    {station.name}
                  </h3>

                  <p
                    data-text
                    style={{
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "#000",
                      margin: 0,
                      opacity: 0.75,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    GENRE: {genre}
                  </p>
                </div>

                {/* Bottom row: Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={(e) => handlePlayStation(station, e)}
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
                    {isPlayingThis ? <FaPause size={9} /> : <FaPlay size={9} className="fx-play-icon-nudge" />}
                    {isPlayingThis ? "Pause" : "Play"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(station.frequency);
                    }}
                    className={`fx-heart-btn btn-radio-press ${isFav ? "heart-pop fx-heart-ripple" : "fx-heart-off"}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "6px 10px",
                      backgroundColor: isFav ? "#000" : "transparent",
                      border: "2px solid #000",
                      cursor: "pointer",
                      color: isFav ? "#FF2D55" : "#000",
                    }}
                  >
                    <FaHeart size={11} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GenrePage; 