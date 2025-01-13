import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import "./styles/index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <NuqsAdapter>
        <Toaster />

        <App />
      </NuqsAdapter>
    </RecoilRoot>
  </QueryClientProvider>
);
