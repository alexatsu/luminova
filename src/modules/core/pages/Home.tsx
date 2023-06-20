import { useResizeWidth } from "@/hooks";
import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { PageWrapper } from "../components";
import { Loader } from "@/components";
import { useImages } from "../hooks";
import { downloadImage } from "../utils";
import { Resources } from "@/types";

export function Home() {
  const width = useResizeWidth();
  const editorial = "gallery";
  const { data, isLoading, updateFavoriteImages } = useImages(editorial);

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
            width={width}
            data={images as Resources}
            updateFavImages={updateFavoriteImages}
            download={downloadImage}
          />
        </>
      )}
      <Footer />
    </PageWrapper>
  );
}
