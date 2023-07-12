import { Link } from "react-router-dom";

import sass from "../sass/user/CollectionWrapper.module.scss";

export const CollectionWrapper = () => {
  return (
    <div style={{ marginRight: "25px" }}>
      <Link to="/profile" className={sass.wrapper}>
        <div className={sass.firstImg}></div>
        <div className={sass.secondImg}></div>
        <div className={sass.thirdImg}></div>
      </Link>
      <Link to="/profile" className={sass.title}>
        NAME COLLECTION
      </Link>
      <div className={sass.info}>
        <span>0 photo ·</span>
        <p>
          Curated by <Link to="/profile">USERNAME</Link>
        </p>
      </div>
    </div>
  );
};
