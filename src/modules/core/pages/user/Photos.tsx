import { Resources } from "@/types";
import { useImages } from "../../hooks";
import { ImagesBlock } from "../../layouts";
import { useDebounce, useResizeWidth } from "@/hooks";
import { downloadImage } from "../../utils";
import { handleFetch } from "@/utils";
import { PageWrapper } from "../../components";
import { Loader } from "@/components";

export const Photos = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const queryKey = ["profilePhotos"];
  const { data, isLoading, updateFavoriteImages } = useImages(dataPhotos, queryKey);
  const { images } = data || {};

  async function dataPhotos() {
    console.log("fired");
    const userName = localStorage.getItem("userName");
    const url = "http://localhost:8080/images/getprofileimages";
    const response = await handleFetch(url, "POST", { name: userName });
    return response;
  }
  return (
    <>
      {/* <PageWrapper> */}
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <ImagesBlock
          data={images as Resources[]}
          updateFavImages={updateFavoriteImages}
          width={debouncedWidth}
          download={downloadImage}
        />
      )}
      {/* </PageWrapper> */}
    </>
  );
};
