import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Test from "./Test";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "test",
    element: <Test/>,
  }
]);
