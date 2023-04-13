import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import useResizeWidth from "../hooks/useResizeWidth";
import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { imagesStyles } from "../styles/imageCard";
import { dummyImgData } from "./dummyData";
import ImageSkeleton from "../components/ImageSkeleton";

const baseURL = "http://localhost:8080";
type ImagesProps = {
  public_id: string;
  url: string;
  filename: string;
};
type ImageResources = { resources: ImagesProps[] };
export default function Hero() {
  const [img, setImg] = useState<null | ImageResources>();
  const [isLoading, setIsLoading] = useState(false);

  const width = useResizeWidth();
  const images: ImagesProps[] = dummyImgData;
  // useEffect(() => {
  //   fetch(`${baseURL}/api/images`)
  //     .then(response => {
  //       setIsLoading(true);
  //       return response.json();
  //     })
  //     .then(data => setImg(data))
  //     .catch(error => console.error(error))
  //     .finally(() => setIsLoading(false));
  // }, []);
  console.log(img, "img");

  return (
    <main>
      <Container sx={{ marginTop: "100px" }}>
        <ImageList
          variant="masonry"
          cols={width > 568 ? 3 : 1}
          gap={8}
          style={{ overflow: "hidden" }}
        >
          <>
            {images.map(({ public_id, url, filename }: ImagesProps) => (
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
          {isLoading ? <ImageSkeleton count={3} /> : null}
        </ImageList>
      </Container>
    </main>
  );
}
