import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { Menu } from "@mantine/core";
import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import { Logo, ModalCard } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { authHandler } from "@/services";

export function Navbar() {
  const navigate = useNavigate();
  const { modalOpen, handleOpen, handleClose } = useModal();
  const accessToken = localStorage.getItem("accessToken");
  const { logoutUser } = authHandler();

  return (
    <nav>
      <Box
        sx={navstyles.container}
        className="mui-fixed" /*don't touch class name, it fixes mui modal (reference FAQ section)*/
      >
        <Box sx={{ display: "flex", alignItems: "space-between" }}>
          <Link to="/" style={{ marginRight: "1rem", marginBottom: "-5px" }}>
            <Logo />
          </Link>
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
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to="/advertise">
            <Button sx={{ color: "black", textTransform: "none" }}>Advertise</Button>
          </Link>

          <Tooltip
            placement={"bottom"}
            TransitionComponent={Fade}
            title="Add"
            enterDelay={400}
          >
            <IconButton sx={navstyles.btnAddPhoto} onClick={handleOpen}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>

          {accessToken ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Tooltip
                  placement={"bottom"}
                  TransitionComponent={Fade}
                  title="Account details"
                  enterDelay={400}
                >
                  <IconButton sx={navstyles.btnAddPhoto}>
                    <BiUserCircle
                      size={"1.3rem"}
                      color="grey"
                      cursor={"pointer"}
                    />
                  </IconButton>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>View Profile</Menu.Item>
                <Menu.Item>Stats</Menu.Item>
                <Menu.Item>Account settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => logoutUser(accessToken!, navigate)}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link to="/login">
              <Button sx={{ color: "black" }}>Login</Button>
            </Link>
          )}
        </Box>

        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
    </nav>
  );
}
