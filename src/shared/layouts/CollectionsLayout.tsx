import sass from "@shared/styles/layouts/CollectionsLayout.module.scss";
import greyBack from "@/shared/assets/greyBack.jpg";
import { endpoints } from "../utils";
import { Link } from "react-router-dom";

type Collections = {
  id: number;
  name: string;
  user_id: string;
  description: string;
  collectionImages: {
    id: number;
    public_id: string;
    collection_id: number;
  }[];
}[];

const { cdn } = endpoints;
const fallBack = <img src={greyBack} alt={"fallBack"} />;

export function CollectionsLayout({
  collections,
  userName,
}: {
  collections: Collections;
  userName: string | null;
}) {
  return (
    <div className={sass.listItem}>
      {collections?.map(({ name, id, collectionImages }) => {
        const { length } = collectionImages;
        const img = collectionImages.map(({ public_id }) => `${cdn.cloudinary}/${public_id}`);

        return (
          <div key={name} className={sass.wrapper}>
            <Link to={`/collections/${id}`} className={sass.preview}>
              <div className={sass.leftBlock}>
                <img src={img[0]} alt="firstImg" />
              </div>
              <div className={sass.rightBlock}>
                {collectionImages[1] ? <img src={img[1]} alt="secondImg" /> : fallBack}
                {collectionImages[2] ? <img src={img[2]} alt="thirdImg" /> : fallBack}
              </div>
            </Link>

            <Link to={`/collections/${id}`} className={sass.link}>
              {name}
            </Link>

            <div className={sass.info}>
              <span>{length > 1 ? length + " photos" : length + " photo"} ·</span>
              <p>
                Curated by <Link to={`/${userName}`}>{userName}</Link>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
