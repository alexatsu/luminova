import { CollectionWrapper } from "../../components/CollectionWrapper";

import sass from "../../sass/user/Collections.module.scss";

export const Collections = () => {
  return (
    <>
      <div className={sass.listItem}>
        <CollectionWrapper />
        <CollectionWrapper />
      </div>
    </>
  );
};
