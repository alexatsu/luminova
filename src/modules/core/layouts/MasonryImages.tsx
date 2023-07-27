import { useState } from "react";

import { UseMutateFunction } from "@tanstack/react-query";
import { Menu } from "@mantine/core";
import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { AiFillHeart, AiOutlineDownload, AiOutlinePlus } from "react-icons/ai";
import { Resources } from "@/types";
import { CollectionItem } from "../components/CollectionItem";
import { FormInput } from "../components/FormInput";

import sass from "../sass/layouts/MasonryImages.module.scss";

type MasonryImagesProps = {
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

type ICollections = {
  count: number;
  name: string;
  descr: string;
  bg?: string;
};

export function MasonryImages({ width, data, updateFavImages, download }: MasonryImagesProps) {
  const [extend, setExtend] = useState(false);
  const [descrValue, setDescrValue] = useState("");
  const [name, setName] = useState("");
  const [collections, setCollections] = useState<ICollections[]>([]);

  const maxLength = 250 - descrValue.length;

  const onClickCreate = () => {
    setCollections((prev: ICollections[]) => [
      ...prev,
      { count: 1, name: name, descr: descrValue },
    ]);
    setExtend(false);
    setName("");
    setDescrValue("");
  };

  const onClickCancel = () => {
    setExtend(false);
    setName("");
    setDescrValue("");
  };

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
                closeDelay={100}
              >
                <Menu.Target>
                  <IconButton className={sass.collectionButton}>
                    <AiOutlinePlus size={20} />
                  </IconButton>
                </Menu.Target>
                <Menu.Dropdown className={sass.dropdown}>
                  <h3>Add to Collection</h3>

                  {extend ? (
                    <fieldset>
                      <FormInput
                        label={"Collection name"}
                        type={"text"}
                        attribute={"name"}
                        autocomplete="off"
                        placeholder="Limitnova"
                        value={name}
                        setValue={setName}
                      />

                      <div className={sass.textarea}>
                        <label htmlFor="descr-collection">Description</label>
                        <textarea
                          id="descr-collection"
                          name="descr-collection"
                          rows={5}
                          autoComplete="on"
                          placeholder=""
                          value={descrValue}
                          onChange={(e) => setDescrValue(e.target.value)}
                        />

                        <span
                          className={sass.descrValue}
                          style={{ color: maxLength < 0 ? "red" : "gray" }}
                        >
                          {maxLength}
                        </span>
                      </div>

                      <div className={sass.buttons}>
                        <button className={sass.cancel} onClick={onClickCancel}>
                          Cancel
                        </button>

                        <button className={sass.create} onClick={onClickCreate}>
                          Create collection
                        </button>
                      </div>
                    </fieldset>
                  ) : (
                    <Menu.Item
                      className={sass.menuItem}
                      closeMenuOnClick={false}
                      onClick={() => setExtend((prev) => !prev)}
                    >
                      <button className={sass.newCollectionButton}>Create a new collection</button>
                    </Menu.Item>
                  )}

                  <Menu.Item className={sass.menuItem} closeMenuOnClick={false}>
                    <CollectionItem count={0} name={"Name Collection"} bg={url} />
                  </Menu.Item>

                  {collections.map((item) => (
                    <Menu.Item className={sass.menuItem} key={item.name} closeMenuOnClick={false}>
                      <CollectionItem count={item.count} name={item.name} />
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </div>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  );
}
