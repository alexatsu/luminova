import { Box, Typography, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const navstyles = {
  container: {
    zIndex: "1",
    top: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 20px",
    width: "100%",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
    backgroundColor: "#ffffff",
  },
  search: {
    marginBottom: "-3px",
    ":hover": { border: "transparent" },
    ":focus": { border: "1px solid #e0e0e0" },
    "& .MuiInput-underline:before": { borderBottom: "transparent" },
    "& .MuiInputBase-root:after": { borderBottom: "1px solid #767676" },
  },
  btnAddPhoto: {
    backgroundColor: "white",
    color: "#767676",
    ":hover": { backgroundColor: "white", color: "black" },
    height: "30px",
    marginTop: "5px",
    fontSize: "12px",
    border: "1px solid #d1d1d1",
  },
};
const Logo = () => (
  <Typography sx={{ margin: "5px 20px 0px 0px" }} component={"h1"} fontWeight={"bold"} variant="h6">
    Unsplash
  </Typography>
);
const SearchInput = () => (
  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
    <TextField
      placeholder="Search photos"
      sx={navstyles.search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      variant="standard"
    />
  </Box>
);
export default function Navbar() {
  return (
    <Box sx={navstyles.container}>
      <Box sx={{ display: "flex", alignItems: "space-between" }}>
        <Logo />
        <SearchInput />
      </Box>
      <Button sx={navstyles.btnAddPhoto} variant={"contained"}>
        Add a photo
      </Button>
    </Box>
  );
}
