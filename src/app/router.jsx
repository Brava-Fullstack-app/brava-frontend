import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage/RegisterPage";
import WelcomePage from "../features/welcome/WelcomePage";
import AppLayout from "../shared/components/layout/AppLayout/AppLayout";
import ProtectedRoute from "../shared/components/layout/ProtectedRoute/ProtectedRoute";
import HomePage from "../features/calendar/pages/HomePage/HomePage";
import RegisterMedication from "../features/medication/pages/RegisterMedication/RegisterMedication";
import DayDetailPage from "../features/calendar/pages/DayDetailPage/DayDetailPage";
import ProfilePage from "../features/ProfilePage/ProfilePage";
import NotFoundPage from "../features/NotFoundPage/NotFoundPage";

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
            element: <HomePage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "/calendar/:date",
        element: <DayDetailPage />,
      },
      {
        path: "/medications/register",
        element: <RegisterMedication />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
