import {
    useEffect,
    useState,
} from 'react';
import { 
    Card,
    Button,
    Container,
    Row,
    Col,
    Form,
    Table,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemIntervalos from './item-intervalos';
import Horario from '../../../models/horario.model';
import PropTypes from 'prop-types';
import * as constants from '../../../utils/constants/constants';
import axios from 'axios';

function FormularioHorarios(props) {

    const URL_LISTAR_INTERVALOS = constants.URL_BASE + constants.INTERVALOS;

    const [horarioInicial, setHorarioInicial] = useState(6);
    const [horarioFinal, setHorarioFinal] = useState(8);
    const [horarioInicialIntervalo, setHorarioInicialIntervalo] = useState(6);
    const [horarioFinalIntervalo, setHorarioFinalIntervalo] = useState(8);
    const [intervalos, setIntervalos] = useState([]);
    const [adicionarIntervalos, setAdicionarIntervalos] = useState(false);
    const [removerIntervalos, setRemoverIntervalos] = useState(false);
    const [idRemover, setIdRemover] = useState('');

    const [idDia, setIdDia] = useState(0);
    const [descrDia, setDescrDia] = useState('');

    useEffect(() => {
        
        async function obterIntevalos(){
            try{
                let { data } = await axios.get(URL_LISTAR_INTERVALOS + '/' + props.dia);
                if(data.status==='success'){
                    setIntervalos(data.data);
                } else {
                    setIntervalos([]);
                }
            } catch(err){
                setIntervalos([]);
            }
        }

        function obterDia(){
            setIdDia(props.dia);
            if(props.dia === 1){
                setDescrDia("Domingo");
            } else if(props.dia === 2){
                setDescrDia("Segunda-feira");
            } else if(props.dia === 3){
                setDescrDia("Terça-feira");
            } else if(props.dia === 4){
                setDescrDia("Quarta-feira");
            } else if(props.dia === 5){
                setDescrDia("Quinta-feira");
            } else if(props.dia === 6){
                setDescrDia("Sexta-feira");
            } else {
                setDescrDia("Sabado");
            } 
            let dias = props.dias.filter(dia => dia.id === props.dia.toString());
            if(dias.length > 0){
                setHorarioInicial(parseFloat(dias[0].horario_inicial, 10));
                setHorarioFinal(parseFloat(dias[0].horario_final, 10));
            } else {
                setHorarioInicial(6);
                setHorarioFinal(8);
            }
        }

        function addIntervalos(){
            intervalos.push(new Horario((intervalos.length + 1), '', horarioInicialIntervalo, horarioFinalIntervalo));
        }

        function remIntervalos(){
            setIntervalos(intervalos.filter(horario => horario.id !== idRemover));
        }

        if(adicionarIntervalos){
            addIntervalos();
            setAdicionarIntervalos(false);
        }

        if(removerIntervalos){
            remIntervalos();
            setRemoverIntervalos(false);
        }

        if(props.carregarDia){
            obterDia();
            obterIntevalos();
            props.setCarregarDia(false);
        }

    }, [adicionarIntervalos, removerIntervalos, props.carregarDia]);

    function handleHorarioInicial(event){
        setHorarioInicial(event.target.value);
    }

    function handleHorarioFinal(event){
        setHorarioFinal(event.target.value);
    }

    function handleHorarioInicialIntervalo(event){
        setHorarioInicialIntervalo(event.target.value);
    }

    function handleHorarioFinalIntervalo(event){
        setHorarioFinalIntervalo(event.target.value);
    }

    function handleAdicionarHorario(event){
        event.preventDefault();
        setAdicionarIntervalos(true);
    }

    function handleRemoverHorario(id){
        setIdRemover(id);
        setRemoverIntervalos(true);
    }

    function submit(event){
        event.preventDefault();
        props.salvarHorario(new Horario(idDia, descrDia, horarioInicial, horarioFinal), intervalos);
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
                                md={12}
                                style={{ 
                                    fontSize: '2rem',
                                    fontWeight: 'bold', 
                                    }}>
                            {descrDia}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mt-2">
                        <Form.Label
                                column
                                md={2}>
                            Horario Inicial:
                        </Form.Label>
                        <Col 
                            md={1}>
                            <Form.Control
                                    as="select"
                                    value={horarioInicial} 
                                    onChange={handleHorarioInicial}
                                    required>
                                <option value={6}>06:00</option>
                                <option value={6.5}>06:30</option>
                                <option value={7}>07:00</option>
                                <option value={7.5}>07:30</option>
                                <option value={8}>08:00</option>
                                <option value={8.5}>08:30</option>
                                <option value={9}>09:00</option>
                                <option value={9.5}>09:30</option>
                                <option value={10}>10:00</option>
                                <option value={10.5}>10:30</option>
                                <option value={11}>11:00</option>
                                <option value={11.5}>11:30</option>
                                <option value={12}>12:00</option>
                                <option value={12.5}>12:30</option>
                                <option value={13}>13:00</option>
                                <option value={13.5}>13:30</option>
                                <option value={14}>14:00</option>
                                <option value={14.5}>14:30</option>
                                <option value={15}>15:00</option>
                                <option value={15.5}>15:30</option>
                                <option value={16}>16:00</option>
                                <option value={16.5}>16:30</option>
                                <option value={17}>17:00</option>
                                <option value={17.5}>17:30</option>
                                <option value={18}>18:00</option>
                                <option value={18.5}>18:30</option>
                                <option value={19}>19:00</option>
                                <option value={19.5}>19:30</option>
                                <option value={20}>20:00</option>
                                <option value={20.5}>20:30</option>
                            </Form.Control>
                        </Col>
                        <Col md={1} />
                        <Form.Label
                                column
                                md={2}>
                            Horario Final:
                        </Form.Label>
                        <Col 
                            md={1}>
                            <Form.Control
                                    as="select"
                                    value={horarioFinal} 
                                    onChange={handleHorarioFinal}
                                    required>
                                <option value={8}>08:00</option>
                                <option value={8.5}>08:30</option>
                                <option value={9}>09:00</option>
                                <option value={9.5}>09:30</option>
                                <option value={10}>10:00</option>
                                <option value={10.5}>10:30</option>
                                <option value={11}>11:00</option>
                                <option value={11.5}>11:30</option>
                                <option value={12}>12:00</option>
                                <option value={12.5}>12:30</option>
                                <option value={13}>13:00</option>
                                <option value={13.5}>13:30</option>
                                <option value={14}>14:00</option>
                                <option value={14.5}>14:30</option>
                                <option value={15}>15:00</option>
                                <option value={15.5}>15:30</option>
                                <option value={16}>16:00</option>
                                <option value={16.5}>16:30</option>
                                <option value={17}>17:00</option>
                                <option value={17.5}>17:30</option>
                                <option value={18}>18:00</option>
                                <option value={18.5}>18:30</option>
                                <option value={19}>19:00</option>
                                <option value={19.5}>19:30</option>
                                <option value={20}>20:00</option>
                                <option value={20.5}>20:30</option>
                                <option value={21}>21:00</option>
                                <option value={21.5}>21:30</option>
                                <option value={22}>22:00</option>
                                <option value={22.5}>22:30</option>
                                <option value={23}>23:00</option>
                                <option value={23.5}>23:30</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}>
                        <Form.Label
                                column
                                md={12}
                                style={{  
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold', 
                                    }} >
                            Intervalos
                        </Form.Label>
                    </Form.Group>
                    <Form.Group
                        as={Row}
                        className="mt-2">
                        <Form.Label
                                column
                                md={2}>
                            Horario Inicial:
                        </Form.Label>
                        <Col 
                            md={1}>
                            <Form.Control
                                    as="select"
                                    value={horarioInicialIntervalo} 
                                    onChange={handleHorarioInicialIntervalo}>
                                    <option value={6}>06:00</option>
                                    <option value={6.5}>06:30</option>
                                    <option value={7}>07:00</option>
                                    <option value={7.5}>07:30</option>
                                    <option value={8}>08:00</option>
                                    <option value={8.5}>08:30</option>
                                    <option value={9}>09:00</option>
                                    <option value={9.5}>09:30</option>
                                    <option value={10}>10:00</option>
                                    <option value={10.5}>10:30</option>
                                    <option value={11}>11:00</option>
                                    <option value={11.5}>11:30</option>
                                    <option value={12}>12:00</option>
                                    <option value={12.5}>12:30</option>
                                    <option value={13}>13:00</option>
                                    <option value={13.5}>13:30</option>
                                    <option value={14}>14:00</option>
                                    <option value={14.5}>14:30</option>
                                    <option value={15}>15:00</option>
                                    <option value={15.5}>15:30</option>
                                    <option value={16}>16:00</option>
                                    <option value={16.5}>16:30</option>
                                    <option value={17}>17:00</option>
                                    <option value={17.5}>17:30</option>
                                    <option value={18}>18:00</option>
                                    <option value={18.5}>18:30</option>
                                    <option value={19}>19:00</option>
                                    <option value={19.5}>19:30</option>
                                    <option value={20}>20:00</option>
                                    <option value={20.5}>20:30</option>
                            </Form.Control>
                        </Col>
                        <Col md={1} />
                        <Form.Label
                                column
                                md={2}>
                            Horario Final:
                        </Form.Label>
                        <Col 
                            md={1}>
                            <Form.Control
                                    as="select"
                                    value={horarioFinalIntervalo} 
                                    onChange={handleHorarioFinalIntervalo}>
                                    <option value={8}>08:00</option>
                                    <option value={8.5}>08:30</option>
                                    <option value={9}>09:00</option>
                                    <option value={9.5}>09:30</option>
                                    <option value={10}>10:00</option>
                                    <option value={10.5}>10:30</option>
                                    <option value={11}>11:00</option>
                                    <option value={11.5}>11:30</option>
                                    <option value={12}>12:00</option>
                                    <option value={12.5}>12:30</option>
                                    <option value={13}>13:00</option>
                                    <option value={13.5}>13:30</option>
                                    <option value={14}>14:00</option>
                                    <option value={14.5}>14:30</option>
                                    <option value={15}>15:00</option>
                                    <option value={15.5}>15:30</option>
                                    <option value={16}>16:00</option>
                                    <option value={16.5}>16:30</option>
                                    <option value={17}>17:00</option>
                                    <option value={17.5}>17:30</option>
                                    <option value={18}>18:00</option>
                                    <option value={18.5}>18:30</option>
                                    <option value={19}>19:00</option>
                                    <option value={19.5}>19:30</option>
                                    <option value={20}>20:00</option>
                                    <option value={20.5}>20:30</option>
                                    <option value={21}>21:00</option>
                                    <option value={21.5}>21:30</option>
                                    <option value={22}>22:00</option>
                                    <option value={22.5}>22:30</option>
                                    <option value={23}>23:00</option>
                                    <option value={23.5}>23:30</option>
                            </Form.Control>
                        </Col>
                        <Col 
                            md={2}
                            className="mt-1"
                            style={{ 
                                textAlign: 'center', 
                                }}>
                            <Button 
                                variant="success"
                                onClick={handleAdicionarHorario} >
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Col>
                    </Form.Group>
                    <Form.Group
                        as={Row}>
                        <Table 
                            striped 
                            bordered 
                            hover 
                            className="mt-3">
                            <thead>
                                <tr>
                                    <th 
                                        style={{ textAlign: 'center' }} >
                                        Id
                                    </th>
                                    <th 
                                        style={{ textAlign: 'center' }} >
                                        Horário Inicial
                                    </th>
                                    <th 
                                        style={{ textAlign: 'center' }} >
                                        Horário Final
                                    </th>
                                    <th 
                                        style={{ textAlign: 'center' }} >
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <ItemIntervalos 
                                    intervalos={intervalos}
                                    handleRemoverHorario={handleRemoverHorario}/>
                            </tbody>
                        </Table>
                    </Form.Group>
                    <Form.Group 
                        as={Row} 
                        className="mt-3">
                        <Col 
                            className="text-end">
                            <Button 
                                variant="danger"
                                onClick={props.handleExibirDias} >
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

FormularioHorarios.propTypes = {
    handleExibirDias: PropTypes.func.isRequired,
    dia: PropTypes.number.isRequired,
    carregarDia: PropTypes.bool.isRequired,
    setCarregarDia: PropTypes.func.isRequired,
    salvarHorario: PropTypes.func.isRequired,
    dias: PropTypes.array.isRequired,
}

export default FormularioHorarios;