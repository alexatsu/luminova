import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "@mui/material";
const footerStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    marginTop: "30px",
    backgroundColor: "#2f303a",
    color: "white",
  },
  link: {
    cursor: "pointer",
    ":hover": { textDecoration: "none", color: "#767676" },
    color: "lightgrey",
    transition: "all 0.15s ease-in-out",
  },
};
export default function Footer() {
  return (
    <footer style={footerStyles.container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href="https://github.com/AlexanderKudr" target={"_blank"} sx={footerStyles.link}>
          <GitHubIcon />
        </Link>
        <span style={{ marginLeft: "5px", marginTop: "-3px" }}>Developed by Alex</span>
      </div>
    </footer>
  );
}
