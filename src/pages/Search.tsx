import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import MusicGrid from "../components/MusicGrid";

import { PageProps } from "../types";

const Search: React.FC<PageProps> = ({
  currentTrack,
  onTrackPlay,
  favorites,
  onToggleFavorite,
}) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  return (
    <div className="search-page">
      <div className="w-full max-w-3xl px-4">
        <SearchBar onSearchResults={setSearchResults} />
        <MusicGrid
          tracks={searchResults}
          onTrackPlay={onTrackPlay}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      </div>
    </div>
  );
};

export default Search;
