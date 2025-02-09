import { useTracks } from "../hooks/useTracks";
import MusicGrid from "../components/MusicGrid";
import { PageProps } from "../types";

const Home: React.FC<PageProps> = ({
  currentTrack,
  onTrackPlay,
  favorites,
  onToggleFavorite,
}) => {
  const { data: tracks, isLoading, error } = useTracks();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tracks</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Releases</h2>
      <MusicGrid
        tracks={tracks || []}
        onTrackPlay={handleTrackPlay}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default Home;
