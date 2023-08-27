import { Resources } from "@/types";
import { useImages } from "../../hooks";
import { useDebounce, useResizeWidth } from "@/hooks";
import { MasonryImages } from "../../layouts";
import { downloadImage } from "../../utils";
import { endpoints } from "@/utils";
import { PageWrapper } from "../../layouts";
import { Loader } from "@/components";
import { images } from "../../services/api";
import { useParams } from "react-router-dom";

const { profile } = endpoints.images;
const { getProfileImages } = images;

export const Photos = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const { userName } = useParams();

  const queryKey = ["profilePhotos", userName];
  const url = `${profile}/${userName}`;
  const { data, status, updateFavoriteImages } = useImages(() => getProfileImages(url), queryKey);

  const { images } = data || {};

  return (
    <PageWrapper>
      {status === "loading" ? (
        <Loader style={{ margin: "0 auto" }} />
      ) : (
        <MasonryImages
          data={images as Resources[]}
          updateFavImages={updateFavoriteImages}
          width={debouncedWidth}
          download={downloadImage}
        />
      )}
    </PageWrapper>
  );
};
