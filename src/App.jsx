import { AudioProvider, useAudio } from "./context/AudioContext";
import HomePage from "./pages/HomePage";
import GenrePage from "./pages/GenrePage";
import NowPlaying from "./pages/NowPlaying";
import MiniPlayer from "./components/MiniPlayer";

import { useState, useEffect } from "react";

const viewDepthMap = { home: 0, genre: 1, nowplaying: 2 };

const MainContent = () => {
  const { activeView, selectedGenre, setSelectedGenre, navigateTo } = useAudio();
  const [prevView, setPrevView] = useState(activeView);
  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    if (activeView !== prevView) {
      const prevDepth = viewDepthMap[prevView] ?? 0;
      const currDepth = viewDepthMap[activeView] ?? 0;
      setDirection(currDepth >= prevDepth ? "forward" : "back");
      setPrevView(activeView);
    }
  }, [activeView, prevView]);

  return (
    <>
      <div key={activeView} className="screen-view-container screen-view-enter" data-direction={direction}>
        {activeView === "nowplaying" ? (
          <NowPlaying />
        ) : activeView === "genre" && selectedGenre ? (
          <GenrePage
            genre={selectedGenre.genre}
            stations={selectedGenre.stations}
            onBack={() => {
              setSelectedGenre(null);
              navigateTo("home");
            }}
          />
        ) : (
          <HomePage />
        )}
      </div>
      <MiniPlayer />
    </>
  );
};

const App = () => {
  return (
    <AudioProvider>
      <MainContent />
    </AudioProvider>
  );
};

export default App; 