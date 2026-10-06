import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaVolumeMute,
  FaHeart,
  FaArrowLeft,
  FaSpinner,
  FaBroadcastTower,
} from "react-icons/fa";
import { useAudio } from "../context/AudioContext";
import SpeedIndicator from "../components/SpeedIndicator";
import LiveClock from "../components/LiveClock";
import { getGenreConfig } from "../utils/genreTheme";

const NowPlaying = () => {
  const {
    currentStation,
    isPlaying,
    isLoading,
    volume,
    isMuted,
    playlist,
    favorites,
    togglePlay,
    setVolume,
    toggleMute,
    nextStation,
    prevStation,
    toggleFavorite,
    navigateTo,
    selectedGenre,
  } = useAudio();

  const handleBack = () => {
    if (selectedGenre) {
      navigateTo("genre");
    } else {
      navigateTo("home");
    }
  };

  if (!currentStation) {
    return (
      <section className="min-h-screen bg-black text-white flex flex-col justify-center items-center py-12 px-4 overflow-x-hidden">
        <div
          style={{
            border: "2px solid #fff",
            padding: "clamp(20px, 5vw, 40px)",
            textAlign: "center",
            maxWidth: "480px",
            width: "100%",
            backgroundColor: "#000",
            boxSizing: "border-box",
          }}
        >
          <div className="fx-empty-tower mb-4 flex justify-center">
            <FaBroadcastTower size={48} style={{ color: "#555" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: "clamp(18px, 4vw, 24px)",
              fontWeight: 900,
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              wordBreak: "break-word",
            }}
          >
            No Station Selected
          </h2>
          <p style={{ fontFamily: "monospace", fontSize: "12px", color: "#888", marginBottom: "24px" }}>
            Select a radio station or genre from the catalog to start tuned playback.
          </p>
          <button
            onClick={() => navigateTo("home")}
            className="btn-radio-press fx-btn-wipe"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              fontSize: "12px",
              textTransform: "uppercase",
              padding: "12px 24px",
              backgroundColor: "#fff",
              color: "#000",
              border: "2px solid #fff",
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            Browse Stations
          </button>
        </div>
      </section>
    );
  }

  const config = getGenreConfig(currentStation.genre, 36);
  const isFav = favorites.includes(currentStation.frequency);
  const currentIndex = playlist.findIndex((s) => s.frequency === currentStation.frequency);

  return (
    <section
      className="min-h-screen bg-black text-white py-6 px-3 sm:px-6 lg:px-12 flex flex-col overflow-x-hidden pb-28 sm:pb-8"
      style={{ "--accent": config.accent }}
    >
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-[#222] min-w-0">
        <button
          onClick={handleBack}
          className="fx-topbar-item fx-back-btn btn-radio-press"
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#aaa",
            background: "none",
            border: "1.5px solid #333",
            padding: "6px 12px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.borderColor = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#aaa";
            e.currentTarget.style.borderColor = "#333";
          }}
        >
          <FaArrowLeft className="fx-back-arrow" size={10} /> <span className="fx-back-text">Back</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
          <LiveClock compact />
          <SpeedIndicator compact />
          <span
            className="hidden sm:inline fx-topbar-item"
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "#666",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            AETHER RADiO // NOW PLAYING
          </span>
          <span
            className="fx-topbar-item fx-genre-badge"
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: 700,
              backgroundColor: config.accent,
              color: "#fff",
              padding: "2px 8px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              border: "1px solid #fff",
              whiteSpace: "nowrap",
            }}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Main Deck Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 flex-1 items-start min-w-0">
        {/* Left Column: Visualizer & Frequency Hero Deck */}
        <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
          {/* Brutalist Station Card Deck */}
          <div
            style={{
              backgroundColor: "#111",
              border: "2px solid #fff",
              padding: "clamp(16px, 4vw, 32px)",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* Top Frequency & Status Banner */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6 min-w-0">
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span
                    key={currentStation.frequency}
                    className="fx-freq-numeral changing"
                    style={{
                      fontFamily: "'Arial Black', sans-serif",
                      fontSize: "clamp(32px, 8vw, 64px)",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: config.accent,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {currentStation.frequency}
                  </span>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "clamp(14px, 3.5vw, 18px)",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    FM
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "4px",
                  }}
                >
                  BAND FREQUENCY TUNER
                </div>
              </div>

              {/* Status Badge */}
              <div
                className={`fx-topbar-item ${!isPlaying && !isLoading ? "fx-badge-shake" : ""}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#000",
                  border: "1.5px solid #333",
                  padding: "4px 10px",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  className={`fx-speed-dot ${isPlaying ? "fx-speed-online" : isLoading ? "fx-speed-testing" : "fx-speed-offline"}`}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isPlaying ? "#00FF66" : isLoading ? "#FFCC00" : "#555",
                    boxShadow: isPlaying ? "0 0 10px #00FF66" : "none",
                  }}
                />
                <span
                  key={isLoading ? "load" : isPlaying ? "live" : "pause"}
                  className="icon-crossfade"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {isLoading ? "BUFFERING" : isPlaying ? "LIVE STREAM" : "PAUSED"}
                </span>
              </div>
            </div>

            {/* Station Title & Icon */}
            <div className="flex items-center gap-4 sm:gap-6 mb-6 py-6 border-y-2 border-[#222] min-w-0">
              <div
                key={currentStation.frequency}
                className="fx-station-icon-snap snap"
                style={{
                  width: "clamp(48px, 12vw, 64px)",
                  height: "clamp(48px, 12vw, 64px)",
                  backgroundColor: config.accent,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #fff",
                  flexShrink: 0,
                }}
              >
                {config.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h1
                  key={currentStation.name}
                  className="fx-station-name changing"
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontSize: "clamp(18px, 4.5vw, 36px)",
                    fontWeight: 900,
                    color: "#fff",
                    lineHeight: 1.1,
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {currentStation.name}
                </h1>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: "#aaa",
                    margin: "4px 0 0 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    wordBreak: "break-word",
                  }}
                >
                  GENRE: {currentStation.genre}
                </p>
              </div>
            </div>

            {/* Animated Equalizer Waveform */}
            <div className="bg-black p-4 sm:p-6 border-2 border-[#333] min-w-0">
              <div className="flex justify-between items-center mb-3 min-w-0">
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    color: "#777",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  SPECTROGRAM EQUALIZER
                </span>
                <span
                  key={isPlaying ? "active" : "idle"}
                  className="icon-crossfade"
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    color: isPlaying ? config.accent : "#555",
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                  }}
                >
                  {isPlaying ? "ACTIVE SIGNAL" : "SIGNAL IDLE"}
                </span>
              </div>
              <div className="flex items-end justify-between gap-1 h-16 sm:h-20 pt-2">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className={`now-playing-bar ${isPlaying ? "playing" : ""}`}
                    style={{
                      backgroundColor: isPlaying ? config.accent : "#222",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Retro Frequency Dial Bar */}
          <div className="bg-[#111] p-3 sm:p-4 border-2 border-[#fff] min-w-0">
            <div className="flex justify-between items-center mb-2 gap-2">
              <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#888" }}>80.0 MHz</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: "clamp(9px, 2.5vw, 11px)",
                  fontWeight: 700,
                  color: config.accent,
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
              >
                ▲ TUNED: {currentStation.frequency} MHz
              </span>
              <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#888" }}>108.0 MHz</span>
            </div>
            <div className="h-3 bg-black border border-[#444] relative overflow-hidden">
              {/* Dial marker */}
              {/* Exception Rule 1: Frequency tuner marker position transition using left property for exact percentage placement on dial */}
              <div
                className={`fx-freq-marker fx-marker-glow ${isPlaying ? "playing" : ""}`}
                style={{
                  position: "absolute",
                  left: `${Math.min(95, Math.max(5, ((parseFloat(currentStation.frequency) - 80) / 28) * 100))}%`,
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  backgroundColor: "#00FF66",
                  boxShadow: "0 0 8px #00FF66",
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Audio Controls & Metadata */}
        <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
          {/* Main Controls Deck */}
          <div className="bg-[#111] border-2 border-white p-4 sm:p-6 min-w-0">
            <h3
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                fontWeight: 700,
                color: "#888",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1.5px solid #222",
              }}
            >
              PLAYBACK CONTROLS
            </h3>

            {/* Huge Play/Pause Button */}
            <div className="mb-6">
              <button
                onClick={togglePlay}
                className={`btn-play-pause-compression btn-radio-press ${isLoading ? "fx-connecting-sweep" : ""}`}
                style={{
                  width: "100%",
                  padding: "clamp(14px, 3vw, 24px)",
                  backgroundColor: "#fff",
                  color: "#000",
                  border: "2px solid #fff",
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: "clamp(13px, 3vw, 18px)",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxSizing: "border-box",
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
                  <>
                    <FaSpinner size={18} className="animate-spin" /> BUFFERING STREAM...
                  </>
                ) : isPlaying ? (
                  <>
                    <FaPause size={18} /> PAUSE STREAM
                  </>
                ) : (
                  <>
                    <FaPlay size={18} /> START STREAM
                  </>
                )}
              </button>
            </div>

            {/* Prev / Next Station Steppers */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6 min-w-0">
              <button
                onClick={prevStation}
                disabled={playlist.length === 0}
                className="fx-stepper-btn btn-radio-press"
                style={{
                  padding: "12px 6px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "1.5px solid #444",
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: "clamp(9px, 2.5vw, 11px)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#444";
                  e.currentTarget.style.backgroundColor = "#000";
                }}
              >
                <FaStepBackward className="fx-stepper-icon-prev" size={9} /> PREV STATION
              </button>

              <button
                onClick={nextStation}
                disabled={playlist.length === 0}
                className="fx-stepper-btn btn-radio-press"
                style={{
                  padding: "12px 6px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "1.5px solid #444",
                  fontFamily: "'Arial Black', sans-serif",
                  fontSize: "clamp(9px, 2.5vw, 11px)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.backgroundColor = "#222";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#444";
                  e.currentTarget.style.backgroundColor = "#000";
                }}
              >
                NEXT STATION <FaStepForward className="fx-stepper-icon-next" size={9} />
              </button>
            </div>

            {/* Playlist Position counter */}
            {playlist.length > 0 && (
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "10px",
                  color: "#777",
                  textAlign: "center",
                  marginBottom: "20px",
                  wordBreak: "break-word",
                }}
              >
                <span key={currentIndex} className="fx-counter-roll ticked">
                  STATION {currentIndex + 1 >= 0 ? String(currentIndex + 1).padStart(2, "0") : "01"} OF{" "}
                  {String(playlist.length).padStart(2, "0")} IN {config.label}
                </span>
              </div>
            )}

            {/* Volume Control */}
            <div className="bg-black p-3 sm:p-4 border border-[#333] mb-6 min-w-0">
              <div className="flex justify-between items-center mb-3">
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "10px",
                    color: "#aaa",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <button onClick={toggleMute} className="icon-crossfade" style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0 }}>
                    {isMuted || volume === 0 ? <FaVolumeMute size={14} color="#FF2D55" /> : <FaVolumeUp size={14} />}
                  </button>
                  VOLUME: {isMuted ? "MUTED" : `${Math.round(volume * 100)}%`}
                </span>
                <button
                  onClick={toggleMute}
                  className={`btn-radio-press ${isMuted ? "fx-vol-flash" : ""}`}
                  style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    color: isMuted ? "#FF2D55" : "#888",
                    background: "none",
                    border: "1px solid #444",
                    padding: "2px 6px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {isMuted ? "UNMUTE" : "MUTE"}
                </button>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="fx-volume-slider cursor-pointer"
              />
            </div>

            {/* Favorite Action Button */}
            <button
              onClick={() => toggleFavorite(currentStation.frequency)}
              className={`btn-radio-press fx-heart-btn ${isFav ? "heart-pop fx-heart-ripple" : "fx-heart-off"}`}
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: isFav ? "#C1121F" : "transparent",
                color: "#fff",
                border: `2px solid ${isFav ? "#C1121F" : "#fff"}`,
                fontFamily: "'Arial Black', sans-serif",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxSizing: "border-box",
              }}
            >
              <FaHeart size={14} color={isFav ? "#fff" : "currentColor"} />
              <span key={isFav ? "saved" : "unsaved"} className="icon-crossfade">
                {isFav ? "SAVED IN FAVORITES" : "ADD TO FAVORITES"}
              </span>
            </button>
          </div>

          {/* Stream Technical Details Card */}
          <div className="bg-[#111] border-2 border-[#333] p-4 text-xs font-mono text-[#888] min-w-0">
            <div className="flex justify-between py-1 border-b border-[#222] min-w-0 gap-2">
              <span className="shrink-0">STREAM STATUS:</span>
              <span key={isPlaying ? "connected" : "stopped"} className={isPlaying ? "fx-stream-connected-flash" : ""} style={{ color: isPlaying ? "#00FF66" : "#aaa" }}>
                {isPlaying ? "CONNECTED" : "STOPPED"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#222] min-w-0 gap-2 items-center">
              <span className="shrink-0">AUDIO STREAM:</span>
              <span className="text-white truncate max-w-[140px] sm:max-w-[200px]">{currentStation.url}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#222] min-w-0 gap-2">
              <span className="shrink-0">FORMAT:</span>
              <span className="text-white text-right truncate">ICECAST MP3 LIVE STREAM</span>
            </div>
            <div className="flex justify-between items-center pt-2 min-w-0 gap-2">
              <span className="shrink-0">LIVE BANDWIDTH:</span>
              <SpeedIndicator compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowPlaying; 