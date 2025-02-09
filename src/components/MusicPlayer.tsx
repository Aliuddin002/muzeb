import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaHeart,
  FaRegHeart,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { Track } from "../types";

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  isLiked: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onLike: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  isLiked,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onLike,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      onVolumeChange(volume);
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * duration;
      audioRef.current.currentTime = newTime;
      onSeek(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-64 right-0 h-20 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-6 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1 min-w-[200px]">
        <img
          src={currentTrack?.album.images[0]?.url || "/placeholder.jpg"}
          className="w-14 h-14 rounded object-cover"
          alt="Album cover"
        />
        <div className="truncate">
          <h4 className="font-medium text-sm truncate">
            {currentTrack?.name || "No track selected"}
          </h4>
          <p className="text-xs text-[#b3b3b3] truncate">
            {currentTrack?.artists?.map((a) => a.name).join(", ") || "—"}
          </p>
        </div>
        <button
          onClick={onLike}
          className="ml-2 text-[#b3b3b3] hover:text-white transition-colors"
        >
          {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>

      {/* Center Controls */}
      <div className="flex flex-col items-center flex-1 max-w-2xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onPrevious}
            className="text-[#b3b3b3] hover:text-white transition-colors"
            disabled={!currentTrack}
          >
            <FaStepBackward className="w-5 h-5" />
          </button>

          <button
            onClick={onPlayPause}
            className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform"
            disabled={!currentTrack}
          >
            {isPlaying ? (
              <FaPause className="w-5 h-5" />
            ) : (
              <FaPlay className="w-5 h-5 pl-0.5" />
            )}
          </button>

          <button
            onClick={onNext}
            className="text-[#b3b3b3] hover:text-white transition-colors"
            disabled={!currentTrack}
          >
            <FaStepForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full mt-2">
          <span className="text-xs text-[#b3b3b3]">
            {formatTime(currentTime)}
          </span>
          <div
            className="relative h-1 bg-[#404040] rounded-full w-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="absolute h-full bg-[#1db954] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-[#b3b3b3]">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 flex-1 justify-end min-w-[200px]">
        <div className="flex items-center gap-2">
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            {volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 bg-[#404040] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={onNext}>
        {currentTrack?.preview_url && (
          <source src={currentTrack.preview_url} type="audio/mpeg" />
        )}
      </audio>
    </div>
  );
};

export default MusicPlayer;
