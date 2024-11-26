import { useEffect, useState } from "react";
import PokemonCards from "./PokemonCards";

export default function Cards() {
  const [pokemon, setPokemon] = useState([]);
  const [loaading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=100";

  const fetchAPI = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      const detailedPokemonData = await Promise.all(
        data.results.map(async (currPokemon) => {
          const response = await fetch(currPokemon.url);
          const data = await response.json();

          return data;
        })
      );
      setPokemon(detailedPokemonData);
      const detailedResponse = Promise.all(detailedPokemonData);
      console.log(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // search functionility
  const searchData = pokemon.filter((currPokemon) => {
    return currPokemon.name.toLowerCase().includes(search.toLowerCase());
  });

  if (loaading) {
    return (
      <h1 className="text-2xl font-bold flex justify-center">Loading...</h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-2xl font-bold flex justify-center">
        Error: {error.message}
      </h1>
    );
  }
  return (
    <>
      <section className="container mx-auto">
        <header>
          <h1 className="text-center text-4xl font-bold mt-5 mb-3">
            Pokemon Cards
          </h1>
        </header>

        <form class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchData.map((currPokemon) => {
            return (
              <PokemonCards key={currPokemon.id} currPokemon={currPokemon} />
            );
          })}
        </div>
      </section>
    </>
  );
}
