import { CollectionWrapper } from "./CollectionWrapper";

import sass from "../../sass/user/Collections.module.scss";

export const Collections = () => {
  return (
    <>
      <div className={sass.listItems}>
        <CollectionWrapper />
      </div>
    </>
  );
};
