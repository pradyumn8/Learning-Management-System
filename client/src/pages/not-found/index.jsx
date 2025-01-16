import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>
        Go back to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  heading: {
    fontSize: "72px",
    marginBottom: "20px",
    color: "#FF6347",
  },
  message: {
    fontSize: "18px",
    marginBottom: "30px",
  },
  link: {
    textDecoration: "none",
    color: "#FFF",
    backgroundColor: "#FF6347",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default NotFoundPage;
