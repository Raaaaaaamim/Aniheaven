import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Tilt } from "react-tilt";

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 30, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.05, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
};

const TiltCard = ({ to, imageUrl, delay, rating, title, episodes }) => (
  <Link to={to}>
    <Tilt
      options={defaultOptions}
      className="relative transition-all duration-200 ease-linear"
    >
      E
    </Tilt>
  </Link>
);

TiltCard.propTypes = {
  to: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  episodes: PropTypes.number.isRequired,
};

export default TiltCard;
