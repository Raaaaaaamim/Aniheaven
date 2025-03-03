import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const useAddToWatchlist = () => {
  return useMutation({
    mutationFn: (data) => {
      return axios.post(`/anime/watchlist`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed", {
        style: { background: "#333", color: "#fff" },
      });
    },

    onSuccess: (data) => {
      toast.success(data.data.message, {
        style: { background: "#333", color: "#fff" },
      });
    },
  });
};

export default useAddToWatchlist;
