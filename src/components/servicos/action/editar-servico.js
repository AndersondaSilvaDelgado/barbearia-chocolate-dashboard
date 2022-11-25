import {
    useState,
} from 'react';
import { 
    Card,
    Button,
    Modal,
} from 'react-bootstrap';
import Servico from '../../../models/servico.model';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as constant from '../../../utils/constants/constants';
import FormularioServico from '../page/formulario-servico';

function EditarServico(props) {

    const URL_EDITAR = constant.URL_BASE + constant.SERVICO;

    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');

    async function salvarServico(servico){
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(servico));
            formData.append('method', 'put');
            let { data } = await axios.post(URL_EDITAR + '/' + servico.id, formData);
            if(data.status==='success'){
                setMessagem(data.response);
                setExibirModalSucesso(true);
            } else {
                setMessagem("Erro na Edição de Registro: " + data.response);
                setExibirModalErro(true);
            }
        } catch (err) {
            setMessagem("Erro na Edição de Registro: " + err.message);
            setExibirModalErro(true);
        }
    }

    function visivel() {
        return props.visivel ? 'mt-3' : 'hidden';
    }

    function handleFecharModalSucesso(){
        setExibirModalSucesso(false);
        props.handleExibirTabela();
        props.setRecarregarServicos(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.handleExibirTabela();
        props.setRecarregarServicos(true);
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Editar Servico
                    </h2>
                </Card.Header>
                <FormularioServico 
                    servico={new Servico('', '', '', '', '')}
                    salvarServico={salvarServico} 
                    handleExibirTabela={props.handleExibirTabela}
                    carregarServico={props.carregarServico} 
                    setCarregarServico={props.setCarregarServico}
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

EditarServico.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
    setRecarregarServicos: PropTypes.func.isRequired,
    servico: PropTypes.object.isRequired,
    carregarServico: PropTypes.bool.isRequired,
    setCarregarServico: PropTypes.func.isRequired,
}

export default EditarServico;