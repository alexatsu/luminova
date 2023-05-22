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
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { authEndpoints } from "@/utils";
import { useState } from "react";

export function Navbar() {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const { searchQuery } = useSearchImagesStore();
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

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
      setToken(null);
      localStorage.removeItem("accessToken");
    }
  };

  const User = () => {
    return token ? (
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

      <AssistNav />

      <ProgressBar />
    </nav>
  );
}
