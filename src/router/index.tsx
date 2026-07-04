import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import TaskManager from "../pages/TaskManager";
import Login from "../pages/Login";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <TaskManager />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Router;
