import React, { useState } from "react";
import axios from "axios";
import { SPOTIFY_CONFIG } from "../config/spotifyConfig";

interface SearchBarProps {
  onSearchResults: (tracks: any[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
    if (!query.trim()) return; // Do nothing if the query is empty
    setIsLoading(true);

    try {
      const accessToken = SPOTIFY_CONFIG;
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: query, type: "track" },
      });

      const tracks = response.data.tracks.items; // Extract tracks from the API response
      onSearchResults(tracks); // Pass results to the parent
    } catch (error) {
      console.error("Error searching tracks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
