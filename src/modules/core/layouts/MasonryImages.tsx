import { UseMutateFunction } from "@tanstack/react-query";
import { Menu } from "@mantine/core";
import { IconButton, ImageList, ImageListItem } from "@mui/material";
import { AiFillHeart, AiOutlineDownload, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Resources } from "@/types";

import sass from "../sass/layouts/MasonryImages.module.scss";
import { useAuth } from "@/hooks";
import { endpoints, handleFetch } from "@/utils";
import { useCollections } from "../hooks";

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

export function MasonryImages({ width, data, updateFavImages, download }: MasonryImagesProps) {
  return (
    <ImageList
      sx={{
        padding: "0 40px",
        "@media (max-width: 993px)": { padding: "0 15px" },
        "@media (max-width: 768px)": { padding: "0 5px" },
        marginBottom: "20px",
      }}
      variant={"masonry"}
      cols={width > 993 ? 3 : width >= 768 ? 2 : 1}
      gap={8}
    >
      <div>
        {data?.map(({ public_id, url, filename, favorite, inCollection }) => (
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
                openDelay={200}
                closeDelay={100}
                closeOnClickOutside={true}
              >
                <Menu.Target>
                  <IconButton
                    className={inCollection ? sass.collectionButtonActive : sass.collectionButton}
                  >
                    <AiOutlinePlus size={20} />
                  </IconButton>
                </Menu.Target>
                <Menu.Dropdown className={sass.dropdown}>
                  <h3>Add to Collection</h3>
                  <CollectionForm public_id={public_id} />
                </Menu.Dropdown>
              </Menu>
            </div>
          </ImageListItem>
        ))}
      </div>
    </ImageList>
  );
}

type Collection = {
  id: number;
  name: string;
  description: string;
  user_id: string;
  collectionImages: { id: number; public_id: string }[];
}[];

type Response = {
  collection: Collection;
  message: string;
  error: string;
};

const { collections, cdn } = endpoints;

export const CollectionForm = ({ public_id }: { public_id: string }) => {
  const { handleFetchError } = useAuth();

  const getCollections = async () => {
    const { collection, error }: Response = await handleFetch(collections.profile);

    if (handleFetchError(error)) return;
    return collection;
  };

  const queryKey = ["collections"];
  const {
    getCollections: { data, status },
    createCollections: { createCollection, collectionData, setCollectionData },
    updateImagesInCollection: { updateImageInCollection, collectionStatus },
  } = useCollections(queryKey, () => getCollections());

  const onClickCancel = () => setCollectionData({ name: "", description: "", extend: false });

  const ifImageInCollection = (collectionImages: { id: number; public_id: string }[]) => {
    return collectionImages.some((img) => img.public_id === public_id);
  };

  const sortDescending = (collections: Collection) => collections?.sort((a, b) => b.id - a.id);
  const sortedCollections = sortDescending(data || []);

  return (
    <div>
      {collectionData.extend ? (
        <fieldset>
          <div className={sass.form} style={{ marginTop: "20px" }}>
            <label htmlFor={"name"}>{"Collection name"}</label>
            <input
              type={"text"}
              id={"name"}
              name={"name"}
              autoComplete={"off"}
              placeholder={"Limitnova"}
              value={collectionData.name}
              onChange={(e) => setCollectionData((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className={sass.textarea}>
            <label htmlFor="descr-collection">Description</label>
            <textarea
              id="descr-collection"
              name="descr-collection"
              rows={5}
              autoComplete="on"
              placeholder=""
              value={collectionData.description}
              onChange={(e) =>
                setCollectionData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div className={sass.buttons}>
            <button className={sass.cancel} onClick={onClickCancel}>
              Cancel
            </button>

            <button className={sass.create} onClick={() => createCollection()}>
              Create collection
            </button>
          </div>
        </fieldset>
      ) : (
        <Menu.Item
          className={sass.menuItem}
          closeMenuOnClick={false}
          onClick={() => setCollectionData((prev) => ({ ...prev, extend: !prev.extend }))}
        >
          <span className={sass.newCollectionButton}>Create a new collection</span>
        </Menu.Item>
      )}

      {status === "loading" && <p style={{ textAlign: "center" }}>Loading...</p>}

      {sortedCollections?.map(({ name, collectionImages, id }) => (
        <Menu.Item className={sass.menuItem} key={id} closeMenuOnClick={false}>
          <div className={sass.imageWrapper}>
            {collectionImages.length > 0 ? (
              <img src={`${cdn.cloudinary}/${collectionImages[0].public_id}`} alt="cdnUrl" />
            ) : (
              <div style={{ height: "100px", backgroundColor: "black" }}>fallback</div>
            )}

            {ifImageInCollection(collectionImages) && <div className={sass.greenOverlay}></div>}
          </div>

          <div className={sass.collectionCard}>
            <div className={sass.text}>
              <span>{collectionImages.length} photos</span>
              <h4>{name}</h4>
            </div>

            {collectionStatus[id] ? (
              <div className={sass.spinner}></div>
            ) : ifImageInCollection(collectionImages) ? (
              <AiOutlineMinus
                className={sass.minus}
                size={26}
                onClick={() => updateImageInCollection({ id: id, public_id: public_id })}
              />
            ) : (
              <AiOutlinePlus
                className={sass.plus}
                size={26}
                onClick={() => updateImageInCollection({ id: id, public_id: public_id })}
              />
            )}
          </div>
        </Menu.Item>
      ))}
    </div>
  );
};
