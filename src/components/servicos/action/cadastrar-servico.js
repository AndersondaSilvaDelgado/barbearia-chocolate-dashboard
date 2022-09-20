import {
    useState,
} from 'react';
import { 
    Card,
    Button,
    Container,
    Row,
    Col,
    Form,
    Modal
} from 'react-bootstrap';
import Servico from '../../../models/servico.model';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as constants from '../../../utils/constants/constants';

function CadastrarServico(props) {

    const URL_CADASTRAR = constants.URL_BASE + constants.SERVICO;

    const [descricao, setDescricao] = useState('');
    const [detalhe, setDetalhe] = useState('');
    const [tempo, setTempo] = useState('');
    const [valor, setValor] = useState('');
    const [exibirModalSucesso, setExibirModalSucesso] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
    const [messagem, setMessagem] = useState('');

    async function salvarServico(event){
        try {
            event.preventDefault();
            const novoServico = new Servico(descricao, detalhe);
            const formData = new FormData();
            formData.append('data', JSON.stringify(novoServico));
            formData.append('method', 'post');
            let { data } = await axios.post(URL_CADASTRAR, formData);
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

    function handleDescricao(event){
        setDescricao(event.target.value);
    }

    function handleDetalhe(event){
        setDetalhe(event.target.value);
    }

    function handleTempo(event){
        setTempo(event.target.value.replace(/\D/g, ''));
    }

    function handleValor(event){
        setValor(event.target.value);
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
                        Cadastrar Serviço
                    </h2>
                </Card.Header>
                <Card.Body>
                    <Container >
                        <Form 
                            onSubmit={salvarServico}>
                            <Form.Group
                                as={Row}>
                                <Form.Label
                                        column
                                        md={2}>
                                    Id:
                                </Form.Label>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Descricao:
                                </Form.Label>
                                <Col 
                                    md={6}>
                                    <Form.Control
                                        type="text"
                                        value={descricao} 
                                        onChange={handleDescricao}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Detalhes:
                                </Form.Label>
                                <Col 
                                    md={10}>
                                    <Form.Control
                                        as="textarea" 
                                        rows={10}
                                        value={detalhe} 
                                        onChange={handleDetalhe}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Tempo:
                                </Form.Label>
                                <Col 
                                    md={4}>
                                    <Form.Control
                                        type="text"
                                        value={tempo} 
                                        onChange={handleTempo}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mt-2">
                                <Form.Label
                                        column
                                        md={2}>
                                    Valor:
                                </Form.Label>
                                <Col 
                                    md={4}>
                                    <Form.Control
                                        type="text"
                                        value={valor} 
                                        onChange={handleValor}
                                        required />
                                </Col>
                            </Form.Group>
                            <Form.Group 
                                as={Row} 
                                className="mt-3">
                                <Col 
                                    className="text-end">
                                    <Button 
                                        variant="danger"
                                        onClick={props.handleExibirTabela} >
                                        Cancelar
                                    </Button>
                                </Col>
                                <Col 
                                    className="text-start">
                                    <Button 
                                        variant="primary" 
                                        type="submit">
                                        Salvar
                                    </Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Container>
                </Card.Body>
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

CadastrarServico.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
    setRecarregarServicos: PropTypes.func.isRequired,
}

export default CadastrarServico;