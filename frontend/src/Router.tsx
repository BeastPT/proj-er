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
import { VerExamesPage } from './pages/Paciente/VerExames.page';
import { HistoricoPacientesPage } from './pages/Medico/HistoricoPacientes.page';

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
    path: '/homepage',
    element: <HomePageMed />,
  },
  {
    path: '/consulta/cancelar',
    element: <CancelarConsultaPage />,
  },
  {
    path: '/consulta/notifications',
    element: <NotificationsPage />,
  },
  {
    path: '/consulta/exames',
    element: <VerExamesPage />,
  },
  {
    path: '/medico/historico',
    element: <HistoricoPacientesPage />,
  }


 
]);

export function Router() {
  return <RouterProvider router={router} />;
}
