import { imagesStyles } from "@/styles/imageCard";
import { IconButton, ImageList, ImageListItem, SxProps, Theme, Typography } from "@mui/material";
import { AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { ImageResources, ImagesProps } from "@/types";
import { UseMutateFunction } from "@tanstack/react-query";

const { buttonHeart, buttonHeartActive, container, title, downloadButton } = imagesStyles as {
  [key: string]: SxProps<Theme>;
};
type ImagesBlockProps = {
  width: number;
  data: ImageResources;
  updateFavImages: UseMutateFunction<
    ImagesProps[] | undefined,
    unknown,
    string,
    {
      previousQuery: unknown;
    }
  >;
  download: (url: string, filename: string) => void;
};

export function ImagesBlock({ width, data, updateFavImages, download }: ImagesBlockProps) {
  return (
    <>
      <ImageList
        sx={{
          padding: "0 25px",
          "@media (max-width: 993px)": { padding: "0 15px" },
          "@media (max-width: 768px)": { padding: "0" },
        }}
        variant={"masonry"}
        cols={width > 993 ? 3 : width > 768 ? 2 : 1}
        gap={16}
      >
        <>
          {data?.resources.map(({ public_id, url, filename, favorite }) => (
            <ImageListItem key={public_id} sx={container}>
              <img src={url} alt={filename} loading={"eager"} style={{ borderRadius: "8px" }} />

              <IconButton sx={downloadButton} onClick={() => download(url, filename)}>
                <AiOutlineDownload size={18} />
              </IconButton>

              <IconButton
                sx={favorite ? buttonHeartActive : buttonHeart}
                onClick={() => updateFavImages(public_id)}
              >
                <AiFillHeart size={16} />
              </IconButton>
              
              <Typography sx={title} variant={"h5"} className="title">
                {filename}
              </Typography>
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </>
  );
}
