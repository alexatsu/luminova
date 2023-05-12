import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useSearchImagesStore } from "@/store/useSearchImagesStore";
import { Logo, ProgressBar, ModalCard } from "@/components";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";

export function Navbar() {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const { searchQuery } = useSearchImagesStore();

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
        <Tooltip placement={"bottom"} TransitionComponent={Fade} title="Add">
          <IconButton sx={navstyles.btnAddPhoto} onClick={handleOpen}>
            <CloudDownloadIcon />
          </IconButton>
        </Tooltip>
        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
      <ProgressBar />
    </nav>
  );
}
