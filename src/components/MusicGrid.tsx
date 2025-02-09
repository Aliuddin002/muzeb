import React from "react";
import MusicCard from "./MusicCard";
import { MusicGridProps } from "../types";

const MusicGrid: React.FC<MusicGridProps> = ({
  tracks,
  onTrackPlay,
  onToggleFavorite,
  favorites,
}) => {
  return (
    <div className="music-grid">
      {tracks?.map((track) => (
        <MusicCard
          key={track.id}
          track={track}
          onPlay={() => onTrackPlay(track)}
          isFavorite={favorites.some((f) => f.id === track.id)}
          onToggleFavorite={() => onToggleFavorite(track)}
        />
      ))}
    </div>
  );
};

export default MusicGrid;
