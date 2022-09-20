import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { 
    Button
} from 'react-bootstrap';
import RemoverServico from '../action/remover-servico';

function ItensTabelaServicos(props) {

    function handleEditarServico(event, servico){
        event.preventDefault();
        props.handleExibirEditar(servico)
    }

    return ( 
        props.servicos.map(servico => 
            <tr 
                key={servico.id}>
                <td className="align-middle"
                    style={{ textAlign: 'center' }}>
                    {servico.id}
                </td>
                <td className="align-middle">
                    {servico.descricao}
                </td>
                <td  className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <Button 
                        className={'btn btn-primary btn-sm'}
                        onClick={(event) => handleEditarServico(event, servico)} >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </td>
                <td className="align-middle"
                    style={{ textAlign: 'center' }}>
                    <RemoverServico
                        servico={servico}
                        setRecarregarServicos={props.setRecarregarServicos}/>
                </td>
            </tr>
        )
    );
}

ItensTabelaServicos.propTypes = {
    servicos: PropTypes.array.isRequired, 
    handleExibirEditar: PropTypes.func.isRequired,
    setRecarregarServicos: PropTypes.func.isRequired
}

export default ItensTabelaServicos;