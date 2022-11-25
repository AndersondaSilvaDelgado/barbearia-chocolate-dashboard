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
import Horarios from './components/horarios/horarios';

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Agenda />} exact />
        <Route path="/horarios" element={<Horarios />} exact />
        <Route path="/usuarios" element={<Usuarios />} exact />
        <Route path="/servicos" element={<Servicos />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default Dashboard;
