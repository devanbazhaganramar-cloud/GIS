import { createBrowserRouter } from "react-router";
import RootLayout from "./rootLayout.js";
import LandingPage from "../components/landing-page.js";
import SpatialOptimizer from "../components/spatial-optimizer.js";

const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "/spatial-volume-optimizer", Component: SpatialOptimizer },
    ],
  },
]);

export default router;
