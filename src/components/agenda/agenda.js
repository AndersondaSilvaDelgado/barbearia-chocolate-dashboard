import {
    useEffect,
    useState,
} from 'react';
import { 
    Container,
} from 'react-bootstrap';
import Menu from '../../utils/page/menu';
import Calendario from './page/calendario';
import Horario from './page/horario';
import * as constants from '../../utils/constants/constants';
import axios from 'axios';

function Agenda() {

    const URL_LISTAR_HORARIOS = constants.URL_BASE + constants.HORARIOS;

    const [carregarAgenda, setCarregarAgenda] = useState(true);
    const [mes, setMes] = useState('');
    const [datas, setDatas] = useState([]);
    const [dia, setDia] = useState(0);
    const [diaSemana, setDiaSemana] = useState(0);
    const [alterarDia, setAlterarDia] = useState(false);
    const [diaSelecionado, setDiaSelecionado] = useState(0);
    const [horarios, setHorarios] = useState([]);

    useEffect(() => {

        function obterAgenda(){

            var dataAtualLong = Date.now();
            var dataAtual = new Date(dataAtualLong);
            var mesesList = new Array ("JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO")
            setMes(mesesList[dataAtual.getMonth() - 1]);
            var diaSemana = dataAtual.getDay();
            const rows = [];
            for (let i = 0; i < 21; i++) {
                rows.push(dataAtualLong - diaSemana * 24 * 60 * 60 * 1000);
                diaSemana--;
            }
            setDatas(rows);
        }

        function setValorDiaAtual(){
            var dataAtualLong = Date.now();
            var dataAtual = new Date(dataAtualLong);
            setDia(dataAtual.getDate());
            setDiaSemana(dataAtual.getDay());
        }

        function setValorDia(){
            var data = new Date(diaSelecionado);
            console.log(data.getDay());
            setDia(data.getDate());
            setDiaSemana(data.getDay());
        }

        async function obterHorarios(){
            try{
                let { data } = await axios.get(URL_LISTAR_HORARIOS);
                console.log("Valor");
                console.log(data);
                if(data.status==='success'){
                    setHorarios(data.data);
                } else {
                    setHorarios([]);
                }
            } catch(err){
                setHorarios([]);
            }
        }

        if(carregarAgenda){
            obterAgenda();
            obterHorarios();
            setValorDiaAtual();
            setCarregarAgenda(false);
        }

        if(alterarDia){
            obterAgenda();
            obterHorarios();
            setValorDia();
            setAlterarDia(false);
        }

    }, [carregarAgenda, alterarDia]);

    return ( 
        <div>
            <Menu />
            <Container 
                fluid="md" >
                <Calendario
                    dia={dia}
                    mes={mes}
                    datas={datas}
                    setAlterarDia={setAlterarDia}
                    setDiaSelecionado={setDiaSelecionado}/>
                <Horario 
                    diaSemana={diaSemana}
                    horarios={horarios} />
            </Container>
        </div> 
    );
}

export default Agenda;