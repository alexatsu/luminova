import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { images } from "../assets/images";

type ImagesStoreProps = {
  img: typeof images;
  query: string;//move it into separate store
  addImage: (imgSrc: string, title: string) => void;
  searchQuery: (query: string) => void;
  deleteImage: (id: string) => void;
};
export const useImagesStore = create<ImagesStoreProps>()(
  immer((set) => ({
    img: images,
    query: "",
    addImage: (imgSrc, title) => {
      set((state) => {
        state.img.push({ id: crypto.randomUUID(), image: imgSrc, title: title });
      });
    },
    deleteImage: (id) => {
      set((state) => {
        state.img = state.img.filter((img) => img.id !== id);
      });
    },
    searchQuery: (query) => {
      set((state) => {
        state.query = query;
      });
    },
  }))
);
