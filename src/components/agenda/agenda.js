import { 
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Menu from '../../utils/page/menu';

function Agenda() {

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed - 1 * 24 * 60 * 60 * 1000);

    return ( 
<div>
            <Menu />
            <Container 
                fluid="md">
                <Row>
                    <Col >
                        {today.toUTCString()}
                    </Col>
                </Row>
            </Container>
        </div> 
    );
}

export default Agenda;