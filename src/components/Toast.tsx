import { Alert } from "@mui/material";
import { useEffect } from "react";
import { useToastStore } from "../store/useToastStore";
import { toastStyles } from "../styles/toast";

export default function Toast() {
  const { setMessage, message, severity } = useToastStore();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage({ message: "", severity: "error" });
    }, 2000);
    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <Alert sx={toastStyles} variant="filled" severity={severity}>
      {message}
    </Alert>
  );
}
