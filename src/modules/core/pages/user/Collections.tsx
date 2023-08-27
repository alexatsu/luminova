import { useEffect, useRef, useState } from "react";

import sass from "../../sass/pages/user/Collections.module.scss";
import { Link } from "react-router-dom";
import { endpoints, handleFetch } from "@/utils";
import { useAuth } from "@/hooks";
import greyBack from "@/assets/greyBack.jpg";

type Collection = {
  id: number;
  name: string;
  description: string;
  user_id: string;
  collectionImages: { id: number; public_id: string }[];
}[];

const { profile } = endpoints.collections;
const { listItem, preview, rightBlock, leftBlock, title, info, wrapper } = sass;
const url = `https://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996`;
const fallBack = <img src={greyBack} alt={"fallBack"} />;

export const Collections = () => {
  const [data, setData] = useState<Collection>([]);
  const userName = localStorage.getItem("userName");
  const { handleFetchError } = useAuth();

  const fetchErrorRef = useRef((error: string) => handleFetchError(error));

  const getCollections = async () => {
    type Fetch = { collection: Collection; error: string };
    const { collection, error }: Fetch = await handleFetch(profile);

    if (fetchErrorRef.current(error)) return;
    setData(collection);
  };

  useEffect(() => {
    getCollections();
  }, []);

  const filterEmptyCollections = data?.filter((item) => item.collectionImages.length > 0);

  return (
    <div className={listItem}>
      {filterEmptyCollections.map(({ name, id, collectionImages }) => {
        const { length } = collectionImages;
        const img = collectionImages.map(({ public_id }) => `${url}/${public_id}`);

        return (
          <div key={name} className={wrapper}>
            <Link to={`/collections/${id}`} className={preview}>
              <div className={leftBlock}>
                <img src={img[0]} alt="firstImg" />
              </div>
              <div className={rightBlock}>
                {collectionImages[1] ? <img src={img[1]} alt="secondImg" /> : fallBack}
                {collectionImages[2] ? <img src={img[2]} alt="thirdImg" /> : fallBack}
              </div>
            </Link>

            <Link to={`/collections/${id}`} className={title}>
              {name}
            </Link>

            <div className={info}>
              <span>{length > 1 ? length + " photos" : length + " photo"} ·</span>
              <p>
                Curated by <Link to="/profile">{userName}</Link>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
