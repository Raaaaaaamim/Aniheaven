import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navigate from "./components/auth/Navigate.jsx";
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
import Profile from "./pages/Profile.jsx";
import Schedules from "./pages/Schedules.jsx";
import Search from "./pages/Search.jsx";
// Lazy load components

// Lazy load components
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchPage = lazy(() => import("./pages/WatchPage.jsx"));
const router = createBrowserRouter([
  {
    element: (
      <div className="bg-background relative min-h-screen w-full overflow-hidden">
        <div className="flex flex-col">
          <ScrollToTop />
          <Navbar />
          <div className="flex">
            <Sidebar />
            <div className="flex min-h-screen w-full items-center justify-center lg:ml-auto lg:w-full xl:w-[82%]">
              <div className="h-full w-full max-w-[1600px]">
                <Outlet />
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-center pt-20 lg:ml-auto lg:w-full xl:w-[82%]">
            <div className="h-full w-full max-w-[1600px]">
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
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <Navigate />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
