import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

type Data = { accessToken: string; userName: string };
type UserDataProps = {
  data: Data;
  setUserData: (userData: Data) => void;
};

export const useUserDataStore = create<UserDataProps>()(
  immer((set) => ({
    data: {
      accessToken: "",
      userName: "",
    },

    setUserData: (userData) => {
      set((state) => {
        state.data = { accessToken: userData.accessToken, userName: userData.userName };
      });
    },
  }))
);
