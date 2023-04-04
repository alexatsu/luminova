import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import useResizeWidth from "../hooks/useResizeWidth";
import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { imagesStyles } from "../styles/imageCard";

const baseURL = "http://localhost:8080";
type Images = {
  id: string;
  image: string;
  title: string;
};
export default function Hero() {
  const [img, setImg] = useState<null | Images[]>();
  const width = useResizeWidth();

  useEffect(() => {
    fetch(`${baseURL}/api/images`)
      .then((response) => response.json())
      .then((data) => setImg(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(img, "img");

  return (
    <Container sx={{ marginTop: "100px" }}>
      <ImageList variant="masonry" cols={width > 568 ? 3 : 1} gap={8}>
        <>
          {img?.map(({ id, image, title }) => (
            <ImageListItem key={id} sx={imagesStyles.container}>
              <img
                key={id}
                src={`${baseURL}/${image}`}
                alt={title}
                loading={"lazy"}
                style={{ width: "100%", height: "100%" }}
              />
              <Typography sx={imagesStyles.title} variant={"h5"}>
                {title}
              </Typography>
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </Container>
  );
}
