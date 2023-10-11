import { useParams } from "react-router-dom";

import { Resources } from "@/shared/types";
import { PageWrapper, MasonryImages } from "@/shared/layouts";
import { downloadImage, handleFetch, endpoints } from "@/shared/utils";
import { useDebounce, useResizeWidth } from "@/shared/hooks";

import { useImages } from "@/modules/core/hooks"; //change position of this file to shared
import { Loader, NoResults } from "@/shared/components";
import sass from "@shared/styles/pages/InteractiveSearch/Images.module.scss";

const { search } = endpoints;

export function Images() {
  const { query } = useParams();
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const queryKey = ["searchData", query];

  const searchImages = async (): Promise<{ images: Resources[] } | undefined> => {
    const url = search.images;

    const { suggestions } = (await handleFetch(`${url}/?query=${query}`)) as {
      suggestions: Resources[];
      error: string;
      message: string;
    };

    return { images: suggestions };
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
