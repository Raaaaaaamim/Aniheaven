import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/layouts/Footer/Footer.jsx";
import Navbar from "./components/layouts/Navbar/Navbar.jsx";
import Sidebar from "./components/layouts/Sidebar/Sidebar.jsx";
import HomeSuspense from "./components/ui/HomeSuspense.jsx";
import { LoadingFallback } from "./components/ui/LoadingFallback.jsx";
import ScrollToTop from "./components/ui/ScrollToTop.jsx"; // Added import statement
import WatchPageSuspense from "./components/ui/WatchPageSuspense.jsx";
import AnimeInfo from "./pages/AnimeInfo.jsx";
import Search from "./pages/Search.jsx";
// Lazy load components

const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchPage = lazy(() => import("./pages/WatchPage.jsx"));

const router = createBrowserRouter([
  {
    element: (
      <div className="w-full bg-background overflow-hidden min-h-screen">
        <div className="flex flex-col">
          <ScrollToTop />
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="w-full justify-center items-center flex lg:w-full xl:w-[82%]  lg:ml-auto min-h-screen">
              <div className=" max-w-[1600px] w-full h-full ">
                <Outlet />
              </div>
            </div>
          </div>
          <div className="w-full   pt-20 justify-center items-center flex lg:w-full xl:w-[82%] lg:ml-auto   ">
            <div className=" w-full h-full max-w-[1600px] ">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    ),
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<HomeSuspense />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/watch/:id",
        element: (
          <Suspense fallback={<WatchPageSuspense />}>
            <WatchPage />
          </Suspense>
        ),
      },
      {
        path: "/info/:id",
        element: <AnimeInfo />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
