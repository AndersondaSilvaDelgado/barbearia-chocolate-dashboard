import {
    useState,
    useEffect,
} from 'react';
import { 
    Card,
    Button,
    Modal
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormularioHorarios from '../page/formulario-horarios';
import * as constants from '../../../utils/constants/constants';
import axios from 'axios';

function AlterarHorarios(props) {

    const URL_SALVAR = constants.URL_BASE + constants.HORARIOS;

    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');

    async function salvarHorario(horario, intervalos){
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(horario));
            console.log(JSON.stringify(horario));
            formData.append('intervalos', JSON.stringify(intervalos));
            console.log(JSON.stringify(horario));
            console.log(JSON.stringify(intervalos));
            formData.append('method', 'post');
            let { data } = await axios.post(URL_SALVAR, formData);
            console.log(data);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setExibirModalErro(true);
            }
        } catch (err) {
            console.log(err);
            setExibirModalErro(true);
        }
    }

    function visivel() {
        return props.visivel ? 'mt-3' : 'hidden';
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.handleExibirDias();
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.handleExibirDias();
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Alterar Horários
                    </h2>
                </Card.Header>
                <FormularioHorarios
                    handleExibirDias={props.handleExibirDias}
                    dia={props.dia}
                    carregarDia={props.carregarDia}
                    setCarregarDia={props.setCarregarDia}
                    salvarHorario={salvarHorario}
                    dias={props.dias}
                    />
            </Card>
            <Modal 
                show={exibirModalSucesso} 
                onHide={handleFecharModalSucesso} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Sucesso
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messagem}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="success"
                        onClick={handleFecharModalSucesso}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {messagem}
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

AlterarHorarios.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirDias: PropTypes.func.isRequired,
    dia: PropTypes.number.isRequired,
    carregarDia: PropTypes.bool.isRequired,
    setCarregarDia: PropTypes.func.isRequired,
    dias: PropTypes.array.isRequired,
}

export default AlterarHorarios;