import GitHubIcon from "@mui/icons-material/GitHub";
import { footerStyles } from "../styles/footer";
import { Box, Link, Typography } from "@mui/material";

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
