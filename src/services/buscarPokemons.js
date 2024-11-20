export async function buscarListaPokemons(setPokemons,setTotalPages){

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`)
        const data = await response.json()
        setPokemons(data.results)
        setTotalPages(Math.ceil(data.results.length / 50))
      } catch (error) {
        console.error('Error fetching Pokemon:', error)
      }
    
    
}