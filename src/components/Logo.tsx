import { navstyles } from "@/styles/navbar";
import { Typography } from "@mui/material";

export const Logo = () => (
  <Typography sx={navstyles.logo} component={"h1"} fontWeight={"bold"} variant="h6">
    Unsplash
  </Typography>
);