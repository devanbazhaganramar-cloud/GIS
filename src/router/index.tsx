import { createBrowserRouter } from "react-router";
import RootLayout from "./rootLayout.js";

const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
     
    ],
  },
]);

export default router;
