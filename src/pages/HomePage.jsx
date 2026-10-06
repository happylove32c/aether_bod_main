import { useState, useEffect } from "react";
import StationCards from "../components/StationCards";
import GenrePage from "./GenrePage";
import SpeedIndicator from "../components/SpeedIndicator";
import LiveClock from "../components/LiveClock";
import { useAudio } from "../context/AudioContext";

const HomePage = () => {
  const [stationsData, setStationsData] = useState(null);
  const { selectedGenre, setSelectedGenre, navigateTo } = useAudio();

  useEffect(() => {
    fetch("/data_stations.json")
      .then((res) => res.json())
      .then((json) => setStationsData(json.stations[0]))
      .catch((err) => console.error("Failed to load stations:", err));
  }, []);

  const handleSelectGenre = (genreObj) => {
    setSelectedGenre(genreObj);
    navigateTo("genre");
  };

  const totalStations = stationsData ? Object.keys(stationsData).length : 0;

  return selectedGenre ? (
    <GenrePage
      genre={selectedGenre.genre}
      stations={selectedGenre.stations}
      onBack={() => {
        setSelectedGenre(null);
        navigateTo("home");
      }}
    />
  ) : (
    <section className="min-h-screen bg-black py-8 pb-28">
      <div className="px-4 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-4">
            <h1 className="fx-title-enter" style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif", fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)", color: "#fff", letterSpacing: "-0.02em", lineHeight: 1, margin: 0 }}>
              Radio Stations
            </h1>
            {totalStations > 0 && (
              <span key={totalStations} className="fx-count-tick" style={{ fontFamily: "monospace", fontSize: "12px", color: "#555", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {totalStations} total
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <LiveClock />
            <SpeedIndicator />
          </div>
        </div>
        {stationsData ? (
          <StationCards stationsData={stationsData} onGenreSelect={handleSelectGenre} />
        ) : (
          <p style={{ fontFamily: "monospace", color: "#555", fontSize: "12px" }}>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default HomePage; 