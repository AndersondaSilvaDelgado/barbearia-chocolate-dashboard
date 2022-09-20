import {
    useState,
} from 'react';
import { 
    Card,
    Button,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as constants from '../../../utils/constants/constants';
import FormularioUsuario from '../page/formulario-usuario'

function EditarUsuario(props) {

    const URL_EDITAR = constants.URL_BASE + constants.USUARIO;

    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');

    async function salvarUsuario(usuario){
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(usuario));
            formData.append('method', 'put');
            let { data } = await axios.post(URL_EDITAR + '/' + usuario.id, formData);
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
        props.setRecarregarUsuarios(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
        props.handleExibirTabela();
        props.setRecarregarUsuarios(true);
    }

    return ( 
        <div
            className={visivel()}>
            <Card >
                <Card.Header>
                    <h2>
                        Editar Usuario
                    </h2>
                </Card.Header>
                <FormularioUsuario
                    usuario={props.usuario}
                    salvarUsuario={salvarUsuario} 
                    handleExibirTabela={props.handleExibirTabela}
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

EditarUsuario.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
    setRecarregarUsuarios: PropTypes.func.isRequired,
    usuario: PropTypes.object.isRequired,
    carregarUsuario: PropTypes.bool.isRequired,
    setCarregarUsuario: PropTypes.func.isRequired,
}

export default EditarUsuario;