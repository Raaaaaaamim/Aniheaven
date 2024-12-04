import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomeSuspense from "./components/ui/HomeSuspense.jsx";
import { LoadingFallback } from "./components/ui/LoadingFallback.jsx";
import NavbarSuspense from "./components/ui/NavbarSuspense.jsx";
import SidebarSuspense from "./components/ui/SidebarSuspense.jsx";
import WatchPageSuspense from "./components/ui/WatchPageSuspense.jsx";
import AnimeInfo from "./pages/AnimeInfo.jsx";

// Lazy load components
const Navbar = lazy(() => import("./components/layouts/Navbar/Navbar.jsx"));
const Sidebar = lazy(() => import("./components/layouts/Sidebar/Sidebar.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchPage = lazy(() => import("./pages/WatchPage.jsx"));

const router = createBrowserRouter([
  {
    element: (
      <div className="w-full bg-background overflow-hidden min-h-screen">
        <div className="flex flex-col">
          <Suspense fallback={<NavbarSuspense />}>
            <Navbar />
          </Suspense>
          <div className="flex">
            <Suspense fallback={<SidebarSuspense />}>
              <Sidebar />
            </Suspense>
            <div className="w-full justify-center items-center flex lg:w-[93%] xl:w-[82%] lg:ml-auto min-h-screen">
              <Outlet />
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
