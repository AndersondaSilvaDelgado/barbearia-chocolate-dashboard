import './dashboard.css';
import {
  useState,
  useEffect,
} from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
} from 'react-router-dom';
import Login from './components/login/login';
import Agenda from './components/agenda/agenda';
import Usuarios from './components/usuarios/usuarios';
import Servicos from './components/servicos/servicos';

function Dashboard() {

  const [carregarToken, setCarregarToken] = useState(true);
  const [token, setToken] = useState(true);

  useEffect(() => {

    function obterToken(){
        setToken(sessionStorage.getItem('token'));
    }

    if(carregarToken){
        obterToken();
        setCarregarToken(false);
    }
  }, [carregarToken]);

  if(!token) {
    return <Login setCarregarToken={setCarregarToken} />
  }

  return (
    // <BrowserRouter basename="/dashboard">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agenda />} exact />
        <Route path="/usuarios" element={<Usuarios />} exact />
        <Route path="/servicos" element={<Servicos />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default Dashboard;
