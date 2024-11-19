import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Container, Row, Col, Pagination, Card, Button } from "react-bootstrap"
import '../styles/Home.css'
import { Header } from "../components/Header"
import { usePokemons } from "../hooks/usePokemons"
import { SearchBar } from "../components/SearchBar"


export function Home(){

    const [usuario, setUsuario] = useState(JSON.parse(window.localStorage.getItem('user')))
    const {filteredPokemons, currentPage, totalPages, handlePageChange, handleSearch, loadCustomPokemons} = usePokemons()
    
    const paginatedPokemons = filteredPokemons.slice((currentPage - 1) * 50, currentPage * 50);
    
    useEffect(() => {
      loadCustomPokemons()
    }, [loadCustomPokemons])
   
    return(
        <div>
            
           
            {
    usuario
    ? 
    <div>
        <Header></Header>
        <h1>Bienvenido {usuario.username}</h1>


      <Container className="my-4">
      <h1 className="text-center mb-4">Pokédex</h1>
      <SearchBar onSearch={handleSearch}></SearchBar>
      <Link to="/pokemon/add">
          <Button variant="success">Add New Pokémon</Button>
        </Link>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4" id='pokemons-container'>
        {paginatedPokemons.map((pokemon) => (
          <Col  key={pokemon.name}>
            <Card>
              <div className="card-img-container">
              {
                pokemon.isCustom
                ?
                <Card.Img
                className="pokemon-image"
                variant="top"
                src={pokemon.imageUrl}
                alt={pokemon.name}
                
              />
                :
                <Card.Img
                className="pokemon-image"
                variant="top"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
                alt={pokemon.name}
                
              />
              }
              </div>
              <Card.Body>
                <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
              </Card.Body>
              {pokemon.isCustom && (
                <Card.Footer className="text-center">
                  <Link to={`/pokemon/${pokemon.id}/edit`}>
                    <Button variant="primary" size="sm">
                      Editar
                    </Button>
                  </Link>
                </Card.Footer>
              )}
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
        </Pagination>
      </div>
    </Container>

                </div>

                : 
                
                <div>
                   
                    <h1>Debes loguearte para usar la pagina</h1>

                    <div className="div-links">
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/register'}>Registrarse</Link>
                    </div>
                </div>

            }


        </div>
    )
}