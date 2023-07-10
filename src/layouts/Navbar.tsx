import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import { Box, IconButton, Button } from "@mui/material";
import { List, Menu, Text, Accordion } from "@mantine/core";

import { useResizeWidth, useModal, useDebounce } from "@/hooks";
import { navstyles } from "@/styles/navbar";

import sass from "../styles/components/UploadModal.module.scss";
import { Logo } from "@/components";
import { SearchInput, UploadModal } from "@/components/form";
import { Xshape } from "@/components/icons";

import { Link, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { reuseAuth } from "@/services/auth";

import { GiHamburgerMenu as Gigachamburger } from "react-icons/gi";
import {
  AiOutlineClose,
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
          {accessToken ? <PageButton path="blog" /> : <PageButton path="discover" />}
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
            sx={{ width: "100%", "@media (max-width: 768px)": { display: "none" } }}
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

// function UploadButton({ handleOpen }: { handleOpen: () => void }) {
//   return (
//     <Button className="button-upload" onClick={handleOpen} sx={{ width: "100%" }}>
//       Upload a photo
//     </Button>
//   );
// }

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
        <Link to={`/${userName}`}style={{ textDecoration: "none" }}>
          <Menu.Item>View Profile</Menu.Item>
        </Link>
        <Menu.Item>Stats</Menu.Item>
        <Menu.Item>Account settings</Menu.Item>
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

function ModalContent({ handleClose }: { handleClose: () => void }) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const width = useResizeWidth();
  console.log(uploadedFiles, "uploadedFiles");

  const test = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    type Target = HTMLImageElement & { naturalWidth: number; naturalHeight: number };
    console.log(e);
    const { naturalWidth, naturalHeight } = e.target as Target;
    console.log(naturalWidth, naturalHeight);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...e.target.files!] as File[];
    const urls = files.map((file) => URL.createObjectURL(file));

    setImageUrls((prevImages) => [...prevImages, ...urls]);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const sendToBackend = async (files: File[], e) => {
    e.preventDefault();
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(`file`, file);
      const url = URL.createObjectURL(file);
      console.log(url, "url");
    });
    const userName = localStorage.getItem("userName") as string;
    formData.append('userName', userName);
    console.log(formData, "formData");

    const response = await fetch("http://localhost:8080/images/upload", {
      method: "POST",
      body: formData,
     
    });
    const data = await response.json();
    console.log(data, "data");
  };

  const removeImage = (url: string) => {
    setImageUrls((prevImages) => prevImages.filter((image) => image !== url));
  };

  return (
    <div style={{ top: `calc(50% + ${window.scrollY}px)` }} className={sass.modalContainer}>
      <section className={sass.sectionTop}>
        <h3 style={{ margin: "auto" }}>Submit to Editorial</h3>
        <button onClick={handleClose} style={{ all: "unset", cursor: "pointer" }}>
          <Xshape className={sass.closeIcon} />
        </button>
      </section>

      <form className={sass.sectionForm} encType="multipart/form-data">
        <input
          id="upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          multiple
          onChange={handleFileUpload}
          disabled={imageUrls.length >= 10}
        />

        {width < 768 && (
          <>
            {imageUrls.length < 10 && (
              <Uploader className={imageUrls.length > 0 ? sass.filledImages : sass.uploadBtn} />
            )}
          </>
        )}

        <ul className={sass.imageList}>
          {width >= 768 && (
            <>{imageUrls.length < 10 && <Uploader className={sass.uploadInList} />}</>
          )}
          {imageUrls.map((url) => {
            return (
              <li key={url} className={sass.imageItem}>
                <img onClick={(e) => test(e)} src={url} width={200} height={200} alt="upload" />
                <button
                  onClick={() => removeImage(url)}
                  children={<AiOutlineClose size={14} fontWeight={"bold"} />}
                />
              </li>
            );
          })}
        </ul>
        {/*  */}
        <button onClick={(e) => sendToBackend(uploadedFiles, e)}>test</button>
        {/*  */}
      </form>

      <div className={sass.sumbitContainer}>
        {imageUrls.length < 10 && <div style={{ padding: "10px" }}>{imageUrls.length} images</div>}
        {imageUrls.length >= 10 && <div style={{ color: "red" }}>Max 10 images</div>}
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
function Uploader({ className }: { className: string }) {
  return (
    <label htmlFor="upload" className={className}>
      <img src={uploadImg} alt="upload" />
      <div>Add your photos here</div>
    </label>
  );
}
