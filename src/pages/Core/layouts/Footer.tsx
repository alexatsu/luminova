import { footerStyles } from "@/styles/footer";
import { Box, Typography } from "@mui/material";

const FooterContainer = ({ children }: { children: React.ReactNode }) => (
  <footer style={footerStyles.container}>
    <Box style={{ display: "flex", alignItems: "center" }}>{children}</Box>
  </footer>
);
export function Footer() {
  return (
    <FooterContainer>
      <Typography sx={{ marginLeft: "5px", marginTop: "-3px" }}>Great Unsplash</Typography>
    </FooterContainer>
  );
}
