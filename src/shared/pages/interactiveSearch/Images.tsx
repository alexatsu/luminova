import { useParams } from "react-router-dom";

import { Resources } from "@/shared/types";
import { PageWrapper, MasonryImages } from "@/shared/layouts";
import { downloadImage, handleFetch, endpoints } from "@/shared/utils";
import { useDebounce, useResizeWidth, useImages } from "@/shared/hooks";
import { Loader, NoResults } from "@/shared/components";

import sass from "@shared/styles/pages/InteractiveSearch/Images.module.scss";

const { search } = endpoints;

export function Images() {
  const { query } = useParams();
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const queryKey = ["searchImages", query];

  const searchImages = async (): Promise<{ images: Resources[] } | undefined> => {
    const url = search.images;

    const { images } = (await handleFetch(`${url}/?query=${query}`)) as {
      images: Resources[];
      error: string;
      message: string;
    };

    return { images };
  };

  const { data, status, updateFavoriteImages } = useImages(() => searchImages(), queryKey);

  if (status === "loading") {
    return <Loader style={{ margin: " auto " }} />;
  }

  if (data?.images.length === 0) {
    return <NoResults className={sass.title} query={query} />;
  }

  return (
    <PageWrapper>
      <h2 className={sass.title}>{query}</h2>
      <MasonryImages
        width={debouncedWidth}
        data={data?.images as Resources[]}
        updateFavImages={updateFavoriteImages}
        download={downloadImage}
      />
    </PageWrapper>
  );
}
