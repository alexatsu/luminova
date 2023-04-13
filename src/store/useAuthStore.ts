import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IUser } from "../types/User.types";

type AuthStore = {
  data: IUser;
  setUser: (data: IUser) => void;
};
export const useAuthStore = create<AuthStore>()(
  immer(set => ({
    data: {
      email: "",
      id: 0,
    },
    setUser: newData =>
      set(state => ({
        ...state,
        data: {
          ...state.data,
          ...newData,
        },
      })),
  }))
);
