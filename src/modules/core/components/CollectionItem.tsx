import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import sass from "../sass/CollectionItem.module.scss";

type CollectionItemProps = {
  count: number;
  name: string;
  bg?: string;
};

export const CollectionItem: FC<CollectionItemProps> = ({ count, name, bg }) => {
  return (
    <div className={sass.wrapper} style={{ "--url": `url(${bg})` } as React.CSSProperties}>
      <p>
        <span>{count}</span> photos
      </p>
      <h4>{name}</h4>
      <AiOutlinePlus className={sass.plus} size={26} />
    </div>
  );
};
