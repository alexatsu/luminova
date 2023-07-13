import { Resources } from "@/types";
import { useImages } from "../../hooks";
import { useDebounce, useResizeWidth } from "@/hooks";
import { ImagesBlock } from "../../layouts";
import { downloadImage } from "../../utils";
import { endpoints } from "@/utils";
import { PageWrapper } from "../../components";
import { Loader } from "@/components";
import { getProfilePhotos } from "../../services/images";

export const Photos = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const { getProfileImages } = endpoints.images;
  const queryKey = ["profilePhotos"];
  const { data, isLoading, updateFavoriteImages } = useImages(
     getProfilePhotos(getProfileImages),
    queryKey
  );

  const { images } = data || {};

  return (
    <PageWrapper>
      {isLoading ? (
        <Loader style={{ margin: "0 auto" }} />
      ) : (
        <ImagesBlock
          data={images as Resources[]}
          updateFavImages={updateFavoriteImages}
          width={debouncedWidth}
          download={downloadImage}
        />
      )}
    </PageWrapper>
  );
};
