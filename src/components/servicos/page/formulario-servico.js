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
import Servico from '../../../models/servico.model';
import PropTypes from 'prop-types';
import formatarPreco from '../../../utils/formatters/preco';

function FormularioServico(props) {

    const [id, setId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [detalhe, setDetalhe] = useState('');
    const [tempo, setTempo] = useState('');
    const [valor, setValor] = useState('');

    useEffect(() => {

        function obterServico(){
            setId(props.servico.id);
            setDescricao(props.servico.descricao);
            setDetalhe(props.servico.detalhe);
            setTempo(props.servico.tempo);
            setValor(props.servico.valor);
        }

        if(props.carregarServico){
            obterServico();
            props.setCarregarServico(false);
        }
    }, [props.carregarServico]);


    function handleDescricao(event){
        setDescricao(event.target.value);
    }

    function handleDetalhe(event){
        setDetalhe(event.target.value);
    }

    function handleTempo(event){
        setTempo(event.target.value);
    }

    function handleValor(event){
        setValor('R$ ' + formatarPreco(event.target.value));
    }

    function submit(event){
        event.preventDefault();
        props.salvarServico(new Servico(id, descricao, detalhe, tempo, valor));
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
                            Id:{id}
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
                                    as="select"
                                    value={tempo} 
                                    onChange={handleTempo}
                                    required>
                                <option value="30">30 Minutos</option>
                                <option value="60">1 Hora</option>
                            </Form.Control>
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
    );
}

FormularioServico.propTypes = {
    servico: PropTypes.object.isRequired,
    salvarServico: PropTypes.func.isRequired,
    handleExibirTabela: PropTypes.func.isRequired,
    carregarServico: PropTypes.bool.isRequired,
    setCarregarServico: PropTypes.func.isRequired,
}

export default FormularioServico;