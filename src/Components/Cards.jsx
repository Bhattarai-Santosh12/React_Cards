import { useEffect, useState } from "react";
import PokemonCards from "./PokemonCards";

export default function Cards() {

    const [pokemon, setPokemon] = useState([])
    const [loaading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const API= 'https://pokeapi.co/api/v2/pokemon?limit=100'

   

    const fetchAPI= async () => {
        try{
            const response= await fetch(API)
            const data= await response.json()
            const detailedPokemonData= await Promise.all(
            data.results.map(async (currPokemon)=>{
                const response= await fetch(currPokemon.url)
                const data= await response.json()
                
                return data;
            }));
            setPokemon(detailedPokemonData);
            const detailedResponse=Promise.all(detailedPokemonData)
            console.log(detailedResponse)
            setLoading(false)
        }
        catch(error){
            console.log(error)
            setLoading(false)
            setError(error)
        }
        
    }

    useEffect(() => {
        fetchAPI()
    }, [])

    if(loaading){
        return <h1 className="text-2xl font-bold flex justify-center">Loading...</h1>
    }

    if(error){
        return <h1 className="text-2xl font-bold flex justify-center">Error: {error.message}</h1>
    }
  return (
    <>
    <section className="container mx-auto">
                <header>
                    <h1 className="text-center text-4xl font-bold mt-5">Pokemon Cards</h1>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pokemon.map((currPokemon) => {
                        return <PokemonCards key={currPokemon.id} currPokemon={currPokemon} />
                    })}
                </div>
            </section>
    </>
  );
}