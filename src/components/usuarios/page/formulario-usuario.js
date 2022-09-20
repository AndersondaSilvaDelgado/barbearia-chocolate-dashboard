import {
    useState,
    useEffect,
} from 'react';
import { 
    Card,
    Button,
    Container,
    Row,
    Col,
    Form,
} from 'react-bootstrap';
import Usuario from '../../../models/usuario.model';
import PropTypes from 'prop-types';

function FormularioUsuario(props) {

    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {

        function obterUsuario(){
            setId(props.usuario.id);
            setNome(props.usuario.nome);
            setSenha(props.usuario.senha);
        }

        if(props.carregarUsuario){
            obterUsuario();
            props.setCarregarUsuario(false);
        }
    }, [props.carregarUsuario]);

    function handleNome(event){
        setNome(event.target.value);
    }

    function handleSenha(event){
        setSenha(event.target.value);
    }

    function submit(event){
        event.preventDefault();
        props.salvarUsuario(new Usuario(id, nome, senha));
    }

    return (
        <Card.Body>
            <Container >
                <Form 
                    onSubmit={submit}>
                    <Form.Group
                        as={Row}>
                        <Form.Label
                                column
                                md={2}>
                            Codigo: {id} 
                        </Form.Label>
                        <Form.Label
                                column
                                md={10}>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mt-2">
                        <Form.Label
                                column
                                md={2}>
                            Nome:
                        </Form.Label>
                        <Col 
                            md={10}>
                            <Form.Control
                                type="text"
                                value={nome} 
                                onChange={handleNome}
                                required />
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mt-2">
                        <Form.Label
                                column
                                md={2}>
                            Senha:
                        </Form.Label>
                        <Col 
                            md={10}>
                            <Form.Control
                                type="text"
                                value={senha} 
                                onChange={handleSenha}
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
    );
}

FormularioUsuario.propTypes = {
    usuario: PropTypes.object.isRequired,
    salvarUsuario: PropTypes.func.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
}

export default FormularioUsuario;