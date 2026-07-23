import { createBrowserRouter} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage/RegisterPage';
import WelcomePage from '../features/welcome/WelcomePage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
   {
    path: '/register',
    element: <RegisterPage />,
  },
 {
    path: '/',
    element: <WelcomePage />,
  },
]);

export default router;