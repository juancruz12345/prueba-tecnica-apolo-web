import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { SearchIcon } from '../icons';
import '../styles/SearchBar.css'

export function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className='searchBar-div'>
      <Form className='form'>
      
       <div className='div-search-form'>
       <Form.Control
         className='input'
         type="text"
         placeholder="Busca un pókemon por nombre..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
       />
   
     
    
        <div className='search-button' onClick={handleSubmit}>
        <SearchIcon className='search-button-icon'></SearchIcon>
        </div>
       </div>
        
    </Form>
    </div>
  )
}