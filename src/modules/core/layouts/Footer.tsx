import { footerStyles } from "@/styles/footer";
import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <footer style={{ ...footerStyles.container, marginTop: "auto", flexShrink: 0 }}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ marginLeft: "5px", marginTop: "-3px" }}>Great Luminova</Typography>
      </Box>
    </footer>
  );
}
