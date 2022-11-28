import {
    useEffect,
} from 'react';
import {
    Card,
    Form,
    Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

function Horario(props) {

    function gerarLinhaHorarios(linha){
        return (
            <Card 
                key={linha}
                className="mb-3">
                <Card.Header>
                    <Card.Body>
                        <Form.Group
                            as={Row}>
                            <Form.Label
                                    column
                                    md={3}>
                                        7:00 - 7:30
                            </Form.Label>
                            <Form.Label
                                    column
                                    md={9}>
                                        Anderson
                            </Form.Label>
                        </Form.Group>
                        <Form.Group
                            as={Row}>
                            <Form.Label
                                    column
                                    md={12}>
                                        {linha}
                            </Form.Label>
                        </Form.Group>
                    </Card.Body>
                </Card.Header>
            </Card>
        );
    }

    function gerarHorarios(){
        let items = [];
        let horarios = props.horarios.filter((horario) => (horario.id === props.diaSemana.toString()));
        if(horarios.length > 0){
            var horarioFinal = horarios[0]['horario_final'];
            var horarioInicial = horarios[0]['horario_inicial'];
            var qtde = (horarioFinal - horarioInicial) / 0.5;
            for(let linha = 1; linha <= qtde; linha++ ){
                items.push(gerarLinhaHorarios(linha))
            }
        }
        return items;
    }


    return (
        <div>
            {gerarHorarios()}
        </div>
    );

}

Horario.propTypes = {
    diaSemana: PropTypes.number.isRequired,
    horarios: PropTypes.array.isRequired,
}

export default Horario;