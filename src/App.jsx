import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./core/i18n";
import { useAppContext } from "./contexts/app/app-context";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { theme } = useAppContext();
  useEffect(() => {
    const head = document.head;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/css/${theme}.css`;
    head.appendChild(link);

    return () => {
      head.removeChild(link);
    };
  }, [theme]);

  return(
    <>
    <RouterProvider router={router} />;
    <ToastContainer rtl/>
  </>
  )
}

export default App;
