import { useEffect, useState } from "react";
// import ImageCard from "../components/ImageCard";
import useResizeWidth from "../hooks/useResizeWidth";
import { Container, ImageList, ImageListItem, Typography } from "@mui/material";
import { imagesStyles } from "../styles/imageCard";
import { dummyImgData } from "./dummyData";
import ImageSkeleton from "../components/ImageSkeleton";
import { useImagesStore } from "../store/useImagesStore";

const baseURL = "http://localhost:8080";
type ImagesProps = {
  public_id: string;
  url: string;
  filename: string;
};
type ImageResources = { resources: ImagesProps[] };
export default function Hero() {
  const width = useResizeWidth();
  const { query } = useImagesStore();
  const [img, setImg] = useState<null | ImageResources>();
  const [isLoading, setIsLoading] = useState(false);
  const [initialImages, setInitialImages] = useState(img?.resources);
  const images: ImagesProps[] = dummyImgData;

  useEffect(() => {
    // fetch(`http://localhost:8080/api/images`)
    fetch(`https://long-lime-caridea-slip.cyclic.app/api/images`)
      .then(response => {
        setIsLoading(true);
        return response.json();
      })
      .then(data => {
        console.log(data);
        setImg(data);
      })
      .catch(error => console.error(error))
      .finally(() => setIsLoading(false));
      
  }, []);
  console.log(img, "img");
  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      const filterImages = img?.resources.filter(({ public_id }) => {
        const lowerCasedTitle = public_id.toLowerCase();
        const lowerCasedQuery = query.toLowerCase();
        return lowerCasedTitle.includes(lowerCasedQuery);
      });
      setInitialImages(filterImages);
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [img, query]);

  return (
    <Container sx={{ marginTop: "100px" }}>
      <ImageList variant="masonry" cols={width > 568 ? 3 : 1} gap={8}>
        <>
          {initialImages?.map(({ public_id, url, filename }) => (
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
