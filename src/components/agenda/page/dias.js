import PropTypes from 'prop-types';

function Dias(props) {

    function getDia(dia){
        return (new Date(dia)).getDate();
    }

    function verifDia(dia){
        var dia = (new Date(dia)).getDate();
        return (dia === props.dia) ? { 
                textAlign: 'center',
                height: '4rem', 
                cursor: 'pointer',
                backgroundColor: 'red',
            } : { 
                textAlign: 'center',
                height: '4rem', 
                cursor: 'pointer',
            };
    }

    function setDiaSelecionado(event, dia){
        event.preventDefault();
        props.setDiaSelecionado(dia);
        props.setAlterarDia(true);
    }

    function gerarColuna(dia){
        return ( 
            <td
                key={dia}
                className="align-middle"
                style={verifDia(props.datas[(dia - 1)])}
                onClick={(event) => setDiaSelecionado(event, props.datas[(dia - 1)])} >
                    {getDia(props.datas[(dia - 1)])}
            </td>
        );
    }

    function gerarColunas(linha){
        let items = [];
        let dia = 0
        for(let i = 1; i <= 7; i++ ){
            dia = (((linha - 1) * 7) + i);
            if(dia <= 21){
                items.push(gerarColuna(dia));
            }
        }
        return items;
    }

    function gerarLinha(linha){
        return (
            <tr
                key={linha}>
                {gerarColunas(linha)}
            </tr>
        );
    }

    function gerarLinhas(){
        let items = [];
        for(let linha = 1; linha <= 3; linha++ ){
            items.push(gerarLinha(linha))
        }
        return items;
    }

    return (
        gerarLinhas()
    );

}

Dias.propTypes = {
    dia: PropTypes.number.isRequired,
    datas: PropTypes.array.isRequired,
    setAlterarDia: PropTypes.func.isRequired,
    setDiaSelecionado: PropTypes.func.isRequired
}

export default Dias;