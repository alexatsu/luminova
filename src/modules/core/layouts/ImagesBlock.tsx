import { UseMutateFunction } from "@tanstack/react-query";
import { Menu } from "@mantine/core";
import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { AiFillHeart, AiOutlineDownload, AiOutlinePlus } from "react-icons/ai";
import { Resources } from "@/types";

import { CollectionItem } from "../components/CollectionItem";

import sass from "../sass/layouts/ImagesBlock.module.scss";

type ImagesBlockProps = {
  width: number;
  data: Resources[];
  updateFavImages: UseMutateFunction<
    Resources | undefined,
    unknown,
    string,
    { previousQuery: unknown }
  >;
  download: (url: string, filename: string) => void;
};

export function ImagesBlock({ width, data, updateFavImages, download }: ImagesBlockProps) {
  return (
    <ImageList
      sx={{
        padding: "0 40px",
        "@media (max-width: 993px)": { padding: "0 15px" },
        "@media (max-width: 768px)": { padding: "0" },
      }}
      variant={"masonry"}
      cols={width > 993 ? 3 : width > 768 ? 2 : 1}
      gap={8}
    >
      <>
        {data?.map(({ public_id, url, filename, favorite }) => (
          <ImageListItem
            className={sass.imageListItem}
            key={public_id}
            onClick={() => console.log(public_id, filename)}
          >
            <img
              className={sass.image}
              src={url}
              alt={filename}
              loading={"lazy"}
              title={filename}
            />

            <div className={sass.imageTools}>
              <IconButton className={sass.downloadButton} onClick={() => download(url, filename)}>
                <AiOutlineDownload size={18} />
              </IconButton>

              <IconButton
                className={favorite ? sass.buttonHeartActive : sass.buttonHeart}
                onClick={() => updateFavImages(public_id)}
              >
                <AiFillHeart size={16} />
              </IconButton>

              <Menu
                width={width > 424 ? 425 : 320}
                shadow="md"
                trigger="hover"
                openDelay={200}
                closeDelay={30}
              >
                <Menu.Target>
                  <IconButton className={sass.collectionButton}>
                    <AiOutlinePlus size={20} />
                  </IconButton>
                </Menu.Target>

                <Menu.Dropdown className={sass.dropdown}>
                  <h3>Add to Collection</h3>
                  <Menu.Item className={sass.menuItem}>
                    <div className={sass.newCollectionButton}>Create a new collection</div>
                  </Menu.Item>

                  <Menu.Item className={sass.menuItem}>
                    <CollectionItem count={0} name={"Name Collection"} bg={url} />
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  );
}
