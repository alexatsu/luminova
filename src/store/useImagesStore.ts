import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { images } from "../assets/images";

type ImagesStoreProps = {
  img: typeof images;
  query: string; //move it into separate store
  searchQuery: (query: string) => void;
};
export const useImagesStore = create<ImagesStoreProps>()(
  immer((set) => ({
    img: images,
    query: "",

    searchQuery: (query) => {
      set((state) => {
        state.query = query;
      });
    },
  }))
);
