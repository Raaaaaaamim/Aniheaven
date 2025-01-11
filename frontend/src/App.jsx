import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/layouts/Footer/Footer.jsx";
import Navbar from "./components/layouts/Navbar/Navbar.jsx";
import Sidebar from "./components/layouts/Sidebar/Sidebar.jsx";
import HomeSuspense from "./components/skeletons/HomeSuspense.jsx";
import WatchPageSuspense from "./components/skeletons/WatchPageSuspense.jsx";
import ScrollToTop from "./components/ui/ScrollToTop.jsx"; // Added import statement
import AnimeInfo from "./pages/AnimeInfo.jsx";
import AZPage from "./pages/AZPage.jsx";
import { CategoryPage } from "./pages/CategoryPage.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Schedules from "./pages/Schedules.jsx";
import Search from "./pages/Search.jsx";
// Lazy load components

// Lazy load components
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchPage = lazy(() => import("./pages/WatchPage.jsx"));

const router = createBrowserRouter([
  {
    element: (
      <div className="w-full relative bg-background overflow-hidden min-h-screen">
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
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
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/schedules",
        element: <Schedules />,
      },
      {
        path: "/az",
        element: <AZPage />,
      },
      {
        path: "/character/:id",
        element: <CharacterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
