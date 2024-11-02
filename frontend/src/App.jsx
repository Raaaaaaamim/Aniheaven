import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ErrorPage from "./pages/error-page";
import Home from "./pages/Home.jsx";
import WatchPage from "./pages/WatchPage.jsx";
const router = createBrowserRouter([
  {
    element: (
      <div className=" w-[100%] bg-background  overflow-hidden min-h-screen ">
        <Sidebar />
        <Navbar />
        <div className=" relative overflow-hidden  lg:ml-[18%] flex justify-center items-center w-[100%] lg:w-[82%] ">
          <Outlet />
        </div>
      </div>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/watch/:id",
    element: <WatchPage />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
