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

    function retornoHorario(horario){
        return parseFloat(horario).toFixed(2).replace(".50", ":30").replace(".00", ":00");
    }

    function gerarLinhaHorarios(linha, horarioInicial, horarioFinal){
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
                                        {retornoHorario(horarioInicial)} - {retornoHorario(horarioFinal)}
                            </Form.Label>
                            <Form.Label
                                    column
                                    md={9}>
                                        -
                            </Form.Label>
                        </Form.Group>
                        <Form.Group
                            as={Row}>
                            <Form.Label
                                    column
                                    md={12}>
                                        -
                            </Form.Label>
                        </Form.Group>
                    </Card.Body>
                </Card.Header>
            </Card>
        );
    }

    function gerarHorarios(){
        let items = [];
        let horarios = props.horarios.filter((horario) => (horario.id === (props.diaSemana + 1).toString()));
        if(horarios.length > 0){
            var horarioFinal = horarios[0]['horario_final'];
            var horarioInicial = horarios[0]['horario_inicial'];
            var qtde = (horarioFinal - horarioInicial) / 0.5;
            for(let linha = 1; linha <= qtde; linha++ ){
                var aumento = (linha - 1) * 0.5;
                var hrInicial = parseFloat(aumento) + parseFloat(horarioInicial);
                var hrFinal = hrInicial + 0.5;
                items.push(gerarLinhaHorarios(linha, hrInicial, hrFinal))
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