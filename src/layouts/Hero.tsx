import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import useResizeWidth from "../hooks/useResizeWidth";
import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { imagesStyles } from "../styles/imageCard";

const baseURL = "http://localhost:8080";
type ImagesProps = {
  public_id: string;
  url: string;
  filename: string;
};
type ImageResources = { resources: ImagesProps[] };
export default function Hero() {
  const [img, setImg] = useState<null | ImageResources>();
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
          {img?.resources.map(({ public_id, url, filename }: ImagesProps) => (
            <ImageListItem key={public_id} sx={imagesStyles.container}>
              <img
                src={url}
                alt={filename}
                loading={"lazy"}
                style={{ width: "100%", height: "100%" }}
              />
              <Typography sx={imagesStyles.title} variant={"h5"}>
                {filename}
              </Typography>
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </Container>
  );
}
