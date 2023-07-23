import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

type UserProps = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const useUserDataStore = create<UserProps>()(
  immer((set) => ({
    token: "",

    setToken: (token) => {
      set((state) => {
        state.token = token;
      });
    },
  }))
);
