import { ImagesBlock, Footer, PagePreview } from "../layouts";
import { useImages } from "../hooks";
import { useDebounce, useModal, useResizeWidth } from "@/hooks";
import { Loader } from "@/components";
import { PageWrapper } from "../components";

import { endpoints, handleFetch, paths } from "@/utils";
import { downloadImage } from "../utils";

import { useParams } from "react-router-dom";
import { ImageResources, Resources } from "@/types";
import { ModalContainer, UploadModal } from "@/components/form";

export function Category() {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const { category } = useParams();
  const { handleClose, modalOpen, handleOpen } = useModal();

  const { name: title } = paths.find(({ path }) => path === category) || {};
  
  const queryKey = ["images", category];
  const { data, isLoading, updateFavoriteImages } = useImages(fetchData, queryKey);
  const { images, pagePreview } = data || {};
  async function fetchData() {
    const { forNonUser, forUser } = endpoints.images;
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      const fetchForAnyone = await handleFetch(forNonUser, "POST", {
        category: category,
        next_cursor: "",
      });
      return fetchForAnyone;
    }

    const fetchForUser = await handleFetch(forUser, "POST", {
      accessToken: accessToken,
      category: category,
      next_cursor: "",
    });
    return fetchForUser;
  }

  return (
    <PageWrapper>
      {isLoading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <>
          <PagePreview
            imgURL={pagePreview?.img}
            title={title}
            description={pagePreview?.description}
            handleOpenModal={handleOpen}
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
      <ModalContainer modalOpen={modalOpen}>
        <UploadModal handleClose={handleClose} category={category} title={title} />
      </ModalContainer>
    </PageWrapper>
  );
}
