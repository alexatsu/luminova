import GitHubIcon from "@mui/icons-material/GitHub";
export default function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
        marginTop: "20px",
        backgroundColor: "#2f303a",
        color: "white",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ cursor: "pointer" }}>
          <GitHubIcon />
        </div>
        <span style={{ marginLeft: "5px", marginTop: "-3px" }}>Developed by Alex</span>
      </div>
    </footer>
  );
}
