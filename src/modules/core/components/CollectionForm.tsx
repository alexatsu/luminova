import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "@/main";
import { useAuth } from "@/hooks";
import { endpoints, handleFetch } from "@/utils";

import { Menu } from "@mantine/core";
import { FormInput } from "./FormInput";
import sass from "../sass/CollectionForm.module.scss";

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

const cdnUrl = "https://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996";
const { profile, updateImg, create } = endpoints.collections;

export const CollectionForm = ({ public_id }: { public_id: string }) => {
  const [extend, setExtend] = useState(false);
  const [collectionStatus, setCollectionStatus] = useState<{ [id: number]: boolean }>({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { handleFetchError } = useAuth();

  
  const getCollections = async () => {
    const { collection, error }: Response = await handleFetch(profile);
    
    if (handleFetchError(error)) return;
    return collection;
  };
  
  const queryKey = ["collections"];
  const { data, status } = useQuery({ queryFn: getCollections, queryKey });

  const { mutate: createCollection } = useMutation({
    mutationFn: async () => {
      const { collection, error }: Response = await handleFetch(create, "POST", {
        name: name,
        description: description,
      });

      if (handleFetchError(error)) return;
      setExtend(false);
      return collection;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },

    onError: (err) => {
      console.log(err, "error creating collection");
    },
  });

  const { mutate: updateImageInCollection } = useMutation({
    mutationFn: async ({ id, public_id }: { id: number; public_id: string }) => {
      setCollectionStatus((prevStatus) => ({ ...prevStatus, [id]: true }));

      const response = await handleFetch(updateImg, "POST", {
        collectionId: id,
        public_id: public_id,
      });

      if (handleFetchError(response.error)) return;
      return response;
    },

    onSuccess: (data, { id }) => {
      setCollectionStatus((prevStatus) => ({ ...prevStatus, [id]: true }));
      queryClient.invalidateQueries({ queryKey: queryKey });
      setTimeout(() => setCollectionStatus((prev) => ({ ...prev, [id]: false })), 500);
    },

    onError: (err, { id }) => {
      setCollectionStatus((prevStatus) => ({ ...prevStatus, [id]: false }));
      console.log(err, "error updating images in collection");
    },
  });

  const onClickCancel = () => {
    setExtend(false);
    setName("");
    setDescription("");
  };

  const ifImageInCollection = (collectionImages: { id: number; public_id: string }[]) => {
    return collectionImages.some((img) => img.public_id === public_id);
  };

  const sortDescending = (collections: Collection) => collections?.sort((a, b) => b.id - a.id);
  const sortedCollections = sortDescending(data || []);

  return (
    <>
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          onClick={() => setExtend((prev) => !prev)}
        >
          <span className={sass.newCollectionButton}>Create a new collection</span>
        </Menu.Item>
      )}

      {status === "loading" && <p style={{ textAlign: "center" }}>Loading...</p>}

      {sortedCollections?.map(({ name, collectionImages, id }) => (
        <Menu.Item className={sass.menuItem} key={id} closeMenuOnClick={false}>
          <div className={sass.imageWrapper}>
            {collectionImages.length > 0 ? (
              <img src={`${cdnUrl}/${collectionImages[0].public_id}`} alt="cdnUrl" />
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
    </>
  );
};
