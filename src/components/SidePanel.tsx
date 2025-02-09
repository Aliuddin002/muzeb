import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaList,
  FaHistory,
  FaInfoCircle,
  FaEnvelope,
} from "react-icons/fa";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <nav>
        <Link to="/" className="side-panel-button">
          <FaHome className="text-lg" /> Home
        </Link>
        <Link to="/search" className="side-panel-button">
          <FaSearch className="text-lg" /> Search
        </Link>
        <Link to="/favorites" className="side-panel-button">
          <FaHeart className="text-lg" /> Favorites
        </Link>
        <Link to="/playlists" className="side-panel-button">
          <FaList className="text-lg" /> Playlists
        </Link>
        <Link to="/history" className="side-panel-button">
          <FaHistory className="text-lg" /> History
        </Link>
        <Link to="/about" className="side-panel-button">
          <FaInfoCircle className="text-lg" /> About
        </Link>
        <Link to="/contact" className="side-panel-button">
          <FaEnvelope className="text-lg" /> Contact
        </Link>
      </nav>
    </div>
  );
};

export default SidePanel;
