import { Navbar, Container, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import '../styles/Header.css'

export function Header(){

    const navigate = useNavigate()
    const cerrarSesion = () => {
        window.localStorage.removeItem('user')
        navigate('/login')
    }

    return(
        <header>
             <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/">PokeApi</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
          <Nav.Link onClick={cerrarSesion}>Cerrar sesion</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        </header>
    )
}