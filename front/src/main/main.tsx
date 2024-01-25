import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import Repository from "./Components/repository";
import Layout from "./Components/Layout";
import NotFound from "./Components/notFound";

let router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element:<NotFound />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "/widgets",
                element: <NotFound />,
            },   
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
