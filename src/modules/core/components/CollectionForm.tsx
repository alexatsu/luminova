import { useState } from "react";
import { FormInput } from "./FormInput";
import { Menu } from "@mantine/core";

import sass from "../sass/CollectionForm.module.scss";
import { AiOutlinePlus } from "react-icons/ai";

type ICollections = {
  count: number;
  name: string;
  description: string;
  bg?: string;
};

export const CollectionForm = () => {
  const [extend, setExtend] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [collections, setCollections] = useState<ICollections[]>([]);

  const onClickCreate = () => {
    setCollections((prev: ICollections[]) => [
      ...prev,
      { count: 1, name: name, description: description },
    ]);
    setExtend(false);
    setName("");
    setDescription("");
  };

  const onClickCancel = () => {
    setExtend(false);
    setName("");
    setDescription("");
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

      {collections.map((item) => (
        <Menu.Item className={sass.menuItem} key={item.name} closeMenuOnClick={false}>
          <div
            className={sass.collectionItems}
            style={{ "--url": `url(${item.bg})` } as React.CSSProperties}
          >
            <p>
              <span>{item.count}</span> photos
            </p>
            <h4>{item.name}</h4>
            <AiOutlinePlus className={sass.plus} size={26} />
          </div>
        </Menu.Item>
      ))}
    </>
  );
};
