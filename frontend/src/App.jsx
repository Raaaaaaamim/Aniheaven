import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ErrorPage from "./pages/error-page";
import Home from "./pages/Home.jsx";
const router = createBrowserRouter([
  {
    element: (
      <>
        <Sidebar />
        <Navbar />
        <div className=" lg:ml-[18%] w-full lg:w-[82%] ">
          <Outlet />
        </div>
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
