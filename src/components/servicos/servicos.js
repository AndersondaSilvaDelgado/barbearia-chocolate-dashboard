import {
    useState,
    useEffect,
} from 'react';
import Menu from '../../utils/page/menu';
import TabelaServicos from './page/tabela-servicos';
import EditarServico from './action/editar-servico';
import CadastrarServico from './action/cadastrar-servico';
import { 
    Container,
    Row,
    Col,
    Modal,
    Button
} from 'react-bootstrap';
import axios from 'axios';
import Servico from '../../models/servico.model';
import * as constants from '../../utils/constants/constants';

function Servicos() {

    const URL_LISTAR_SERVICOS = constants.URL_BASE + constants.SERVICO;

    const [exibirTabela, setExibirTabela] = useState(true);
    const [exibirEditar, setExibirEditar] = useState(false);
    const [exibirCadastrar, setExibirCadastrar] = useState(false);
    const [servicos, setServicos] = useState([]);
    const [carregarServicos, setCarregarServicos] = useState(true);
    const [servico, setServico] = useState(new Servico());
    const [carregarServico, setCarregarServico] = useState(false);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordenar, setOrdenar] = useState(0);
    const [filtro, setFiltro] = useState('');
    const [countPage, setCountPage] = useState(3);
    const [totalItems, setTotalItems] = useState(0);
    const [messagem, setMessagem] = useState('');
    const [exibirModalErro, setExibirModalErro] = useState(false);

    useEffect(() => {

        async function obterServicos(){
            try{
                let ordem = '';
                if(ordenar === 1){
                    ordem = 'id ASC';
                } else if(ordenar === 2){
                    ordem = 'id DESC';
                } else if(ordenar === 3){
                    ordem = 'nome ASC';
                } else if(ordenar === 4){
                    ordem = 'nome DESC';
                } 
                const params = `?page=${paginaAtual}&countpage=${countPage}&order=${ordem}&filter=${filtro}`;
                let { data } = await axios.get(URL_LISTAR_SERVICOS + params);
                if(data.status==='success'){
                    setServicos(data.data);
                    setTotalItems(parseInt(data.count));
                } else {
                    setMessagem(data.response);
                    setExibirModalErro(true);
                }
            } catch(err){
                setServicos([]);
                setMessagem(err.message);
                setExibirModalErro(true);
            }
        }

        if(carregarServicos){
            obterServicos();
            setCarregarServicos(false);
        }
    }, [carregarServicos, paginaAtual, countPage, ordenar, filtro]);

    function handleExibirTabela(){
        setExibirTabela(true);
        setExibirEditar(false);
        setExibirCadastrar(false);
    }

    function handleExibirCadastrar(){
        setExibirCadastrar(true);
        setExibirTabela(false);
        setExibirEditar(false);
        setCarregarServico(true);
    }

    function handleExibirEditar(servico){
        setServico(servico);
        setCarregarServico(true);
        setExibirEditar(true);
        setExibirTabela(false);
        setExibirCadastrar(false);
    }

    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina);
        setCarregarServicos(true);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    return ( 
        <div>
            <Menu />
            <Container 
                fluid="md">
                <Row>
                    <Col >
                        <TabelaServicos
                            visivel={exibirTabela}
                            handleExibirCadastrar={handleExibirCadastrar}
                            handleExibirEditar={handleExibirEditar}
                            servicos={servicos}
                            setRecarregarServicos={setCarregarServicos}
                            totalItems={totalItems} 
                            paginaAtual={paginaAtual} 
                            handleMudarPagina={handleMudarPagina}
                            countPage={countPage}
                            setCountPage={setCountPage}
                            filtro={filtro}
                            setFiltro={setFiltro}
                            ordenar={ordenar}
                            setOrdenar={setOrdenar}/>
                        <CadastrarServico
                            visivel={exibirCadastrar}
                            handleExibirTabela={handleExibirTabela}
                            setRecarregarServicos={setCarregarServicos}
                            carregarServico={carregarServico} 
                            setCarregarServico={setCarregarServico}/>
                        <EditarServico
                            visivel={exibirEditar}
                            handleExibirTabela={handleExibirTabela}
                            setRecarregarServicos={setCarregarServicos}
                            servico={servico}
                            carregarServico={carregarServico} 
                            setCarregarServico={setCarregarServico}/>
                    </Col>
                </Row>
            </Container>
            <Modal 
                show={exibirModalErro} 
                onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Erro
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao buscar Servicos: {messagem}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="warning"
                        onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div> 
     );
}

export default Servicos;