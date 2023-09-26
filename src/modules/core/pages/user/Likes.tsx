import { Resources } from "@/shared/types";
import { useImages } from "../../hooks";
import { useDebounce, useResizeWidth } from "@/shared/hooks";
import { MasonryImages } from "../../layouts";
import { downloadImage } from "../../utils";
import { endpoints } from "@/shared/utils";
import { PageWrapper } from "@/shared/layouts";
import { Loader } from "@/shared/components";
import { images } from "../../services/api";
import { useParams } from "react-router-dom";

const { favorite} = endpoints.images;
const { getProfileImages } = images;

export const Likes = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const { userName } = useParams();
  const queryKey = ["likes", userName];
  const url = `${favorite}/${userName}`;

  const { data, status, updateFavoriteImages } = useImages(() => getProfileImages(url), queryKey);
  const { images } = data || {};

  const onlyFavoriteImages = images?.filter((item) => item.favorite);

  return (
    <PageWrapper>
      {status === "loading" ? (
        <Loader style={{ margin: "0 auto" }} />
      ) : (
        <MasonryImages
          data={onlyFavoriteImages as Resources[]}
          updateFavImages={updateFavoriteImages}
          width={debouncedWidth}
          download={downloadImage}
        />
      )}
    </PageWrapper>
  );
};
