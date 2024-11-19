

import { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'

export function EditPokemon({ params }) {
  const [name, setName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) || []
    const pokemon = customPokemons.find(p => p.id.toString() === id)
    if (pokemon) {
      setName(pokemon.name)
      setImageUrl(pokemon.imageUrl)
    }
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedPokemon = {
      id: parseInt(id),
      name,
      imageUrl,
      isCustom: true
    }
    const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) || []
    const updatedPokemons = customPokemons.map(p => p.id.toString() === id ? updatedPokemon : p)
    localStorage.setItem('customPokemons', JSON.stringify(updatedPokemons))
    navigate('/')
  }

  return (
   <div>
    <Header></Header>
     <Container className="mt-4">
      <h1 className="text-center mb-4">Editar Pokémon</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Pokémon name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control 
            type="url" 
            placeholder="Enter image URL" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar cambios
        </Button>
      </Form>
    </Container>
   </div>
  )
}