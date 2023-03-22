import { ImageListItem, Typography } from "@mui/material";
import { images } from "../assets/images";

const imagesStyles = {
  container: {
    position: "relative",
    ":hover .MuiTypography-root": { color: "#ededed", backgroundColor: "#141414" },
    transition: "all 0.15s ease-in-out",
    opacity: 0.97,
    ":hover": { transform: "scale(0.99)", opacity: 1 },
  },
  title: {
    position: "absolute",
    color: "transparent",
    zIndex: "1",
    bottom: "10px",
    left: "7px",
    transition: "all 0.15s linear",
    padding: "0 5px",
  },
};
export default function ImageCard() {
  return (
    <>
      {images.map(({ image, index, title }) => (
        <ImageListItem key={index} sx={imagesStyles.container}>
          <img src={image} alt={title} loading="lazy" style={{ width: "100%", height: "100%" }} />
          <Typography sx={imagesStyles.title} variant={"h5"}>
            {title}
          </Typography>
        </ImageListItem>
      ))}
    </>
  );
}
