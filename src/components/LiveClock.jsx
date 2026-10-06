import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const LiveClock = ({ compact = false, style = {} }) => {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? "5px" : "7px",
        backgroundColor: "#111",
        border: "1.5px solid #333",
        padding: compact ? "3px 8px" : "6px 12px",
        fontFamily: "monospace",
        fontSize: compact ? "10px" : "11px",
        letterSpacing: "0.08em",
        color: "#aaa",
        userSelect: "none",
        whiteSpace: "nowrap",
        ...style,
      }}
      title="Device Local Time"
    >
      <FaClock className="fx-clock-icon" size={compact ? 9 : 11} style={{ color: "#888" }} />
      <span key={timeStr} className="fx-clock-tick ticking" style={{ color: "#fff", fontWeight: 700 }}>{timeStr || "--:--:--"}</span>
      <span style={{ color: "#555", fontSize: compact ? "8px" : "9px", textTransform: "uppercase" }}>
        LOCAL
      </span>
    </div>
  );
};

export default LiveClock;
