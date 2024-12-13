import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Paciente/Home.page';
import { LoginPage } from './pages/Paciente/Login.page';
import { RegisterPage } from './pages/Paciente/Register.page';
import { MenuPage } from './pages/Paciente/Menu.page';
import { MarcarConsultaPage } from './pages/Paciente/MarcarConsulta.page';
import { HistoricoConsultaPage } from './pages/Paciente/HistoricoConsulta.page';
import { LoginPageMedico } from './pages/Medico/Login.page';

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
  {
    path: '/medico/login',
    element: <LoginPageMedico />,
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
