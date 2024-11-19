

import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Register} from './pages/Register';
import { AddPokemonForm } from './pages/AddPokemon';
import {EditPokemon} from './pages/EditPokemon';

function App() {
 

  return (
   <div>
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/register' element={<Register></Register>}/>
      <Route path='/pokemon/add' element={<AddPokemonForm></AddPokemonForm>}/>
      <Route path='/pokemon/:id/edit' element={<EditPokemon></EditPokemon>}/>
    </Routes>
   </div>
  )
}

export default App
