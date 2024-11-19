import { ToastContainer, Toast } from "react-bootstrap"

export function ToastComponent({show, setShow, msg}){

  return(
    <ToastContainer position='bottom-center' style={{ zIndex: 1 }}>
      <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
        <Toast.Body>{msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

