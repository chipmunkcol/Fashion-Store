import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import { apiCart } from "./utils/api.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 2,
      refetchOnWindowFocus: false,
      // staleTime: 60 * 60 * 1000, // 1시간
      // staleTime: Infinity,
    },
  },
});

await queryClient.prefetchQuery({
  queryKey: ["cart", 1],
  queryFn: () => apiCart(1),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
