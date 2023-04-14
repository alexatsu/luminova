import { AlertColor } from "@mui/material";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type ToastStore = {
  message: string;
  severity: AlertColor;
  setMessage: (data: ToastData) => void;
}

type ToastData = Omit<ToastStore, "setMessage">;

export const useToastStore = create<ToastStore>()(
  immer(set => ({
    message: "",
    severity: "error",
    setMessage: toastData =>
      set(state => ({
        ...state,
        ...toastData,
      })),
  }))
);
