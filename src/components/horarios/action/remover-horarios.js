import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import * as constants from '../../../utils/constants/constants';

function RemoverHorarios(props) {

    const URL_REMOVER_HORARIO = constants.URL_BASE + constants.HORARIOS;

    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');
    
    function handleAbrirModal(event){
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal(){
        setExibirModal(false);
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.setCarregarDias(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.setCarregarDias(true);
    }

    async function handleRemoverHorario(event){
        event.preventDefault();
        try {
            let { data } = await axios.delete(URL_REMOVER_HORARIO + '/' + props.horario.id);
            setExibirModal(false);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Limpeza: " + data.response);
                setExibirModalErro(true);
            }
        } catch(err) {
            setExibirModal(false);
            setMessagem("Erro na Limpeza: " + err.message);
            setExibirModalErro(true);
        }
    }

    return ( 
        <div>
            <Button 
                className={'btn btn-danger btn-sm'}
                onClick={handleAbrirModal} >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Modal 
                show={exibirModal} 
                onHide={handleFecharModal} 
                data-testid="modal" >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Limpar Horários
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente limpar o horários do dia <strong>{props.horario.descricao}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="primary" 
                        onClick={handleRemoverHorario}
                        data-testid="btn-remover" >
                        Sim
                    </Button>
                    <Button 
                        variant="light" 
                        onClick={handleFecharModal}
                        data-testid="btn-fechar-modal" >
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>
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

RemoverHorarios.propTypes = {
    horario: PropTypes.object.isRequired,
    setCarregarDias: PropTypes.func.isRequired,
}

export default RemoverHorarios;