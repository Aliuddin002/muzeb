import { FC } from "react";
import MusicGrid from "../components/MusicGrid";
import { PageProps } from "../types";

const Favorites: FC<PageProps> = ({
  onTrackPlay,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Favorite Tracks</h1>
      <MusicGrid
        tracks={favorites}
        onTrackPlay={onTrackPlay}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};

export default Favorites;
