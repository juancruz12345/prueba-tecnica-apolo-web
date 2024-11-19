import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles/Login.css'

export function Login(){

    
    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [contraseña, setContraseña] = useState('')
   
    const handleChangeUsername = (e) => {
      
        setUsername(e.currentTarget.value)
       }
    const handleChangeContraseña = (e) => {
        setContraseña(e.currentTarget.value)
       }

    const handleSubmit = (e) => {
        e.preventDefault()
        const usuarioActual = {username:username, contraseña:contraseña}
        let usuarios = JSON.parse(window.localStorage.getItem('users'))
        let usernameValido = usuarios.filter((e)=>e.username === usuarioActual.username)
        if(usernameValido)
        {
            let contraseñaValida = usernameValido[0].contraseña === usuarioActual.contraseña
            if(contraseñaValida){
                window.localStorage.setItem('user', JSON.stringify(usuarioActual))
                navigate('/')
            }
        }
        return
        
    }
    
    return(
       <div className="div-container-form">
         <div className="container-form">
          
          <h1>Login</h1>

      <Form className="form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label className="label">Usuario</Form.Label>
        <Form.Control className="input"  onChange={handleChangeUsername} required placeholder="Usuario" minLength={3} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="label">Contraseña</Form.Label>
        <Form.Control className="input" onChange={handleChangeContraseña} required minLength={6}/>
      </Form.Group>
      <Button type="submit" >Iniciar sesion</Button>
    </Form>

    <Button onClick={()=>{navigate('/register')}}>Ir a registro</Button>

      </div>
       </div>
    )
}