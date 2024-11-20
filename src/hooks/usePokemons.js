import { useState, useEffect, useCallback } from "react";
import { buscarListaPokemons } from "../services/buscarPokemons";

export function usePokemons(){

    const [pokemons, setPokemons] = useState([])
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const loadCustomPokemons = useCallback(() => {
     
      const customPokemons = JSON.parse(localStorage.getItem('customPokemons')) || []
      setPokemons(prevPokemons => [...prevPokemons, ...customPokemons])
    }, [])
  
    useEffect(() => {
      const fetchData = async () => {
        await buscarListaPokemons(setPokemons, setTotalPages)
        loadCustomPokemons()
      }
      fetchData()
    }, [loadCustomPokemons])

      useEffect(() => {
        const filtered = pokemons.filter(pokemon => 
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPokemons(filtered)
        setTotalPages(Math.ceil(filtered.length / 50))
      }, [searchTerm, pokemons])

     
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      }

      const handleSearch = (term) => {
        setSearchTerm(term)
        setCurrentPage(1)
      };

      return{filteredPokemons,currentPage, totalPages, handlePageChange, handleSearch, loadCustomPokemons}
}