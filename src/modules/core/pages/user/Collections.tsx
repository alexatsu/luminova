import { useEffect, useRef, useState } from "react";

import sass from "../../sass/user/Collections.module.scss";
import { Link } from "react-router-dom";
import { endpoints, handleFetch } from "@/utils";
import { useAuth } from "@/hooks";

type Collection = {
  id: number;
  name: string;
  description: string;
  user_id: string;
  collectionImages: { id: number; public_id: string }[];
}[];

const { profile } = endpoints.collections;

export const Collections = () => {
  const [data, setData] = useState<Collection>([]);
  const userName = localStorage.getItem("userName");
  const { handleFetchError } = useAuth();

  const fetchErrorRef = useRef((error: string) => handleFetchError(error));

  useEffect(() => {
    const getCollections = async () => {
      type Fetch = { collection: Collection; error: string };
      const { collection, error }: Fetch = await handleFetch(profile);

      if (fetchErrorRef.current(error)) return;
      setData(collection);
    };

    getCollections();
  }, []);

  const handleCollectionPreview = (images: (typeof data)[0]["collectionImages"]) => {
    const { firstImg, secondImg, thirdImg } = sass;
    const classes = [firstImg, secondImg, thirdImg];
    const cdnUrl = "https://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996";
    return images.map((item, index) =>
      item ? (
        <img
          key={item.public_id}
          className={classes[index]}
          src={`${cdnUrl}/${item.public_id}`}
          alt="first"
        />
      ) : null
    );
  };

  const filterEmptyCollections = data?.filter((item) => item.collectionImages.length > 0);

  return (
    <>
      <div className={sass.listItem}>
        {filterEmptyCollections.map(({ name, collectionImages, id }) => {
          return (
            <div key={name} style={{ marginRight: "20px" }}>
              <Link to={`/collections/${id}`} className={sass.wrapper}>
                {handleCollectionPreview(collectionImages)}
              </Link>
              <Link to={`/collections/${id}`} className={sass.title}>
                {name}
              </Link>
              <div className={sass.info}>
                <span>
                  {collectionImages.length > 1
                    ? collectionImages.length + " photos"
                    : collectionImages.length + " photo"}{" "}
                  ·
                </span>
                <p>
                  Curated by <Link to="/profile">{userName}</Link>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
