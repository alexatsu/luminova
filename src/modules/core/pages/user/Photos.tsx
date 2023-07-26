import { Resources } from "@/types";
import { useImages } from "../../hooks";
import { useDebounce, useResizeWidth } from "@/hooks";
import { MasonryImages } from "../../layouts";
import { downloadImage } from "../../utils";
import { endpoints } from "@/utils";
import { PageWrapper } from "../../components";
import { Loader } from "@/components";
import { getProfilePhotos } from "../../services/images";
import { useParams } from "react-router-dom";

export const Photos = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const { userName } = useParams();

  const { getProfileImages } = endpoints.images;
  const queryKey = ["profilePhotos", userName];
  const url = `${getProfileImages}/${userName}`;
  const { data, status, updateFavoriteImages } = useImages(() => getProfilePhotos(url), queryKey);

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
