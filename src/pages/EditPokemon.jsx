

import { useState, useEffect } from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import '../styles/EditCreateForm.css'
import { usePokemons } from '../hooks/usePokemons'


export function EditPokemon() {
  const [name, setName] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const {loadCustomPokemons} = usePokemons()
  const [validated, setValidated] = useState(false)
  const [showErrorName, setShowErrorName] = useState(false)

  useEffect(() => {
    const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) || []
    const pokemon = customPokemons.find(p => p.id.toString() === id)
    if (pokemon) {
      setName(pokemon.name)
      setImagePreview(pokemon.imageUrl)
    }
  }, [id])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleChangeName = (e) => {
      setName(e.currentTarget.value)
      setShowErrorName(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    setValidated(true)

    if(e.currentTarget[0].value.length < 3){
      setShowErrorName(false)
      return
    }
    else if(e.currentTarget[0].value === ''){
      setShowErrorName(false)
      return
    }

    else if(e.currentTarget[0].value !== ''){
      const updatePokemon = () => {
        const updatedPokemon = {
          id: parseInt(id),
          name,
          imageUrl: imagePreview,
          isCustom: true
        }
        
        const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) || []
        const nombreValido = customPokemons.filter((e)=>e.name===updatedPokemon.name)
        
        if(nombreValido.length>0){
          setShowErrorName(true)
          
          return
        }
        else if(nombreValido.length==0){
        const updatedPokemons = customPokemons.map(p => p.id.toString() === id ? updatedPokemon : p)
        localStorage.setItem('customPokemons', JSON.stringify(updatedPokemons))
        loadCustomPokemons()
        navigate('/')
        }
      }
  
      if (imageFile) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
          updatePokemon()
        }
        reader.readAsDataURL(imageFile)
      } else {
        updatePokemon()
      }
    }
    
    
  }

  return (
   <div>
    <Header></Header>
     <Container className="mt-4">
      <h1 className="text-center mb-4">Editar Pokémon</h1>
      <Form validated={validated} noValidate className='form-pokemon' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Pokémon name" 
            value={name} 
            onChange={handleChangeName}
            required
            minLength={3}
          />
           <Form.Control.Feedback type="invalid">
            Escribe un nombre de almenos 3 caracteres
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
          {imagePreview && (
            <div className="mb-3">
              <Image src={imagePreview} alt="Vista previa" thumbnail style={{ maxWidth: '200px' }} />
            </div>
          )}
      
        <Button variant="primary" type="submit" id='btn-save'>
          Guardar cambios
        </Button>
      </Form>

      {
        showErrorName 
        ?
        <span>Ese nombre ya existe</span>
        :
        <></>

       }
       
    </Container>
   </div>
  )
}