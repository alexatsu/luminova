import { useState } from "react";
import { FormInput } from "./FormInput";
import { Menu } from "@mantine/core";

import sass from "../sass/CollectionForm.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { handleFetch } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/main";

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

export const CollectionForm = ({ public_id }: { public_id: string }) => {
  const [extend, setExtend] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const queryKey = ["collections"];
  const fetchData = async () => {
    const response: Response = await handleFetch(`http://localhost:8080/collections/profile`);
    const { collection, error } = response;

    if (error === "Refresh token missing" || error === "User not found") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      return;
    }
    return collection;
  };

  const { data, status } = useQuery({
    queryFn: fetchData,
    queryKey: queryKey,
  });

  const { mutate: createCollection } = useMutation({
    mutationFn: async () => {
      const response: Response = await handleFetch(
        `http://localhost:8080/collections/create`,
        "POST",
        { name: name, description: description }
      );

      const { collection, error } = response;

      if (error === "Refresh token missing" || error === "User not found") {
        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        return;
      }
      return collection;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },

    onError: (err) => {
      console.log(err, "error creating collection");
    },
  });

  type UpdateCollectionImg = {
    id: number;
    public_id: string;
  };
  const { mutate: updateImageInCollection } = useMutation({
    mutationFn: async ({ id, public_id }: UpdateCollectionImg) => {
      console.log(id, public_id, "payload in update");
      const response = await handleFetch(`http://localhost:8080/collections/updateimage`, "POST", {
        collectionId: id,
        public_id: public_id,
      });

      if (response.error === "Refresh token missing" || response.error === "User not found") {
        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        return;
      }
      console.log(response, "response");
      return response;
    },
  
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError: (err) => {
      console.log(err, "error updating images in collection");
    },
  });

  const onClickCancel = () => {
    setExtend(false);
    setName("");
    setDescription("");
  };
  const checkIfImageIncollection = (collectionImages: { id: number; public_id: string }[]) => {
    return collectionImages.some((img) => img.public_id === public_id);
  };

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
      {data?.map(({ name, collectionImages, id }) => (
        <Menu.Item className={sass.menuItem} key={id} closeMenuOnClick={false}>
          <div className={sass.imageWrapper}>
            {collectionImages.length > 0 ? (
              <img
                src={`http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996/${collectionImages[0].public_id}`}
                alt=""
              />
            ) : (
              <div style={{ height: "100px", backgroundColor: "black" }}>fallback</div>
            )}
            {checkIfImageIncollection(collectionImages) && <div className={sass.greenOverlay} />}
          </div>
          <div className={sass.collectionCard}>
            <div className={sass.text}>
              <span>{collectionImages.length} photos</span>
              <h4>{name}</h4>
            </div>
            {checkIfImageIncollection(collectionImages) ? (
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
