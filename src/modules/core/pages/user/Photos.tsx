import { useParams } from "react-router-dom";

import { Resources } from "@/shared/types";
import { useDebounce, useResizeWidth } from "@/shared/hooks";
import { endpoints, downloadImage } from "@/shared/utils";
import { PageWrapper } from "@shared/layouts";
import { Loader } from "@/shared/components";

import { MasonryImages } from "../../layouts";
import { useImages } from "../../hooks";
import { images } from "../../services/api";

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
