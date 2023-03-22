import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ModalCard from "../components/ModalCard";
import { MouseEventHandler, useState } from "react";

const navstyles = {
  container: {
    zIndex: "1",
    top: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
    height: "50px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
    backgroundColor: "#ffffff",
  },
  logo: {
    margin: "5px 20px 0px 0px",
    "@media (max-width: 568px)": {
      display: "none",
    },
  },
  searchInput: {
    ":hover": { border: "transparent" },
    ":focus": { border: "1px solid #e0e0e0" },
    "& .MuiInput-underline:before": { borderBottom: "transparent" },
    "& .MuiInputBase-root:after": { borderBottom: "1px solid #767676" },
    alignSelf: "flex-end",
  },
  btnAddPhoto: {
    backgroundColor: "white",
    color: "#767676",
    ":hover": { backgroundColor: "white", color: "black" },
    height: "30px",
    fontSize: "12px",
    alignSelf: "center",
    transition: "all 0.15s ease-in-out",
    "@media (max-width: 568px)": {
      fontSize: "10px",
    },
  },
};
const SearchInput = () => (
  <TextField
    placeholder="Search photos"
    sx={navstyles.searchInput}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    variant="standard"
  />
);
const Logo = () => (
  <Typography sx={navstyles.logo} component={"h1"} fontWeight={"bold"} variant="h6">
    Unsplash
  </Typography>
);
const BtnAddPhoto = ({ handleOpen }: { handleOpen: MouseEventHandler<HTMLButtonElement> }) => (
  <IconButton children={<CloudDownloadIcon />} sx={navstyles.btnAddPhoto} onClick={handleOpen} />
);

export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <Box
      sx={navstyles.container}
      className="mui-fixed" /*don't touch class name, it fixes mui modal (reference FAQ section)*/
    >
      <Box sx={{ display: "flex", alignItems: "space-between" }}>
        <Logo />
        <SearchInput />
      </Box>
      <BtnAddPhoto handleOpen={handleOpen} />
      <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
    </Box>
  );
}
