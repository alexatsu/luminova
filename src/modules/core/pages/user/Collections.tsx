import { useEffect, useState } from "react";

import sass from "../../sass/user/Collections.module.scss";
import { Link, useNavigate } from "react-router-dom";

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

export const Collections = () => {
  const [data, setData] = useState<Collection>([]);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/collections/profile`, {
        credentials: "include",
      });
      const { collection, error }: Response = await response.json();

      if (error === "Refresh token missing" || error === "User not found") {
        navigate("/login");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userName");
        return;
      }
      console.log(collection, "collection");
      setData(collection);
    };

    fetchData();
  }, [navigate]);

  const handleCollectionPreview = (images: (typeof data)[0]["collectionImages"]) => {
    const { firstImg, secondImg, thirdImg } = sass;
    const classes = [firstImg, secondImg, thirdImg];
    return images.map((item, index) =>
      item ? (
        <img
          key={item.public_id}
          className={classes[index]}
          src={`http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996/${item.public_id}`}
          alt="first"
        />
      ) : null
    );
  };

  const filterEmptyCollections = data.filter(
    (item) => item.collectionImages.length > 0
  ) as Collection;

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
