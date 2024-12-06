import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';
import { RegisterPage } from './pages/Register.page';
import { MenuPage } from './pages/Menu.page';
import { MarcarConsultaPage } from './pages/MarcarConsulta.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/menu',
    element: <MenuPage />,
  },
  {
    path: '/marcarconsulta',
    element: <MarcarConsultaPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
