import { IconButton, ImageListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useImagesStore } from "../store/useImagesStore";
import { imagesStyles } from "../styles/imageCard";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ImageCard() {
  const { img, query } = useImagesStore();
  const [initialImages, setInitialImages] = useState(img);

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      const filterImages = img.filter(({ title }) => {
        const lowerCasedTitle = title.toLowerCase();
        const lowerCasedQuery = query.toLowerCase();
        return lowerCasedTitle.includes(lowerCasedQuery);
      });
      setInitialImages(filterImages);
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [img, query]);

  return (
    <>
      {initialImages.map(({ image, id, title }) => (
        <ImageListItem key={id} sx={imagesStyles.container}>
          <img src={image} alt={title} loading="lazy" style={{ width: "100%", height: "100%" }} />
          <Typography sx={imagesStyles.title} variant={"h5"}>
            {title}
          </Typography>
        </ImageListItem>
      ))}
    </>
  );
}
