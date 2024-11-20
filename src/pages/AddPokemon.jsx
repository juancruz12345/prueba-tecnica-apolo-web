
import { useState } from 'react'
import { Form, Button, Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { usePokemons } from '../hooks/usePokemons'
import '../styles/EditCreateForm.css'

export function AddPokemonForm() {
  const [name, setName] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const navigate = useNavigate()
  const { loadCustomPokemons } = usePokemons()
  const [showErrorImg, setShowErrorImg] = useState(false)
  const [showErrorName, setShowErrorName] = useState(false)

  const [validated, setValidated] = useState(false);

 
  const handleChangeName = (e) => {
    setName(e.currentTarget.value)
    setShowErrorName(false)
  }

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
    setShowErrorImg(false)
  }

  const handleSubmit = (e) => {

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    e.preventDefault()
    if (!imageFile) {
      setShowErrorImg(true)
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const newPokemon = {
        id: Date.now(),
        name,
        imageUrl: reader.result,
        isCustom: true
      }
      
      const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) || []
      const nombreValido = customPokemons.filter((e)=>e.name===newPokemon.name)
      
      if(nombreValido.length>0){
        setShowErrorName(true)
        
        return
      }
      else if(nombreValido.length==0){
        customPokemons.push(newPokemon)
      localStorage.setItem('customPokemons', JSON.stringify(customPokemons))
      loadCustomPokemons()
      navigate('/')
      }
    
    }
    reader.readAsDataURL(imageFile)
  }
    
  

  return (
   <div>
    <Header></Header>
    <Container className="mt-4">
      <h1 className="text-center mb-4">Agregar nuevo Pokémon</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className='form-pokemon'>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Escribe el nombre del pokémon" 
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
          <Form.Label>Imagen</Form.Label>
          <Form.Control 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </Form.Group>
        {imagePreview && (
          <div className="mb-3">
            <Image src={imagePreview} alt="Preview" thumbnail style={{ maxWidth: '200px' }} />
          </div>
        )}
        <Button variant="primary" type="submit" id='btn-save'>
          Guardar
        </Button>
      </Form>
       {
        showErrorName 
        ?
        <span>Ese nombre ya existe</span>
        :
        <></>

       }
       {
        showErrorImg
        ?
        <span>Debes subir una imagen para tu pokémon</span>
        :
        <></>

       }
    </Container>
    
   </div>
  )
}