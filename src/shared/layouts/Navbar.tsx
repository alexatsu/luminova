import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { List, Menu, Text, Accordion } from "@mantine/core";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu as Gigachamburger } from "react-icons/gi";
import { AiOutlineHome, AiOutlineProfile,  AiOutlineUser } from "react-icons/ai";
import { memo } from "react";

import { useResizeWidth, useModal, useDebounce, useAuth } from "@/shared/hooks";
import { navstyles } from "@/shared/styles/navbar";
import { Logo } from "@/shared/components";
import { Search, ModalContainer, UploadModal } from "@/shared/components/form";

const accessToken = localStorage.getItem("accessToken");

export const MemoizedNavbar = memo(function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { modalOpen, handleOpen, handleClose } = useModal();
  const { logoutUser } = useAuth();

  return (
    <nav style={{ paddingTop: "10px" }}>
      <section>
        <Box sx={navstyles.container}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Link to="/" style={{ marginRight: "1rem" }}>
              <Logo />
            </Link>

            <Search />
          </Box>

          <Box sx={{ "@media (max-width: 993px)": { display: "none" }, display: "flex" }}>
            {accessToken ? <PageButton path="blog" /> : null}
            {pathname !== "/advertise" && <PageButton path="advertise" />}
          </Box>

          <Box sx={{ display: "flex" }}>
            {accessToken ? (
              <UserMenu logoutUser={logoutUser} accessToken={accessToken} navigate={navigate} />
            ) : (
              <PageButton path="login" />
            )}
            <Button
              className="button-upload"
              onClick={handleOpen}
              sx={{ width: "100%", "@media (max-width: 767px)": { display: "none" } }}
            >
              Upload a photo
            </Button>
          </Box>

          <HamburgerMenu>
            <Button
              className="button-upload"
              onClick={handleOpen}
              sx={{ width: "100%", "@media (min-width: 768px)": { display: "none" } }}
            >
              Upload a photo
            </Button>
            {accessToken === "" ? <PageButton path="login" /> : null}
          </HamburgerMenu>
        </Box>
        <ModalContainer modalOpen={modalOpen}>
          <UploadModal handleClose={handleClose} />
        </ModalContainer>
      </section>
    </nav>
  );
});

function PageButton({ path }: { path: string }) {
  const buttonText = path.charAt(0).toUpperCase() + path.slice(1);
  return (
    <Link to={`/${path}`}>
      <Button className={"button-nav-page"}>{buttonText}</Button>
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
  const userName = localStorage.getItem("userName");

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
        <Link to={`/${userName}`} style={{ textDecoration: "none" }}>
          <Menu.Item>View Profile</Menu.Item>
        </Link>

        <Link to={`/account`} style={{ textDecoration: "none" }}>
          <Menu.Item>Account settings</Menu.Item>
        </Link>
        <Menu.Divider />
        <Menu.Item onClick={() => logoutUser(accessToken!, navigate)}>Logout @{userName}</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function HamburgerMenu({ children }: { children: React.ReactNode }) {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const listData = {
    company: {
      header: "Company",
      icon: <AiOutlineHome style={{ marginRight: "4px" }} />,
      list: [
        { title: "About", path: "/company/about" },
        debouncedWidth < 993 ? { title: "Advertise", path: "/advertise" } : null,
        debouncedWidth < 993 ? { title: "Blog", path: "/blog" } : null,
      ].filter((item) => item !== null),
    },
    terms: {
      header: "Terms",
      icon: <AiOutlineProfile style={{ marginRight: "4px" }} />,
      list: [
        { title: "License", path: "/tos/license" },
        { title: "Terms & Conditions", path: "/tos/conditions" },
        { title: "Privacy Policy", path: "/tos/privacy" },
        { title: "Security", path: "/tos/security" },
      ],
    },
  };

  const { company, terms } = listData;

  const setItems = (list: (typeof company)["list"] | (typeof terms)["list"]) =>
    list.map(({ title, path }: any, index: number) => {
      return (
        <Link
          key={index}
          to={path}
          style={{
            marginBottom: "5px",
            transition: "all 0.12s ease-in-out",
            color: "#7a7a7a",
            fontWeight: "500",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          {title}
        </Link>
      );
    });

  return (
    <Menu position="bottom-end" shadow="md" width={debouncedWidth < 993 ? 300 : 400}>
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
        {[company, terms].map(({ header, list, icon }) =>
          width < 993 ? (
            <Accordion defaultValue="accordion-menu" key={header} sx={{ width: "100%" }}>
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
                  <List
                    sx={{
                      width: "100%",
                      paddingLeft: "10px",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: "10px",
                    }}
                  >
                    {setItems(list)}
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

              <List
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "45px",
                }}
              >
                {setItems(list)}
              </List>
            </Box>
          )
        )}

        {width < 993 ? (
          <Box sx={{ display: "flex", marginTop: "20px", width: "100%" }}>{children}</Box>
        ) : null}
      </Menu.Dropdown>
    </Menu>
  );
}
