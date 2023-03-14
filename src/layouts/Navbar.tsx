import { Box, Typography, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  return (
    <Box
      sx={{
        top: 0,
        position: "fixed",
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 20px",
        width: "100%",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
        backgroundColor: "#ffffff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "space-between" }}>
        <Typography
          sx={{ marginRight: "20px", marginTop: "5px" }}
          component={"h1"}
          fontWeight={"bold"}
          variant="h6"
        >
          Unsplash
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            placeholder="Search photos"
            sx={{
              marginBottom: "-3px",
              ":hover": { border: "transparent" },
              ":focus": { border: "1px solid #e0e0e0" },
              "& .MuiInput-underline:before": { borderBottom: "transparent" },
              "& .MuiInputBase-root:after": { borderBottom: "1px solid #767676" },
              // "& .MuiInputBase-root:hover": { borderBottom: "transparent" },
            }}
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
      </Box>
      <Button
        sx={{
          backgroundColor: "white",
          color: "#767676",
          ":hover": { backgroundColor: "white", color: "black" },
          height: "30px",
          marginTop: "5px",
          fontSize: "12px",
          border: "1px solid #d1d1d1",
        }}
        variant={"contained"}
      >
        Add a photo
      </Button>
    </Box>
  );
}
