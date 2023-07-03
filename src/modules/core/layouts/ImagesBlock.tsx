import "../sass/layouts/ImagesBlock.scss";
import { imagesStyles } from "@/styles/imageCard";
import {
  IconButton,
  ImageList,
  ImageListItem,
  SxProps,
  Theme,
} from "@mui/material";
import { AiFillHeart, AiOutlineDownload } from "react-icons/ai";
import { Resources } from "@/types";
import { UseMutateFunction } from "@tanstack/react-query";

import "../sass/layouts/ImagesBlock.scss";

const { buttonHeart, buttonHeartActive, container, downloadButton } =
  imagesStyles as {
    [key: string]: SxProps<Theme>;
  };
type ImagesBlockProps = {
  width: number;
  data: Resources[];
  updateFavImages: UseMutateFunction<
    Resources | undefined,
    unknown,
    string,
    {
      previousQuery: unknown;
    }
  >;
  download: (url: string, filename: string) => void;
};

export function ImagesBlock({
  width,
  data,
  updateFavImages,
  download,
}: ImagesBlockProps) {
  // console.log(data, "data");

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
          {data?.map(({ public_id, url, filename, favorite }) => (
            <ImageListItem
              className="image-list-item"
              key={public_id}
              sx={container}
              onClick={() => console.log(public_id, filename)}
            >
              <img className="image"
                src={url}
                alt={filename}
                loading={"lazy"}
                style={{ borderRadius: "8px", maxWidth: "100%" }}
                title={filename}
              />

              <div className="image-tools">
                <IconButton
                  sx={downloadButton}
                  onClick={() => download(url, filename)}
                >
                  <AiOutlineDownload size={18} />
                </IconButton>

                <IconButton
                  sx={favorite ? buttonHeartActive : buttonHeart}
                  onClick={() => updateFavImages(public_id)}
                >
                  <AiFillHeart size={16} />
                </IconButton>
              </div>
            </ImageListItem>
          ))}
        </>
      </ImageList>
    </>
  );
}
