import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import useModal from "../hooks/useModal";
import ModalCard from "../components/modals/ModalCard";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { navstyles } from "../styles/navbar";
import { useImagesStore } from "../store/useImagesStore";
import { MouseEventHandler, ChangeEventHandler, ChangeEvent, FC } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import { ProgressBar } from "../components/ProgressBar";
import AuthModal from "../components/modals/AuthModal";
import { useAuthStore } from "../store/useAuthStore";
import { logoutUserFn } from "../service/user.service";
import { useMutation } from "react-query";
import Toast from "../components/Toast";
import { useToastStore } from "../store/useToastStore";

type SearchInputProps = {
  event: (event: ChangeEvent<HTMLInputElement>) => void;
};
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
  <Tooltip placement={"bottom"} TransitionComponent={Fade} title="Add">
    <IconButton children={<CloudDownloadIcon />} sx={navstyles.btnAddPhoto} onClick={handleOpen} />
  </Tooltip>
);

const AuthBtn: FC<BtnAddPhotoProps> = ({ handleOpen }) => {
  /* checking by email is temporary */
  const { data, setUser } = useAuthStore();
  const { setMessage } = useToastStore();

  const { mutate: logout } = useMutation(() => logoutUserFn(), {
    onSuccess: () => {
      delete localStorage["access_token"];
      setMessage({ message: "Logged out successfully!", severity: "success" });
      setUser({ email: "", id: 0 });
    },
    onError: (error: any) => {
      if (error.response?.data?.message) {
        setMessage({ message: error.response?.data?.message, severity: "error" });
      } else {
        setMessage({ message: "Something went wrong!", severity: "error" });
      }
    },
  });
  const handleAuth: MouseEventHandler<HTMLButtonElement> = (e) => {
    data?.email?.length ? logout() : handleOpen(e);
  };

  return (
    <Button disableRipple sx={navstyles.authBtn()} onClick={handleAuth}>
      {data?.email?.length ? "Logout" : "Login"}
    </Button>
  );
};

export default function Navbar() {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const {
    modalOpen: authOpen,
    handleOpen: handleAuthOpen,
    handleClose: handleAuthClose,
  } = useModal();

  const { searchQuery } = useImagesStore();
  const handleSearch: HandleSearchProps = (event) => searchQuery(event.target.value);
  return (
    <header>
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
        <AuthBtn handleOpen={handleAuthOpen} />
        <AuthModal handleClose={handleAuthClose} modalOpen={authOpen} />
      </Box>
      <ProgressBar />
    </header>
  );
}
