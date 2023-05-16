import { Loader } from "@/components/Loader";
import { endpoints } from "@/utils";
import { imagesStyles } from "@/styles/imageCard";
import { useSearchImagesStore } from "@/store/useSearchImagesStore";
import { useResizeWidth, useFetchImageData } from "@/hooks";
import { useEffect, useState } from "react";
import { Box, ImageList, ImageListItem, SxProps, Theme, Typography } from "@mui/material";
import { Button, Sx } from "@mantine/core";
import { AiFillHeart } from "react-icons/ai";
import { ImagesProps } from "@/hooks/useFetchImageData";

export function Hero() {
  const width = useResizeWidth();
  const { query } = useSearchImagesStore();
  const { data, isLoading } = useFetchImageData(endpoints.images.getImages);
  const [initialImages, setInitialImages] = useState(data?.resources);

  const { buttonHeart, buttonHeartActive, container, title } = imagesStyles as {
    buttonHeart: Sx;
    buttonHeartActive: Sx;
    container: SxProps<Theme>;
    title: SxProps<Theme>;
  };
  const addImagesToFavorites = (id: ImagesProps["public_id"]) => {
    setInitialImages((prevImages) =>
      prevImages!.map((image) =>
        image.public_id === id ? { ...image, active: !image.active } : image
      )
    );
  };

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
        {initialImages?.map(({ public_id, url, filename, active }) => (
          <ImageListItem key={public_id} sx={container}>
            <img
              src={url}
              alt={filename}
              loading={"eager"}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
            />
            <Button
              sx={active ? buttonHeartActive : buttonHeart}
              onClick={() => addImagesToFavorites(public_id)}
            >
              <AiFillHeart size={16} />
            </Button>
            <Typography sx={title} variant={"h5"}>
              {public_id}
            </Typography>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  );

  return <Box sx={{ margin: "auto" }}>{isLoading ? <Loader /> : <Images />}</Box>;
}
