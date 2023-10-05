import { useParams } from "react-router-dom";

import { Resources } from "@/shared/types";
import { PageWrapper } from "@/shared/layouts";
import { downloadImage, handleFetch } from "@/shared/utils";
import { useDebounce, useResizeWidth } from "@/shared/hooks";
import sass from "@shared/styles/pages/InteractiveSearch/Images.module.scss";

import { useImages } from "@/modules/core/hooks"; //change position of this file to shared
import { MasonryImages } from "@/modules/core/layouts"; //change position of this file to shared
import { Loader } from "@/shared/components";

export function Images() {
  const { query } = useParams();
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const queryKey = ["searchData", query];
  const getData = async (): Promise<{ images: Resources[] } | undefined> => {
    const url = "http://localhost:8080/search/fornonuser";

    const { suggestions } = (await handleFetch(`${url}/?query=${query}`)) as {
      suggestions: Resources[];
      error: string;
    };

    return { images: suggestions };
  };
  const { data, status, updateFavoriteImages } = useImages(() => getData(), queryKey);

  return status === "loading" ? (
    <Loader style={{ margin: " auto " }} />
  ) : (
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
