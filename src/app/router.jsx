import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";
import WelcomePage from "../features/welcome/WelcomePage";
import AppLayout from "../shared/components/layout/AppLayout/AppLayout";
import ProtectedRoute from "../shared/components/layout/ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/calendar",
            element: <div>Calendar placeholder</div>,
          },
          {
            path: "/medications/register",
            element: <div>Register medication placeholder</div>,
          },
          {
            path: "/profile",
            element: <div>Profile placeholder</div>,
          },
        ],
      },
    ],
  },
]);

export default router;