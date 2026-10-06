import { useSpeed } from "../context/AudioContext";
import { FaWifi } from "react-icons/fa";

const SpeedIndicator = ({ compact = false, style = {} }) => {
  const { speed, status } = useSpeed();

  const isError = status === "offline";
  const isLoading = status === "testing" && speed === null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? "6px" : "8px",
        backgroundColor: "#111",
        border: "1.5px solid #333",
        padding: compact ? "3px 8px" : "6px 12px",
        fontFamily: "monospace",
        fontSize: compact ? "10px" : "11px",
        letterSpacing: "0.06em",
        color: "#aaa",
        userSelect: "none",
        transition: "all 0.2s ease",
        ...style,
      }}
      title="Live Internet Download Speed (Context continuous 4s stream)"
    >
      <FaWifi size={compact ? 10 : 12} style={{ color: isError ? "#FF2D55" : speed !== null ? "#00FF66" : "#888" }} />

      <span
        className={`fx-speed-dot ${isError ? "fx-speed-offline" : isLoading ? "fx-speed-testing" : "fx-speed-online"}`}
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: isError ? "#FF2D55" : speed !== null ? "#00FF66" : "#FFCC00",
          boxShadow: isError ? "0 0 6px #FF2D55" : speed !== null ? "0 0 6px #00FF66" : "none",
        }}
      />

      <span style={{ color: "#666", fontWeight: 700, textTransform: "uppercase" }}>
        SPEED
      </span>

      <span
        key={speed !== null ? speed : isError ? "err" : "load"}
        className="fx-speed-val"
        style={{
          color: "#fff",
          fontWeight: 700,
          minWidth: compact ? "7.5ch" : "8ch",
          display: "inline-block",
          textAlign: "right",
        }}
      >
        {isError ? "OFFLINE" : isLoading ? "TESTING..." : `${speed} Mbps`}
      </span>
    </div>
  );
};

export default SpeedIndicator;
