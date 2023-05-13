import { Loader } from "@/components/Loader";
import { endpoints } from "@/utils";
import { imagesStyles } from "@/styles/imageCard";
import { useSearchImagesStore } from "@/store/useSearchImagesStore";
import { useResizeWidth, useFetchImageData } from "@/hooks";
import { useEffect, useState } from "react";
import { Box, ImageList, ImageListItem, Typography } from "@mui/material";

export function Hero() {
  const width = useResizeWidth();
  const { data, isLoading } = useFetchImageData(endpoints.images.getImages);
  const { query } = useSearchImagesStore();
  const [initialImages, setInitialImages] = useState(data?.resources);

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      const filterImages = data?.resources.filter(({ public_id }) => {
        const lowerCasedTitle = public_id.toLowerCase();
        const lowerCasedQuery = query.toLowerCase();
        return lowerCasedTitle.includes(lowerCasedQuery);
      });
      setInitialImages(filterImages);
    }, 500);
    return () => clearTimeout(debouncedSearch);
  }, [data, query]);

  const Images = () => (
    <ImageList variant="masonry" cols={width > 568 ? 3 : 1} gap={8}>
      <>
        {initialImages?.map(({ public_id, url, filename }) => (
          <ImageListItem key={public_id} sx={imagesStyles.container}>
            <img
              src={url}
              alt={filename}
              loading={"eager"}
              style={{ width: "100%", height: "100%" }}
            />
            <Typography sx={imagesStyles.title} variant={"h5"}>
              {filename}
            </Typography>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  );

  return <Box sx={{margin: "auto"}}>{isLoading ? <Loader /> : <Images />}</Box>;
}
