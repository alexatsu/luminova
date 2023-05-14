import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, InputAdornment, IconButton, Button } from "@mui/material";

import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useSearchImagesStore } from "@/store/useSearchImagesStore";
import { Logo, ProgressBar, ModalCard } from "@/components";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

export function Navbar() {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const { searchQuery } = useSearchImagesStore();

  const User = () => {
    const token = localStorage.getItem("accessToken");
    return token ? (
      <Tooltip
        placement={"bottom"}
        TransitionComponent={Fade}
        title="Account details"
        enterDelay={400}
      >
        <IconButton sx={navstyles.btnAddPhoto}>
          <BiUserCircle size={"1.3rem"} color="grey" cursor={"pointer"} />
        </IconButton>
      </Tooltip>
    ) : (
      <Link to="/login">
        <Button sx={{ color: "black" }}>Login</Button>
      </Link>
    );
  };
  return (
    <nav>
      <Box
        sx={navstyles.container}
        className="mui-fixed" /*don't touch class name, it fixes mui modal (reference FAQ section)*/
      >
        <Box sx={{ display: "flex", alignItems: "space-between" }}>
          <Logo />
          <TextField
            placeholder="Search photos"
            sx={navstyles.searchInput}
            onChange={(event) => searchQuery(event.target.value)}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip placement={"bottom"} TransitionComponent={Fade} title="Add" enterDelay={400}>
            <IconButton sx={navstyles.btnAddPhoto} onClick={handleOpen}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
          <User />
        </Box>
        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
      <ProgressBar />
    </nav>
  );
}
