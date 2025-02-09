import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import SidePanel from "./components/SidePanel";
import MusicPlayer from "./components/MusicPlayer";
import { Track, MusicPlayerProps } from "./types";

const App = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playQueue, setPlayQueue] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);

  const handleTrackPlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (!playQueue.some((t) => t.id === track.id)) {
      setPlayQueue([...playQueue, track]);
    }
  };

  const handleToggleFavorite = (track: Track) => {
    setFavorites((prev) =>
      prev.some((t) => t.id === track.id)
        ? prev.filter((t) => t.id !== track.id)
        : [...prev, track]
    );
  };

  const handleLike = () => {
    if (currentTrack) {
      handleToggleFavorite(currentTrack);
    }
  };

  const handleAddToPlaylist = () => {
    console.log("Add to playlist functionality");
  };

  const handleSeek = (time: number) => {
    const audioElement = document.getElementById(
      "audio-element"
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    const audioElement = document.getElementById(
      "audio-element"
    ) as HTMLAudioElement;
    if (audioElement) {
      audioElement.volume = newVolume;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const audioElement = document.getElementById(
        "audio-element"
      ) as HTMLAudioElement;
      const handleEnded = () => {
        const currentIndex = playQueue.findIndex(
          (t) => t.id === currentTrack?.id
        );
        if (currentIndex < playQueue.length - 1) {
          setCurrentTrack(playQueue[currentIndex + 1]);
        }
      };

      audioElement?.addEventListener("ended", handleEnded);
      return () => audioElement?.removeEventListener("ended", handleEnded);
    }
  }, [isPlaying, currentTrack, playQueue]);

  return (
    <Router>
      <div className="app-container">
        <SidePanel />
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onTrackPlay={handleTrackPlay}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  onTrackPlay={handleTrackPlay}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
            <Route
              path="/favorites"
              element={
                <Favorites
                  onTrackPlay={handleTrackPlay}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
          </Routes>
        </main>
        <MusicPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          isLiked={
            currentTrack
              ? favorites.some((f) => f.id === currentTrack.id)
              : false
          }
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => {
            const currentIndex = playQueue.findIndex(
              (t) => t.id === currentTrack?.id
            );
            if (currentIndex < playQueue.length - 1) {
              setCurrentTrack(playQueue[currentIndex + 1]);
            }
          }}
          onPrevious={() => {
            const currentIndex = playQueue.findIndex(
              (t) => t.id === currentTrack?.id
            );
            if (currentIndex > 0) {
              setCurrentTrack(playQueue[currentIndex - 1]);
            }
          }}
          onLike={handleLike}
          onAddToPlaylist={handleAddToPlaylist}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </Router>
  );
};

export default App;
