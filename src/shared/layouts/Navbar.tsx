import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { List, Menu, Text, Accordion } from "@mantine/core";
import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu as Gigachamburger } from "react-icons/gi";
import { AiOutlineHome, AiOutlineProfile, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { MouseEventHandler, memo, useEffect, useRef, useState } from "react";

import { handleFetch } from "../utils";

import { useResizeWidth, useModal, useDebounce, useAuth } from "@/shared/hooks";
import { navstyles } from "@/shared/styles/navbar";
import { Logo } from "@/shared/components";
import { SearchInput, ModalContainer, UploadModal } from "@/shared/components/form";
import sass from "../styles/layouts/Navbar.module.scss";

const accessToken = localStorage.getItem("accessToken");

export const MemoizedNavbar = memo(function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { modalOpen, handleOpen, handleClose } = useModal();
  const { logoutUser } = useAuth();

  //hook
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);
  //hook
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === "") setSuggestions([]);
  };
  //hook
  const { debouncedValue: debouncedQuery } = useDebounce(input, 400);

  //hook
  useEffect(() => {
    const requestSuggestions = async () => {
      const url = "http://localhost:8080/search/suggestions";
      const query = `?query=${debouncedQuery}`;

      if (debouncedQuery === "") return;

      const { suggestions } = (await handleFetch(`${url}/${query}`)) as {
        suggestions: string[];
      };
      const limit = 5;
      setSuggestions(suggestions.slice(0, limit));
    };

    requestSuggestions();
  }, [debouncedQuery]);
  //hook
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !ulRef.current?.contains(e.target as Node) &&
        !document.querySelector(".search-navbar")!.contains(e.target as Node)
      ) {
        setIsSuggestionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav style={{ paddingTop: "10px" }}>
      <section>
        <Box sx={navstyles.container}>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Link to="/" style={{ marginRight: "1rem" }}>
              <Logo />
            </Link>

            <div style={{ width: "100%", position: "relative" }}>
              <SearchInput
                className="search-navbar"
                value={input}
                changeHandler={inputChange}
                setIsOpen={
                  setIsSuggestionsOpen as unknown as MouseEventHandler<HTMLInputElement> | undefined
                }
              />

              {isSuggestionsOpen && (
                <ul ref={ulRef} className={sass.suggestions}>
                  {suggestions.length === 0 ? (
                    <li className={sass.list}>No results</li>
                  ) : (
                    suggestions.map((suggestion, index) => (
                      <li className={sass.list} key={index}>
                        {suggestion}
                      </li>
                    ))
                  )}
                </ul>
              )}
            </div>
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
        { title: "History", path: "/company/history" },
        debouncedWidth < 993 ? { title: "Blog", path: "/blog" } : null,
        { title: "Join the team", path: "/company/jointheteam" },
        { title: "Press", path: "/company/press" },
        { title: "Contact us", path: "/company/contactus" },
        { title: "Help Center", path: "/company/helpcenter" },
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
    community: {
      header: "Community",
      icon: <AiOutlineTeam style={{ marginRight: "4px" }} />,
      list: [
        { title: "Become a Contributor", path: "/community/contributor" },
        { title: "Topics", path: "/community/topics" },
        { title: "Collection", path: "/community/collection" },
        { title: "Trends", path: "/community/trends" },
        { title: "Luminova Awards", path: "/community/awards" },
        { title: "Stats", path: "/community/stats" },
      ],
    },
  };

  const { company, terms, community } = listData;

  const setItems = (
    list: (typeof company)["list"] | (typeof terms)["list"] | (typeof community)["list"]
  ) =>
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
    <Menu position="bottom-end" shadow="md" width={debouncedWidth < 993 ? 300 : 600}>
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
