import { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { SearchIcon } from '../icons';
import '../styles/SearchBar.css'

export function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <Form className='form'>
      <InputGroup>
        <Form.Control
         
          type="text"
          placeholder="Busca un pókemon por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    
      </InputGroup>
     
         <div className='search-button' onClick={handleSubmit}>
         <SearchIcon className='search-button-icon'></SearchIcon>
         </div>
        
    </Form>
  )
}