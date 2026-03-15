import { createBrowserRouter } from "react-router";
import RootLayout from "./rootLayout.js";
import LandingPage from "../components/landing-page.js";
import SpatialOptimizer from "../components/spatial-optimizer.js";
import NotFoundPage from "../components/404.js";

const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "/spatial-volume-optimizer", Component: SpatialOptimizer },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);

export default router;
