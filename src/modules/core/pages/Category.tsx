import { MasonryImages, PagePreview } from "../layouts";
import { useImages } from "../hooks";
import { useDebounce, useModal, useResizeWidth } from "@/hooks";
import { Loader } from "@/components";
import { PageWrapper } from "../layouts";

import { paths } from "@/utils";
import { downloadImage } from "../utils";

import { useParams } from "react-router-dom";
import { Resources } from "@/types";
import { ModalContainer, UploadModal } from "@/components/form";
import { images } from "../services/api";

const { getCoreImages } = images;

export function Category() {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const { handleClose, modalOpen, handleOpen } = useModal();

  const { category } = useParams();
  const { name: title } = paths.find(({ path }) => path === category) || {};

  const queryKey = ["category", category];
  const { data, status, updateFavoriteImages } = useImages(() => getCoreImages(category), queryKey);
  const { images, pagePreview } = data || {};

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
            title={title}
            description={pagePreview?.description}
            handleOpenModal={handleOpen}
          />
          <MasonryImages
            width={debouncedWidth}
            data={images as Resources[]}
            updateFavImages={updateFavoriteImages}
            download={downloadImage}
          />
        </>
      )}

      <ModalContainer modalOpen={modalOpen}>
        <UploadModal handleClose={handleClose} category={category} title={title} />
      </ModalContainer>
    </PageWrapper>
  );
}
