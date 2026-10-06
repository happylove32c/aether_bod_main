import { useState, useEffect } from "react";

export function useSpeedTest(intervalMs = 4000) {
  const [speed, setSpeed] = useState(null);
  const [status, setStatus] = useState("testing"); // "testing" | "online" | "offline"

  useEffect(() => {
    let isMounted = true;

    const measureSpeed = async () => {
      try {
        const startTime = performance.now();
        const response = await fetch(
          `https://speed.cloudflare.com/__down?bytes=500000&_t=${Date.now()}`,
          { cache: "no-store" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const blob = await response.blob();
        const endTime = performance.now();

        if (!isMounted) return;

        const durationSeconds = (endTime - startTime) / 1000;
        if (durationSeconds > 0) {
          const bits = blob.size * 8;
          const mbps = bits / durationSeconds / 1_000_000;
          setSpeed(parseFloat(mbps.toFixed(1)));
          setStatus("online");
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Speed measurement error:", err);
          setStatus("offline");
        }
      }
    };

    // Run initial speed test at app startup
    measureSpeed();

    // 4-second continuous loop for the entire app session
    const timerId = setInterval(() => {
      measureSpeed();
    }, intervalMs);

    return () => {
      isMounted = false;
      clearInterval(timerId);
    };
  }, [intervalMs]);

  return { speed, status };
}
