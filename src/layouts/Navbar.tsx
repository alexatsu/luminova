import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { List, Menu, Text, Accordion } from "@mantine/core";
import { useModal, useResizeWidth } from "@/hooks";
import { navstyles } from "@/styles/navbar";
import { Logo, ModalCard } from "@/components";
import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { reuseAuth } from "@/services/auth";
import { SearchInput } from "@/components/form";
import { GiHamburgerMenu as Gigachamburger } from "react-icons/gi";
import {
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";

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

        <Box
          sx={{
            "@media (max-width: 993px)": { display: "none" },
            display: "flex",
          }}
        >
          {accessToken ? (
            <PageButton path="blog" />
          ) : (
            <PageButton path="discover" />
          )}
          {pathname !== "/advertise" && <PageButton path="advertise" />}
        </Box>

        <Box
          sx={{
            "@media (max-width: 993px)": { display: "none" },
            display: "flex",
          }}
        >
          {accessToken ? (
            <UserMenu
              logoutUser={logoutUser}
              accessToken={accessToken}
              navigate={navigate}
            />
          ) : (
            <PageButton path="login" />
          )}
          <UploadButton handleOpen={handleOpen} />
        </Box>

        <HamburgerMenu>
          <UploadButton handleOpen={handleOpen} />
          {!accessToken ? <PageButton path="login" /> : null}
        </HamburgerMenu>

        <ModalCard handleClose={handleClose} modalOpen={modalOpen} />
      </Box>
    </nav>
  );
}

function PageButton({ path }: { path: string }) {
  const buttonText = path.charAt(0).toUpperCase() + path.slice(1);
  return (
    <Link to={`/${path}`}>
      <Button className="button-nav-page">{buttonText}</Button>
    </Link>
  );
}

function UploadButton({ handleOpen }: { handleOpen: () => void }) {
  return (
    <Button
      className="button-upload"
      onClick={handleOpen}
      sx={{ width: "100%" }}
    >
      Upload a photo
    </Button>
  );
}

function UserMenu({
  logoutUser,
  accessToken,
  navigate,
}: {
  logoutUser: (
    token: string | null,
    navigate: NavigateFunction
  ) => Promise<void>;
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
        <Menu.Item onClick={() => logoutUser(accessToken!, navigate)}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function HamburgerMenu({ children }: { children: React.ReactNode }) {
  const listData = {
    company: {
      header: "Company",
      icon: <AiOutlineHome style={{ marginRight: "4px" }} />,
      list: [
        "About",
        "History",
        "Join the team",
        "Press",
        "Contact us",
        "Help Center",
      ],
    },
    terms: {
      header: "Terms",
      icon: <AiOutlineProfile style={{ marginRight: "4px" }} />,
      list: ["License", "Terms & Conditions", "Privacy Policy", "Security"],
    },
    community: {
      header: "Community",
      icon: <AiOutlineTeam style={{ marginRight: "4px" }} />,
      list: [
        "Become a Contributor",
        "Topics",
        "Collection",
        "Trends",
        "Luminova Awards",
        "Stats",
      ],
    },
  };

  const { company, terms, community } = listData;

  const width = useResizeWidth();

  return (
    <Menu position="bottom-end" shadow="md" width={width < 993 ? 300 : 600}>
      <Menu.Target>
        <IconButton>
          <Gigachamburger />
        </IconButton>
      </Menu.Target>

      <Menu.Dropdown
        sx={{
          "& > div": {
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            "@media (max-width: 993px)": {
              flexDirection: "column",
              alignItems: "center",
            },
            padding: "20px",
          },
        }}
      >
        {[company, terms, community].map(({ header, list, icon }) =>
          width < 993 ? (
            <Accordion
              defaultValue="accordion-menu"
              key={header}
              sx={{ width: "100%" }}
            >
              <Accordion.Item value={header}>
                <Accordion.Control>
                  <Box
                    className="accordion-category"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    {icon}
                    {header}
                  </Box>
                </Accordion.Control>
                <Accordion.Panel>
                  <List sx={{ width: "100%", paddingLeft: "10px" }}>
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
                          <Text
                            style={{ fontWeight: "500", cursor: "pointer" }}
                            size={14}
                          >
                            {text}
                          </Text>
                        </List.Item>
                      );
                    })}
                  </List>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : (
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
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                {icon}
                <Text size={16} style={{ fontWeight: "700" }}>
                  {header}
                </Text>
              </Box>

              <List sx={{ width: "100%" }}>
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
                      <Text
                        style={{ fontWeight: "500", cursor: "pointer" }}
                        size={14}
                      >
                        {text}
                      </Text>
                    </List.Item>
                  );
                })}
              </List>
            </Box>
          )
        )}

        {width < 993 ? (
          <Box sx={{ display: "flex", marginTop: "20px", width: "100%" }}>
            {children}
          </Box>
        ) : null}
      </Menu.Dropdown>
    </Menu>
  );
}
