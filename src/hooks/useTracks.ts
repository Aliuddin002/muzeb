import { useQuery } from "react-query";
import { getTracks } from "../services/spotifyApi";

export const useTracks = () => {
  return useQuery("tracks", getTracks);
};