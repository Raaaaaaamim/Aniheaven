import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavbarSuspense from "./components/ui/NavbarSuspense.jsx";
import OutletSuspense from "./components/ui/OutletSuspense.jsx";
import SidebarSuspense from "./components/ui/SidebarSuspense.jsx";

// Lazy load components
const Navbar = lazy(() => import("./components/layouts/Navbar/Navbar.jsx"));
const Sidebar = lazy(() => import("./components/layouts/Sidebar/Sidebar.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const WatchPage = lazy(() => import("./pages/WatchPage.jsx"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
  </div>
);

const router = createBrowserRouter([
  {
    element: (
      <div className="w-[100%] bg-background overflow-hidden min-h-screen">
        <Suspense fallback={<SidebarSuspense />}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<NavbarSuspense />}>
          <Navbar />
        </Suspense>
        <div className="relative overflow-hidden lg:ml-[18%] flex justify-center items-center w-[100%] lg:w-[82%]">
          <Suspense fallback={<OutletSuspense />}>
            <Outlet />
          </Suspense>
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
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/watch/:id",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <WatchPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
