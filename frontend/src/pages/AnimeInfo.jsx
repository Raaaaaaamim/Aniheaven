import { useParams } from "react-router-dom";
import useAnimeInfo from "../hooks/useAnimeInfo.jsx";

const AnimeInfo = () => {
  const { id } = useParams();
  const { refetch, isLoading, isError, data } = useAnimeInfo(id);

  return <div className=" w-full h-full bg-red-50 "></div>;
};

export default AnimeInfo;
