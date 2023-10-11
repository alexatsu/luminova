import { useParams } from "react-router-dom";

import { useDebounce, useModal, useResizeWidth } from "@/shared/hooks";
import { Loader } from "@/shared/components";
import { PageWrapper, MasonryImages } from "@/shared/layouts";

import { paths } from "@/shared/utils";
import { downloadImage } from "@/shared/utils";
import { Resources } from "@/shared/types";

import { ModalContainer, UploadModal } from "@/shared/components/form";

import { useImages } from "../hooks";
import { PagePreview } from "../layouts";
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
        <div>
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
        </div>
      )}

      <ModalContainer modalOpen={modalOpen}>
        <UploadModal handleClose={handleClose} category={category} title={title} />
      </ModalContainer>
    </PageWrapper>
  );
}
