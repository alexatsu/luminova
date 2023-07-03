import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { List, Menu, Text, Accordion } from "@mantine/core";

import { useResizeWidth, useModal } from "@/hooks";
import { navstyles } from "@/styles/navbar";

import sass from "../styles/components/UploadModal.module.scss";
import { Logo } from "@/components";
import { SearchInput, UploadModal } from "@/components/form";

import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { reuseAuth } from "@/services/auth";

import { GiHamburgerMenu as Gigachamburger } from "react-icons/gi";
import {
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlineUser,
} from "react-icons/ai";

import uploadImg from "../assets/uploadImg.jpg";
import { useState } from "react";

export function Navbar() {
  const { modalOpen, handleOpen, handleClose } = useModal();
  const navigate = useNavigate();
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
      </Box>
      <UploadModal modalOpen={modalOpen}>
        <ModalContent handleClose={handleClose} />
      </UploadModal>
    </nav>
  );
}

function PageButton({ path }: { path: string }) {
  const buttonText = path.charAt(0).toUpperCase() + path.slice(1);
  return (
    <Link to={`/${path}`}>
      <Button className={"button-nav-page"}>{buttonText}</Button>
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
  const width = useResizeWidth();

  const listData = {
    company: {
      header: "Company",
      icon: <AiOutlineHome style={{ marginRight: "4px" }} />,
      list: [
        { title: "About", path: "/company/about" },
        width < 993 ? { title: "Advertise", path: "/advertise" } : null,
        { title: "History", path: "/company/history" },
        width < 993 ? { title: "Blog", path: "/blog" } : null,
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

  const setItems = (list: any) =>
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
          <Box sx={{ display: "flex", marginTop: "20px", width: "100%" }}>
            {children}
          </Box>
        ) : null}
      </Menu.Dropdown>
    </Menu>
  );
}

function ModalContent({ handleClose }: { handleClose: () => void }) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const width = useResizeWidth();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = (e.target.files || []) as File[];
    setImageUrls((prevImages) => [URL.createObjectURL(images[0])].concat(prevImages));
  };

  // const removeImage = (index: number) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // }

  return (
    <div style={{ top: `calc(50% + ${window.scrollY}px)` }} className={sass.modalContainer}>
      <section className={sass.sectionTop}>
        <h3 style={{ margin: "auto" }}>Submit to Luminova</h3>
        <button onClick={handleClose} style={{ all: "unset", cursor: "pointer" }}>
          <svg
            className={sass.closeIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            version="1.1"
            aria-hidden="false"
          >
            <desc lang="en-US">An X shape</desc>
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
          </svg>
        </button>
      </section>

      <form className={sass.sectionForm} style={{ overflow: "auto" }}>
        {width < 768 && (
          <label
            htmlFor="upload"
            className={imageUrls.length > 0 ? sass.filledImages : sass.uploadBtn}
          >
            <img src={uploadImg} alt="upload" height={80} width={110} />
            <div>Add your photos here</div>
          </label>
        )}
        <input
          id="upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          multiple
          onChange={handleFileUpload}
        />
        <ul className={sass.imageList} style={{ listStyle: "none", height: "200px" }}>
          <>
            {width >= 768 && (
              <label
                htmlFor="upload"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "200px",
                }}
                // className={imageUrls.length > 0 ? sass.filledImages : sass.uploadBtn}
              >
                <img
                  src={uploadImg}
                  alt="upload"
                  height={100}
                  width={200}
                  style={{ objectFit: "contain" }}
                />
                <div>Add your photos here</div>
              </label>
            )}

            {imageUrls.map((url) => {
              return (
                <li key={url} style={{ marginBottom: "5px" }}>
                  <img src={url} width={200} height={200} alt="upload" />
                </li>
              );
            })}
          </>
        </ul>
      </form>

      <div className={sass.sumbitContainer}>
        {imageUrls.length > 0 && <div style={{ padding: "10px" }}>{imageUrls.length} images</div>}
        <button className={sass.submitBtn}>
          <span>Submit to Luminova</span>
        </button>

        <p className={sass.licenseText}>
          Read the <Link to={"/tos/license"}>Luminova License</Link>
        </p>
      </div>
    </div>
  );
}