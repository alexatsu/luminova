import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { List, Menu, Text } from "@mantine/core";
import { useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import { Logo, ModalCard } from "@/components";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { reuseAuth } from "@/services/auth";
import { SearchInput } from "@/components/form";
import { GiHamburgerMenu as Gigachamburger } from "react-icons/gi";
import { AiOutlineHome, AiOutlineProfile, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";

export function Navbar() {
  const navigate = useNavigate();
  const { modalOpen, handleOpen, handleClose } = useModal();
  const accessToken = localStorage.getItem("accessToken");
  const { logoutUser } = reuseAuth();
  const { pathname } = useLocation();

  return (
    <nav>
      <Box sx={navstyles.container}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Link to="/" style={{ marginRight: "1rem", marginBottom: "-5px" }}>
            <Logo />
          </Link>

          <SearchInput className="search-navbar" />
        </Box>

        <Box sx={{ "@media (max-width: 993px)": { display: "none" }, display: "flex" }}>
          <BlogButton />
          {pathname !== "/advertise" && <AdvertiseButton />}
        </Box>

        <Box sx={{ "@media (max-width: 767px)": { display: "none" }, display: "flex" }}>
          {accessToken ? (
            <UserMenu logoutUser={logoutUser} accessToken={accessToken} navigate={navigate} />
          ) : (
            <LoginButton />
          )}
          <UploadButton handleOpen={handleOpen} />
        </Box>

        <HamburgerMenu />

        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
    </nav>
  );
}

function BlogButton() {
  return (
    <Link to="/blog">
      <Button
        sx={{
          color: "grey",
          fontWeight: "normal",
          transition: "color 0.2s ease-in-out",
          textTransform: "none",
        }}
      >
        Blog
      </Button>
    </Link>
  );
}

function AdvertiseButton() {
  return (
    <Link to="advertise">
      <Button
        sx={{
          color: "grey",
          fontWeight: "normal",
          textTransform: "none",
        }}
      >
        Advertise
      </Button>
    </Link>
  );
}

function UserMenu({
  logoutUser,
  accessToken,
  navigate,
}: {
  logoutUser: (token: string | null, navigate: NavigateFunction) => Promise<void>;
  accessToken: string | null;
  navigate: NavigateFunction;
}) {
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
            <AiOutlineUser size={20} color="grey" cursor={"pointer"} />
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
  );
}

function LoginButton() {
  return (
    <Link to="/login">
      <Button
        sx={{
          color: "grey",
          fontWeight: "normal",
          transition: "color 0.2s ease-in-out",
          textTransform: "none",
          "&.mantine-Button-root:hover": { backgroundColor: "white", color: "black" },
        }}
      >
        Login
      </Button>
    </Link>
  );
}

function UploadButton({ handleOpen }: { handleOpen: () => void }) {
  return (
    <Button
      sx={{
        color: "grey",
        transition: "all 0.12s ease-in-out",
        textTransform: "none",
        border: "1px solid rgb(185, 184, 184)",
        whiteSpace: "nowrap",
        padding: "0 1.5rem",
        marginRight: "5px",
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
  );
}

function HamburgerMenu() {
  const listData = {
    company: {
      header: "Company",
      icon: <AiOutlineHome style={{ marginRight: "4px" }} />,
      list: ["About", "History", "Join the team", "Press", "Contact us", "Help Center"],
    },
    terms: {
      header: "Terms",
      icon: <AiOutlineProfile style={{ marginRight: "4px" }} />,
      list: ["License", "Terms & Conditions", "Privacy Policy", "Security"],
    },
    community: {
      header: "Community",
      icon: <AiOutlineTeam style={{ marginRight: "4px" }} />,
      list: ["Become a Contributor", "Topics", "Collection", "Trends", "Luminova Awards", "Stats"],
    },
  };

  const { company, terms, community } = listData;
  
  return (
    <Menu position="bottom-end" shadow="md" width={600}>
      <Menu.Target>
        <IconButton>
          <Gigachamburger />
        </IconButton>
      </Menu.Target>

      <Menu.Dropdown
        sx={{
          "& > div": { width: "100%", display: "flex", justifyContent: "space-evenly" },
          padding: "20px",
        }}
      >
        {[company, terms, community].map(({ header, list, icon }) => (
          <Box
            key={header}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              flexBasis: "30%",
            }}
          >
            <Box
              sx={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "10px" }}
            >
              {icon}
              <Text size={16} style={{ fontWeight: "700" }}>
                {header}
              </Text>
            </Box>

            <List sx={{ width: "100%", paddingLeft: "20px" }}>
              {list.map((text, index) => {
                return (
                  <List.Item
                    key={index}
                    sx={{
                      marginBottom: "5px",
                      transition: "all 0.12s ease-in-out",
                      color: "#7a7a7a",
                      "&:hover": { color: "#2e2e2e" },
                    }}
                  >
                    <Text style={{ fontWeight: "500", cursor: "pointer" }} size={14}>
                      {text}
                    </Text>
                  </List.Item>
                );
              })}
            </List>
          </Box>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
