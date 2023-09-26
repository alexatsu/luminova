import sass from "../../sass/pages/user/Collections.module.scss";
import { Link } from "react-router-dom";
import { endpoints, handleFetch } from "@/shared/utils";
import { useAuth } from "@/shared/hooks";
import greyBack from "@/shared/assets/greyBack.jpg";
import { useCollections } from "../../hooks";

type Collection = {
  id: number;
  name: string;
  description: string;
  user_id: string;
  collectionImages: { id: number; public_id: string }[];
}[];

const { listItem, preview, rightBlock, leftBlock, title, info, wrapper } = sass;
const fallBack = <img src={greyBack} alt={"fallBack"} />;
const { cdn, collections } = endpoints;
const userName = localStorage.getItem("userName") || undefined;

export const Collections = () => {
  const { handleFetchError } = useAuth();

  const getCollections = async () => {
    type Fetch = { collection: Collection; error: string };
    const { collection, error }: Fetch = await handleFetch(collections.profile);

    if (handleFetchError(error)) return;
    return collection;
  };

  const queryKey = ["collections", userName];
  const {
    getCollections: { data, status },
  } = useCollections(queryKey, () => getCollections());

  const filterEmptyCollections = data?.filter((item) => item.collectionImages.length > 0);

  if (status === "error") {
    return <p>Error</p>;
  }

  return (
    <div className={listItem}>
      {filterEmptyCollections?.map(({ name, id, collectionImages }) => {
        const { length } = collectionImages;
        const img = collectionImages.map(({ public_id }) => `${cdn.cloudinary}/${public_id}`);

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
