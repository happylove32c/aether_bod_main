/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { useSpeedTest } from "../hooks/useSpeedTest";

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const { speed, status } = useSpeedTest(4000);

  const [currentStation, setCurrentStation] = useState(() => {
    try {
      const saved = localStorage.getItem("aether_current_station");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [playlist, setPlaylist] = useState(() => {
    try {
      const saved = localStorage.getItem("aether_playlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeView, setActiveView] = useState(() => {
    try {
      const saved = localStorage.getItem("aether_active_view");
      return saved || "home";
    } catch {
      return "home";
    }
  });

  const [selectedGenre, setSelectedGenre] = useState(() => {
    try {
      const saved = localStorage.getItem("aether_selected_genre");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [allStations, setAllStations] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("aether_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Audio setup and event listeners
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    if (currentStation?.url && !audio.src) {
      audio.src = currentStation.url;
    }

    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => setIsPlaying(false);
    const handleError = (e) => {
      console.error("Audio playback error:", e);
      setIsLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("error", handleError);
    };
  }, [volume, currentStation]);

  // Persist currentStation
  useEffect(() => {
    try {
      if (currentStation) {
        localStorage.setItem("aether_current_station", JSON.stringify(currentStation));
      } else {
        localStorage.removeItem("aether_current_station");
      }
    } catch (e) {
      console.error("Failed to save currentStation:", e);
    }
  }, [currentStation]);

  // Persist playlist
  useEffect(() => {
    try {
      if (playlist.length > 0) {
        localStorage.setItem("aether_playlist", JSON.stringify(playlist));
      } else {
        localStorage.removeItem("aether_playlist");
      }
    } catch (e) {
      console.error("Failed to save playlist:", e);
    }
  }, [playlist]);

  // Persist activeView
  useEffect(() => {
    try {
      localStorage.setItem("aether_active_view", activeView);
    } catch (e) {
      console.error("Failed to save activeView:", e);
    }
  }, [activeView]);

  // Persist selectedGenre
  useEffect(() => {
    try {
      if (selectedGenre) {
        localStorage.setItem("aether_selected_genre", JSON.stringify(selectedGenre));
      } else {
        localStorage.removeItem("aether_selected_genre");
      }
    } catch (e) {
      console.error("Failed to save selectedGenre:", e);
    }
  }, [selectedGenre]);

  // Persist favorites
  useEffect(() => {
    try {
      localStorage.setItem("aether_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  }, [favorites]);

  const playStation = (station, newPlaylist = null) => {
    if (!station || !station.url) return;

    if (newPlaylist && newPlaylist.length > 0) {
      setPlaylist(newPlaylist);
    }

    const audio = audioRef.current;

    if (currentStation?.frequency === station.frequency && currentStation?.url === station.url) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((err) => console.error("Playback failed:", err));
      }
      return;
    }

    setCurrentStation(station);
    setIsLoading(true);
    audio.src = station.url;
    audio.load();
    audio.play().catch((err) => {
      console.error("Failed to start playback:", err);
      setIsLoading(false);
      setIsPlaying(false);
    });
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!currentStation) return;

    if (!audio.src || audio.src !== currentStation.url) {
      audio.src = currentStation.url;
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.error("Playback failed:", err));
    }
  };

  const stopPlayback = () => {
    const audio = audioRef.current;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setIsPlaying(false);
    setIsLoading(false);
    setCurrentStation(null);
  };

  const setVolume = (val) => {
    const newVol = Math.max(0, Math.min(1, val));
    setVolumeState(newVol);
    audioRef.current.volume = isMuted ? 0 : newVol;
  };

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    audioRef.current.volume = newMute ? 0 : volume;
  };

  const nextStation = () => {
    if (!currentStation || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((s) => s.frequency === currentStation.frequency);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playStation(playlist[nextIndex]);
  };

  const prevStation = () => {
    if (!currentStation || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((s) => s.frequency === currentStation.frequency);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playStation(playlist[prevIndex]);
  };

  const toggleFavorite = (freq) => {
    setFavorites((prev) =>
      prev.includes(freq) ? prev.filter((f) => f !== freq) : [...prev, freq]
    );
  };

  const navigateTo = (view) => {
    setActiveView(view);
  };

  return (
    <AudioContext.Provider
      value={{
        currentStation,
        isPlaying,
        isLoading,
        volume,
        isMuted,
        playlist,
        allStations,
        setAllStations,
        activeView,
        selectedGenre,
        setSelectedGenre,
        favorites,
        playStation,
        togglePlay,
        stopPlayback,
        setVolume,
        toggleMute,
        nextStation,
        prevStation,
        toggleFavorite,
        navigateTo,
        speed,
        status,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const useSpeed = () => {
  const { speed, status } = useAudio();
  return { speed, status };
};