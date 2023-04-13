import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import "./styles/reset.css";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthProvider from "./provider/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
