import { 
    Container,
    Navbar,
    Nav,
} from 'react-bootstrap';

function Menu() {
    return ( 
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="/">TEB Software</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                    <Nav>
                        <Nav.Link href="/">Agenda</Nav.Link>
                        <Nav.Link href="/horarios">Horario</Nav.Link>
                        <Nav.Link href="/usuarios">Usuario</Nav.Link>
                        <Nav.Link href="/servicos">Servico</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;