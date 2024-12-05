import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.js";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <main className="dark text-foreground bg-background">
            <App />
          </main>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </NextUIProvider>
  </StrictMode>
);
