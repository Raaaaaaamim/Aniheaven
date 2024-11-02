import { useParams } from "react-router-dom";
const WatchPage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>WatchPage</div>;
};

export default WatchPage;
