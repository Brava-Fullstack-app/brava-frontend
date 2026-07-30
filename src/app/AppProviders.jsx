import { AuthProvider } from "../store/AuthProvider";
import { NotificationProvider } from "../features/notifications/context/NotificationProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function AppProviders() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default AppProviders;
