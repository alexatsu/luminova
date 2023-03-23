import useModal from "../hooks/useModal";
import SearchIcon from "@mui/icons-material/Search";
import ModalCard from "../components/ModalCard";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useImagesStore } from "../store/useImagesStore";
import { MouseEventHandler, ChangeEventHandler, ChangeEvent } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { navstyles } from "../styles/navbar";

type SearchInputProps = { event: (event: ChangeEvent<HTMLInputElement>) => void };
type HandleSearchProps = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
type BtnAddPhotoProps = { handleOpen: MouseEventHandler<HTMLButtonElement> };
const SearchInput: React.FC<SearchInputProps> = ({ event }) => (
  <TextField
    placeholder="Search photos"
    sx={navstyles.searchInput}
    onChange={event}
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
const BtnAddPhoto = ({ handleOpen }: BtnAddPhotoProps) => (
  <IconButton children={<CloudDownloadIcon />} sx={navstyles.btnAddPhoto} onClick={handleOpen} />
);

export default function Navbar() {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const { searchQuery } = useImagesStore();
  const handleSearch: HandleSearchProps = (event) => searchQuery(event.target.value);
  return (
    <Box
      sx={navstyles.container}
      className="mui-fixed" /*don't touch class name, it fixes mui modal (reference FAQ section)*/
    >
      <Box sx={{ display: "flex", alignItems: "space-between" }}>
        <Logo />
        <SearchInput event={handleSearch} />
      </Box>
      <BtnAddPhoto handleOpen={handleOpen} />
      <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
    </Box>
  );
}
