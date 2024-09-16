import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route } from 'react-router-dom';
import DashboardPanel from "./components/dashboard/DashboardPanel";
import Login from "./components/auth/login/Login";
import { Signup } from './components/auth/signup/Signup';
import { Notfound } from './components/notfound/Notfound';
import Form from './components/forms/Form';
import Pages from './components/Pages/Pages';
import AdminSms from './components/sms/AdminSms';
import AdminSettings from './components/settings/AdminSettings';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='dashboard' element={<DashboardPanel />}>
          <Route path='form' element={<Form />} />
        </Route>
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<Notfound />} />
        <Route path='/' element={<Pages />} />
        <Route path='AdminSms' element={<AdminSms />} />
        <Route path='AdminSettings' element={<AdminSettings />} />
      </Routes>
    </div>
  );
}

export default App;
