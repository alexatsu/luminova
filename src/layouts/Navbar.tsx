import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import { Box, TextField, InputAdornment, IconButton, Button } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { Menu } from "@mantine/core";
import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import { useSearchImagesStore } from "@/store/useSearchImagesStore";
import { Logo, AssistNav, ProgressBar, ModalCard } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { authEndpoints } from "@/utils";

export function Navbar() {
  const navigate = useNavigate();
  const { modalOpen, handleOpen, handleClose } = useModal();
  const { searchQuery } = useSearchImagesStore();
  const token = localStorage.getItem("accessToken");

  const logoutUser = async (token: string | null) => {
    try {
      const response = await fetch(authEndpoints.logout, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data, "logout");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
      localStorage.removeItem("accessToken");
    }
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
          <UserMenu token={token!} logoutUser={logoutUser} />
        </Box>

        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>

      <AssistNav />

      <ProgressBar />
    </nav>
  );
}

type UserMenuProps = {
  token: string | null;
  logoutUser: (token: string) => void;
};
const UserMenu = ({ token, logoutUser }: UserMenuProps) => {
  if (token) {
    return (
      <Menu shadow="md" width={200}>
        <Menu.Target>
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
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>View Profile</Menu.Item>
          <Menu.Item>Stats</Menu.Item>
          <Menu.Item>Account settings</Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={() => logoutUser(token)}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  } else {
    return (
      <Link to="/login">
        <Button sx={{ color: "black" }}>Login</Button>
      </Link>
    );
  }
};
