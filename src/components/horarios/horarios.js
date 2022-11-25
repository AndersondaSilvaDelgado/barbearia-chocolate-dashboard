import {
    useState,
    useEffect,
} from 'react';
import { 
    Container,
    Modal,
    Button,
} from 'react-bootstrap';
import Menu from '../../utils/page/menu';
import ListaDiasSemana from './page/lista-dias-semana';
import AlterarHorarios from './action/alterar-horarios';
import * as constants from '../../utils/constants/constants';
import axios from 'axios';

function Horarios() {

    const URL_LISTAR_HORARIOS = constants.URL_BASE + constants.HORARIOS;

    const [dias, setDias] = useState([]);
    const [exibirDias, setExibirDias] = useState(true);
    const [exibirAlterar, setExibirAlterar] = useState(false);
    const [carregarDia, setCarregarDia] = useState(false);
    const [carregarDias, setCarregarDias] = useState(true);
    const [dia, setDia] = useState(0);
    const [messagem, setMessagem] = useState('');
    const [exibirModalErro, setExibirModalErro] = useState(false);

    useEffect(() => {

        async function obterDias(){
            try{
                let { data } = await axios.get(URL_LISTAR_HORARIOS);
                console.log(data);
                if(data.status==='success'){
                    setDias(data.data);
                } else {
                    setMessagem(data.response);
                    setExibirModalErro(true);
                }
            } catch(err){
                console.log(err.message);
                setDias([]);
                setMessagem(err.message);
                setExibirModalErro(true);
            }
        }

        if(carregarDias){
            obterDias();
            setCarregarDias(false);
        }
    }, [carregarDias]);

    function handleExibirDias(){
        setCarregarDia(false);
        setExibirDias(true);
        setExibirAlterar(false);
        setCarregarDias(true);
    }

    function handleExibirAlterar(dia){
        setDia(dia);
        setCarregarDia(true);
        setExibirAlterar(true);
        setExibirDias(false);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    return ( 
        <div>
            <Menu />
            <Container 
                fluid="md" >
                <ListaDiasSemana
                    visivel={exibirDias}
                    handleExibirAlterar={handleExibirAlterar}
                    dias={dias}
                    setCarregarDias={setCarregarDias}
                    />
                <AlterarHorarios
                    visivel={exibirAlterar} 
                    handleExibirDias={handleExibirDias}
                    dia={dia}
                    carregarDia={carregarDia} 
                    setCarregarDia={setCarregarDia}
                    dias={dias}
                    />
            </Container>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao buscar Horário: {messagem}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="warning"
                        onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>  
    );
}

export default Horarios;