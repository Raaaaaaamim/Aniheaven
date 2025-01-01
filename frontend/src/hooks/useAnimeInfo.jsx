import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../pages/Home.jsx";

export default function useAnimeInfo(id, options = {}, enabled = false) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: async () => {
      return await axios.get(`${api}/hianime/anime/${id}`);
    },
    enabled: enabled,
    cacheTime: 5 * 60 * 1000, // 0.2 hour in milliseconds

    ...options,
  });
}
