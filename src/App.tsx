import "./App.css"
import { RouterProvider } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import router from "./router";

function App() {
  return (
    <Fragment>
      <div className="h-screen w-screen bg-base-100">
        <RouterProvider router={router} />
      </div>
    </Fragment>
  );
}

export default App;
