import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Repository from "./Components/repository";
import Layout from "./Components/Layout";
import NotFound from "./Components/notFound";
import Home from "./Components/Home";
import BookTable from "./Components/BookTable";
import AddBook from "./Components/AddBook";


let router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element:<Home />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "/repository",
                element: <Repository />,
            },
            {
                path: "/BTable",
                element: <BookTable />,
            },
            {
                path: "/AddBook",
                element: <AddBook />,
            }   
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
