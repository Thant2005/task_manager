import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import App from "../App";
import TaskManager from "../pages/TaskManager";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuthContext } from "../contexts/authContext";

function Router() {
  const { user, isGlobelLoading } = useAuthContext();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: user ? <TaskManager /> : <Navigate to={"/login"} />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to={"/"} />,
        },
        {
          path: "/register",
          element: !user ? <Register /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return !isGlobelLoading && <RouterProvider router={router} />;
}

export default Router;
