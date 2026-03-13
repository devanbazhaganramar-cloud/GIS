import { RouterProvider } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import router from "./router";


function App() {
  
  return (
    <Fragment>
      <div className="h-screen w-screen" >
        <RouterProvider router={router}/>
      </div>
    </Fragment>
  );
}

export default App;
