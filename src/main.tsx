import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./router/index.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";
const queryClient = new QueryClient();
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}
window.__TANSTACK_QUERY_CLIENT__ = queryClient;
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </QueryClientProvider>,
);
