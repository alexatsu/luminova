import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Link, Typography } from "@mui/material";

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
const FooterContainer = ({ children }: { children: React.ReactNode }) => (
  <footer style={footerStyles.container}>
    <Box style={{ display: "flex", alignItems: "center" }}>{children}</Box>
  </footer>
);
export default function Footer() {
  return (
    <FooterContainer>
      <Link href="https://github.com/AlexanderKudr" target={"_blank"} sx={footerStyles.link}>
        <GitHubIcon />
      </Link>
      <Typography style={{ marginLeft: "5px", marginTop: "-3px" }}>Developed by Alex</Typography>
    </FooterContainer>
  );
}
