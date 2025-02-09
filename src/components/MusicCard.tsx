import { FC } from "react";
import { MusicCardProps } from "../types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MusicCard: FC<MusicCardProps> = ({
  track,
  isFavorite,
  onToggleFavorite,
  onPlay,
}) => {
  return (
    <div className="relative group bg-gray-800 rounded-lg p-4 transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={track.album.images[0]?.url || "/placeholder.jpg"}
          alt={track.name}
          className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
          onClick={() => onPlay(track)}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(track);
          }}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-gray-900/80 hover:bg-gray-700 transition-colors"
        >
          {isFavorite ? (
            <FaHeart className="w-6 h-6 text-red-500" />
          ) : (
            <FaRegHeart className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
      <h3 className="text-white font-semibold truncate">{track.name}</h3>
      <p className="text-gray-400 text-sm truncate">
        {track.artists.map((artist) => artist.name).join(", ")}
      </p>
    </div>
  );
};

export default MusicCard;
