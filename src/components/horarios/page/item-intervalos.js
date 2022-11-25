import PropTypes from 'prop-types';
import { 
    Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';

function ItemIntervalos(props) {

    function handleRemoverHorario(event, id){
        event.preventDefault();
        props.handleRemoverHorario(id);
    }

    function retornoHorario(horario){
        return parseFloat(horario).toFixed(2).replace(".50", ":30").replace(".00", ":00");
    }

    return ( 
        props.intervalos.map((horario, index) => 
            <tr 
                key={index + 1}>
                <td 
                    style={{ textAlign: 'center' }}>
                    {horario.id}
                </td>
                <td 
                    style={{ textAlign: 'center' }}>
                    {retornoHorario(horario.horario_inicial)}
                </td>
                <td 
                    style={{ textAlign: 'center' }}>
                    {retornoHorario(horario.horario_final)}
                </td>
                <td 
                    style={{ textAlign: 'center' }}>
                    <Button 
                        className={'btn btn-danger btn-sm'}
                        onClick={(event) => handleRemoverHorario(event, horario.id)}  >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </td>
            </tr>
        )
    );
}

ItemIntervalos.propTypes = {
    intervalos: PropTypes.array.isRequired,
    handleRemoverHorario: PropTypes.func.isRequired,
}

export default ItemIntervalos;