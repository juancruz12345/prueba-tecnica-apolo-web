import { Button, Form } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastComponent } from "../components/ToastComponent"
import '../styles/Login.css'

export function Register(){

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [contraseña, setContraseña] = useState('')

    const usuarios = JSON.parse(window.localStorage.getItem('users')) || []

    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false);
    const [showError, setShowError] = useState(false)
   
    const handleChangeUsername = (e) => {
      
     setUsername(e.currentTarget.value)
     setShowError(false)
    }
    const handleChangeContraseña = (e) => {
     setContraseña(e.currentTarget.value)
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()

        const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
        
        const usuario = {username:username, contraseña:contraseña}
        const nombreExistente = usuarios.find(user => user.username === usuario.username)
        if(nombreExistente!==undefined){
          setShowError(true)
          
        }
        else{
        setShowError(false)
        usuarios.push(usuario)
        window.localStorage.setItem('users', JSON.stringify(usuarios))
        setShow(true)
        setTimeout(()=>{
          navigate('/login')
        },2000)
        }
    }
    
    return(
       <div className="div-container-form">
         <div className="container-form">
            
            <h1>Registro</h1>

        <Form validated={validated} noValidate className="form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label className="label">Usuario</Form.Label>
          <Form.Control  className="input"  onChange={handleChangeUsername} required placeholder="Usuario" minLength={3}/>
          <Form.Control.Feedback type="invalid" className="feedback">
              El nombre de usuario debe tener almenos 3 caracteres.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="label">Contraseña</Form.Label>
          <Form.Control className="input"  onChange={handleChangeContraseña} required minLength={6}/>
          <Form.Control.Feedback type="invalid" className="feedback">
              La contraseña debe tener almenos 6 caracteres.
            </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" >Registrarse</Button>
      </Form>


      <Button onClick={()=>{navigate('/login')}}>Ir al Login</Button>
      {
        showError
        ?
        <span>Ese nombre de usuario ya existe</span>
        :
        <></>
      }
      <ToastComponent show={show} setShow={setShow} msg={'El usuario se registro correctamente'}></ToastComponent>
      
        </div>
       </div>
    )
}