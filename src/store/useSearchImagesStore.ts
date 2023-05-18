import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

type SearchImagesProps = {
  query: string;
  searchQuery: (query: string) => void;
};
export const useSearchImagesStore = create<SearchImagesProps>()(
  immer((set) => ({
    query: "",
    searchQuery: (query) => {
      set((state) => {
        state.query = query;
      });
    },
  }))
);
