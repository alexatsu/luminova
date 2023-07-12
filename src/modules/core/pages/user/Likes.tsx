import { useState } from "react";
import { Resources } from "@/types";
import { useImages } from "../../hooks";
import { ImagesBlock } from "../../layouts";
import { useDebounce, useResizeWidth } from "@/hooks";
import { downloadImage } from "../../utils";
import { handleFetch } from "@/utils";

import sass from "../../sass/user/Likes.module.scss";

export const Likes = () => {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const editorial = "gallery";
  const { data, updateFavoriteImages } = useImages(editorial);
  const { images } = data || {};

  const [test, setTest] = useState([]);

  const dataFavorite = async () => {
    const url = "http://localhost:8080/images/getfavorites";
    const response = await handleFetch(url, "POST", {}, { name: "mypassis123" });
    console.log(response);
    return setTest(response);
  };

  return (
    <>
      <button onClick={dataFavorite}>Fetch</button>
      <ImagesBlock
        data={test.favoriteImages as Resources[]}
        updateFavImages={updateFavoriteImages}
        width={debouncedWidth}
        download={downloadImage}
      />
    </>
  );
};
