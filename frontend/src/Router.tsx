import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Paciente/Home.page';
import { LoginPage } from './pages/Paciente/Login.page';
import { RegisterPage } from './pages/Paciente/Register.page';
import { MenuPage } from './pages/Paciente/Menu.page';
import { MarcarConsultaPage } from './pages/Paciente/MarcarConsulta.page';
import { HistoricoConsultaPage } from './pages/Paciente/HistoricoConsulta.page';
import { LoginPageMedico } from './pages/Medico/Login.page';
import { InserirDisponibilidadeMedico } from './components/InserirDisponibilidadeMedico/InserirDisponibilidadeMedico';
import { InserirDisponibilidade } from './pages/Medico/InserirDisponibilidade';
import { HomePageMed } from './pages/Medico/HomePageMedico';
import { CancelarConsultaPage } from './pages/Paciente/CancelarConsulta';
import { NotificationsPage } from './pages/Paciente/Notification';

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
  },
  {
    path: '/InserirDisponibilidade',
    element: <InserirDisponibilidadeMedico />,
  },
  {
    path: '/HomePage',
    element: <HomePageMed />,
  },
  {
    path: '/consulta/cancelar',
    element: <CancelarConsultaPage />,
  },
  {
    path: '/consulta/notifications',
    element: <NotificationsPage />,
  }


 
]);

export function Router() {
  return <RouterProvider router={router} />;
}
