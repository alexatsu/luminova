import { MasonryImages, PagePreview } from "../layouts";
import { PageWrapper } from "../components";
import { Loader } from "@/components";
import { useImages } from "../hooks";

import { downloadImage } from "../utils";
import { Resources } from "@/types";
import { images } from "../services/api";
import { useResizeWidth, useDebounce } from "@/hooks";

const { getCoreImages } = images;

export function Home() {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const category = "gallery";
  const queryKey = ["images", category];
  const { data, status, updateFavoriteImages } = useImages(() => getCoreImages(category), queryKey);
  const { pagePreview, images } = data || {};
  console.log(data, "data");

  // TODO Make error component
  if (status === "error") {
    return <p>Error</p>;
  }

  return (
    <PageWrapper>
      {status === "loading" ? (
        <Loader style={{ margin: " auto " }} />
      ) : (
        <>
          <PagePreview
            imgURL={pagePreview?.img}
            title={"Luminova"}
            description={pagePreview?.description}
          />
          <MasonryImages
            width={debouncedWidth}
            data={images as Resources[]}
            updateFavImages={updateFavoriteImages}
            download={downloadImage}
          />
        </>
      )}
    </PageWrapper>
  );
}
