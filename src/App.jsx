import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Attendance from "./pages/Attendance";
import Teachers from "./pages/Teachers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Teachers />,
            },
            {
                path: "/attendance/:id",
                element: <Attendance />,
            },
        ],
    },
    {
        path: "*",
        element: (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-[35px] text-center">
                    404
                    <br />
                    Page not found
                </h1>
            </div>
        ),
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
