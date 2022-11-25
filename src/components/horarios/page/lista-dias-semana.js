import {
    Card,
    Form,
    Row,
    Col,
    Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import RemoverHorarios from '../action/remover-horarios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faEdit
} from '@fortawesome/free-solid-svg-icons';
import Horario from '../../../models/horario.model';

function ListaDiasSemana(props) {

    function visivel() {
        return props.visivel ? 'mt-3' : 'hidden';
    }

    function handleAlterar(event, linha){
        event.preventDefault();
        props.handleExibirAlterar(linha);
    }

    function verifDiaSemana(linha){
        if(linha === 1){
            return "Domingo";
        } else if(linha === 2){
            return "Segunda-feira";
        } else if(linha === 3){
            return "Terça-feira";
        } else if(linha === 4){
            return "Quarta-feira";
        } else if(linha === 5){
            return "Quinta-feira";
        } else if(linha === 6){
            return "Sexta-feira";
        } else {
            return "Sabado";
        } 
    }

    function retornoDia(id){
        let dias = props.dias.filter(dia => dia.id === id.toString());
        if(dias.length > 0){
            let horario_inicial = dias[0].horario_inicial.replace(".50", ":30").replace(".00", ":00");
            let horario_final = dias[0].horario_final.replace(".50", ":30").replace(".00", ":00");
            return "Horario " + horario_inicial + " a " + horario_final;
        } else {
            return "";
        }
    }

    function retornoHorario(id){
        let dias = props.dias.filter(dia => dia.id === id.toString());
        if(dias.length > 0){
            return dias[0];
        } else {
            return new Horario();
        }
    }

    function gerarDia(linha){
        return (
            <Card 
                key={linha}
                className='mb-3'>
                <Card.Header>
                    {verifDiaSemana(linha)}
                </Card.Header>
                <Card.Body>
                    <Form.Group
                        as={Row}>
                        <Form.Label
                                column
                                md={8}
                                style={{ 
                                    fontWeight: 'bold', 
                                    }}>
                            {retornoDia(linha)}
                        </Form.Label>
                        <Col 
                            md={2}
                            style={{ 
                                textAlign: 'center', 
                                }}>
                            <Button 
                                className={'btn btn-primary btn-sm'}
                                onClick={(event) => handleAlterar(event, linha)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </Col>
                        <Col 
                            md={2}
                            style={{ 
                                textAlign: 'center', 
                                }}>
                            <RemoverHorarios
                                horario={retornoHorario(linha)}
                                setCarregarDias={props.setCarregarDias}
                            />
                        </Col>
                    </Form.Group>
                </Card.Body>
            </Card>
        );
    }


    function gerarDias(){
        let items = [];
        for(let linha = 1; linha <= 7; linha++ ){
            items.push(gerarDia(linha))
        }
        return items;
    }

    return ( 
        <div className={visivel()}>
            {gerarDias()}
        </div>
    );
}

ListaDiasSemana.propTypes = {
    visivel: PropTypes.bool.isRequired,
    handleExibirAlterar: PropTypes.func.isRequired,
    dias: PropTypes.array.isRequired,
    setCarregarDias: PropTypes.func.isRequired,
}

export default ListaDiasSemana;