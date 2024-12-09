import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';
import { RegisterPage } from './pages/Register.page';
import { MenuPage } from './pages/Menu.page';
import { MarcarConsultaPage } from './pages/MarcarConsulta.page';
import { HistoricoConsultaPage } from './pages/HistoricoConsulta.page';

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
    path: '/consulta/marcar',
    element: <MarcarConsultaPage />,
  },
  {
    path: '/consulta/historico',
    element: <HistoricoConsultaPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
