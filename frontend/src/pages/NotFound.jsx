import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">

      <h1>404</h1>

      <h2>Oops! Page Not Found</h2>

      <p>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link to="/dashboard">
        <button className="home-btn">
          Go to Dashboard
        </button>
      </Link>

    </div>
  );
}

export default NotFound;