import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./lib/redux/store.ts";
import ListenerForAuth from "./components/util_component/ListenerForAuth.tsx";
import { router } from "./components/Router.tsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProvider from "./components/util_component/AppProvider.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppProvider>
      <RouterProvider router={router} />
      <ListenerForAuth />
      <React.StrictMode>{/* <App /> */}</React.StrictMode>
    </AppProvider>
  </Provider>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
