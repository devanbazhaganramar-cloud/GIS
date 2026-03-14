import { createBrowserRouter } from "react-router";
import RootLayout from "./rootLayout.js";
import LandingPage from "../components/landing-page.js";

const router = createBrowserRouter([
  {
    path: "",
    Component: RootLayout,
    children: [{ index: true, Component: LandingPage }],
  },
]);

export default router;
