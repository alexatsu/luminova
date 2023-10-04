import { MasonryImages } from "@/modules/core/layouts";
import { downloadImage, handleFetch } from "@/shared/utils";
import { useDebounce, useResizeWidth } from "@/shared/hooks";
import { useParams } from "react-router-dom";

import { useImages } from "@/modules/core/hooks"; //change position if this file
import { Resources } from "@/shared/types";

//TODO, store search in global state then refetch it
export function Images() {
  const { query } = useParams();
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);

  const queryKey = ["searchData"];
  const getData = async (): Promise<{ images: Resources[] } | undefined> => {
    const url = "http://localhost:8080/search/fornonuser";

    const { suggestions } = (await handleFetch(`${url}/?query=${query}`)) as {
      suggestions: Resources[];
      error: string;
    };

    return { images: suggestions };
  };
  const { data, status, updateFavoriteImages } = useImages(() => getData(), queryKey);

  console.log(data?.images, "query in images");
  return (
    <div>
      <h2>{query}</h2>
      <MasonryImages
        width={debouncedWidth}
        data={data?.images as Resources[]}
        updateFavImages={updateFavoriteImages}
        download={downloadImage}
      />
    </div>
  );
}
