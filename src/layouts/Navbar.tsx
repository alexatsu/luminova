import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Menu, Button } from "@mantine/core";
import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import { Logo, ModalCard } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { reuseAuth } from "@/services/auth";
import { SearchInput } from "@/components/form";

export function Navbar() {
  const navigate = useNavigate();
  const { modalOpen, handleOpen, handleClose } = useModal();
  const accessToken = localStorage.getItem("accessToken");
  const { logoutUser } = reuseAuth();

  return (
    <nav>
      <Box
        sx={navstyles.container}
        className="mui-fixed" /*don't touch class name, it fixes mui modal (reference FAQ section)*/
      >
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Link to="/" style={{ marginRight: "1rem", marginBottom: "-5px" }}>
            <Logo />
          </Link>

          <SearchInput
            styles={{
              flexGrow: 1,
              marginBottom: "-5px",
              "& .mantine-TextInput-input": {
                borderRadius: "20px",
                transition: "background-color 0.2s ease-in-out",
                outline: "none",
                border: "1px solid transparent",
                "&:focus": {
                  border: "1px solid grey",
                  backgroundColor: "white",
                },
              },
            }}
          />
        </Box>
        <Link to="blog">
          <Button
            variant={"subtle"}
            sx={{
              color: "grey",
              fontWeight: "normal",
              marginBottom: "-5px",
              transition: "color 0.2s ease-in-out",
              "&.mantine-Button-root:hover": { backgroundColor: "white", color: "black" },
            }}
          >
            Blog
          </Button>
        </Link>
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
              <Button
                variant={"subtle"}
                sx={{
                  color: "grey",
                  fontWeight: "normal",
                  marginBottom: "-5px",
                  transition: "color 0.2s ease-in-out",
                  "&.mantine-Button-root:hover": { backgroundColor: "white", color: "black" },
                }}
              >
                Login
              </Button>
            </Link>
          )}
          <Tooltip placement={"bottom"} TransitionComponent={Fade} title="Add" enterDelay={400}>
            <IconButton sx={navstyles.btnAddPhoto} onClick={handleOpen}>
              <CloudDownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
    </nav>
  );
}
