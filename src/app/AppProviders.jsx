import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '../store/AuthProvider';
import router from './router';

export default function AppProviders() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}