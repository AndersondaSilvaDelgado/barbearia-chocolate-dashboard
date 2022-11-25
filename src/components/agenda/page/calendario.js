import { 
    Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Dias from './dias';

function Calendario(props) {

    return (
        <Table 
            striped 
            bordered 
            responsive
            size="md"
            className="mt-3">
            <thead>
                <tr>
                    <th 
                        className="align-middle"
                        colSpan={7}
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        {props.mes}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Domingo
                    </td>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Segunda-Feira
                    </td>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Terça-Feira
                    </td>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Quarta-Feira
                    </td>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Quinta-Feira
                    </td>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Sexta-Feira
                    </td>
                    <td
                        className="align-middle"
                        style={{ 
                            textAlign: 'center',
                            height: '4rem', }}>
                        Sábado
                    </td>
                </tr>
                <Dias
                    dia={props.dia}
                    datas={props.datas}
                    setAlterarDia={props.setAlterarDia}
                    setDiaSelecionado={props.setDiaSelecionado}/>
            </tbody>
        </Table>
    );

}

Calendario.propTypes = {
    dia: PropTypes.number.isRequired,
    mes: PropTypes.string.isRequired,
    datas: PropTypes.array.isRequired,
    setAlterarDia: PropTypes.func.isRequired,
    setDiaSelecionado: PropTypes.func.isRequired
}

export default Calendario;
