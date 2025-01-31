import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Loader from "./components/ui/Loader.jsx";
import "./styles/index.css";
const App = React.lazy(() => import("./App.jsx"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <NuqsAdapter>
        <Toaster />
        <Suspense
          fallback={
            <div className=" w-full h-screen justify-center items-center flex ">
              <Loader size="lg" />
            </div>
          }
        >
          <App />
        </Suspense>
      </NuqsAdapter>
    </RecoilRoot>
  </QueryClientProvider>
);
