import { ImageListItem } from "@mui/material";
import { images } from "../assets/images";

export default function ImageCard() {
  return (
    <>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img src={image} alt={image} loading="lazy" style={{ width: "100%", height: "100%" }} />
        </ImageListItem>
      ))}
    </>
  );
}
