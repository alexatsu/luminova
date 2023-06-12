import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { Menu } from "@mantine/core";
import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import { Logo, ModalCard } from "@/components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { reuseAuth } from "@/services/auth";
import { SearchInput } from "@/components/form";
import { GiHamburgerMenu } from "react-icons/gi";

export function Navbar() {
  const navigate = useNavigate();
  const { modalOpen, handleOpen, handleClose } = useModal();
  const accessToken = localStorage.getItem("accessToken");
  const { logoutUser } = reuseAuth();
  const location = useLocation();

  return (
    <nav>
      <Box sx={navstyles.container}>
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

        <Box sx={{ "@media (max-width: 993px)": { display: "none" }, display: "flex" }}>
          <Link to="/blog">
            <Button
              sx={{
                color: "grey",
                fontWeight: "normal",
                marginBottom: "-5px",
                transition: "color 0.2s ease-in-out",
                textTransform: "none",
              }}
            >
              Blog
            </Button>
          </Link>

          {location.pathname !== "/advertise" && (
            <Link to="advertise">
              <Button
                sx={{
                  color: "grey",
                  fontWeight: "normal",
                  textTransform: "none",
                  marginBottom: "-5px",
                }}
              >
                Advertise
              </Button>
            </Link>
          )}
        </Box>

        <Box sx={{ "@media (max-width: 767px)": { display: "none" }, display: "flex" }}>
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
                    <BiUserCircle size={"1.3rem"} color="grey" cursor={"pointer"} />
                  </IconButton>
                </Tooltip>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>View Profile</Menu.Item>
                <Menu.Item>Stats</Menu.Item>
                <Menu.Item>Account settings</Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => logoutUser(accessToken!, navigate)}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link to="/login">
              <Button
                sx={{
                  color: "grey",
                  fontWeight: "normal",
                  marginBottom: "-5px",
                  transition: "color 0.2s ease-in-out",
                  textTransform: "none",
                  "&.mantine-Button-root:hover": { backgroundColor: "white", color: "black" },
                }}
              >
                Login
              </Button>
            </Link>
          )}
          <Button
            sx={{
              color: "grey",
              marginBottom: "-5px",
              transition: "all 0.12s ease-in-out",
              textTransform: "none",
              border: "1px solid rgb(185, 184, 184)",
              whiteSpace: "nowrap",
              padding: "0.2rem 1.5rem",
              ":hover": {
                backgroundColor: "white",
                color: "rgb(68, 68, 68)",
                border: "1px solid rgb(68, 68, 68)",
              },
            }}
            onClick={handleOpen}
          >
            Upload a photo
          </Button>
        </Box>

        <IconButton sx={{ marginBottom: "-5px" }}>
          <GiHamburgerMenu />
        </IconButton>

        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
    </nav>
  );
}
