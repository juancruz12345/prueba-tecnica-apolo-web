import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/Login.css'

export function Login(){

    
    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [showErrorUsername, setShowErrorUsername] = useState(false)
    const [showErrorContraseña, setShowErrorContraseña] = useState(false)
   
    const handleChangeUsername = (e) => {

        setUsername(e.currentTarget.value)
        setShowErrorUsername(false)
       }
    const handleChangeContraseña = (e) => {
        setContraseña(e.currentTarget.value)
        setShowErrorContraseña(false)
       }

    const handleSubmit = (e) => {
        e.preventDefault()
        const usuarioActual = {username:username, contraseña:contraseña}
        let usuarios = JSON.parse(window.localStorage.getItem('users'))
        let usernameValido = usuarios.filter((e)=>e.username === usuarioActual.username)
        if(usernameValido.length>0)
        {
          
          setShowErrorUsername(false)
            let contraseñaValida = usernameValido[0].contraseña === usuarioActual.contraseña
            if(contraseñaValida){
                window.localStorage.setItem('user', JSON.stringify(usuarioActual))
                navigate('/')
            }else{
              setShowErrorContraseña(true)
              return
            }
        }
        else{
          setShowErrorUsername(true)
          return
        }
        
        
    }
    
    return(
       <div className="div-container-form">
         <div className="container-form">
          
          <h1>Login</h1>

      <Form className="form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label className="label">Usuario</Form.Label>
        <Form.Control className="input"  onChange={handleChangeUsername} required placeholder="Usuario" minLength={3} />
        <Form.Control.Feedback type="invalid" className="feedback">
              El nombre de usuario debe tener almenos 3 caracteres.
            </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="label">Contraseña</Form.Label>
        <Form.Control className="input" onChange={handleChangeContraseña} required minLength={6}/>
        <Form.Control.Feedback type="invalid" className="feedback">
              La contraseña debe tener almenos 6 caracteres.
            </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" >Iniciar sesion</Button>
    </Form>

    <Button onClick={()=>{navigate('/register')}}>Ir a registro</Button>

    {
        showErrorUsername
        ?
        <span>Ese nombre de usuario no existe</span>
        :
        <></>
      }
      {
        showErrorContraseña
        ?
        <span>La contraseña es incorrecta</span>
        :
        <></>
      }

      </div>
       </div>
    )
}