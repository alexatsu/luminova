import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { PageWrapper } from "../components";
import { Loader } from "@/components";

import { useDebounce, useResizeWidth } from "@/hooks";
import { useImages } from "../hooks";

import { downloadImage } from "../utils";
import { Resources } from "@/types";
import { getCorePhotos } from "../services/images";

export function Home() {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const category = "gallery";
  const queryKey = ["images", category];
  const { data, isLoading, updateFavoriteImages } = useImages(getCorePhotos(category), queryKey);
  const { pagePreview, images } = data || {};

  return (
    <PageWrapper>
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <>
          <PagePreview
            imgURL={pagePreview?.img}
            title={"Luminova"}
            description={pagePreview?.description}
          />
          <ImagesBlock
            width={debouncedWidth}
            data={images as Resources[]}
            updateFavImages={updateFavoriteImages}
            download={downloadImage}
          />
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}
