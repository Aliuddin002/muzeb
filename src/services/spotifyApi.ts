import axios from "axios";
import { SPOTIFY_CONFIG } from "../config/spotifyConfig";

export const getTracks = async () => {
  try {
    const response = await axios.get(`${SPOTIFY_CONFIG.API_BASE_URL}/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_CONFIG.ACCESS_TOKEN}`,
      },
    });
    return response.data.albums.items.flatMap((album: any) => album.tracks.items);
  } catch (error) {
    console.error("Error fetching new releases:", error);
    throw error;
  }
};

export const searchTracks = async (query: string) => {
  try {
    const response = await axios.get(`${SPOTIFY_CONFIG.API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_CONFIG.ACCESS_TOKEN}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 12,
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw error;
  }
};