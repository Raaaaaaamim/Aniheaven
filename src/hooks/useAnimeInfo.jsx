import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useAnimeInfo(id, options = {}, enabled = false) {
  return useQuery({
    queryKey: ["anime", id],
    queryFn: async () => {
      return await axios.get(`/hianime/anime/${id}`);
    },
    enabled: enabled,
    staleTime: 1 * 60 * 1000, // 1 minute in milliseconds
    cacheTime: 5 * 60 * 1000, // 0.2 hour in milliseconds

    ...options,
  });
}
