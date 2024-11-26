const PokemonCards = ({ currPokemon }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-10 grid grid-cols-1">
        <img
          src={currPokemon.sprites.front_default}
          alt={currPokemon.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-center text-center bg-green-500 px-4 py-1 rounded-md">
            <p className="text-white text-sm flex-grow">
              {currPokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
          <h2 className="text-xl font-bold mb-2">{currPokemon.name}</h2>
          <p className="text-gray-700">Type: {currPokemon.types.map((type) => type.type.name).join(", ")}</p>
          <p className="text-gray-700">Height: {currPokemon.height}</p>
          <p className="text-gray-700">Weight: {currPokemon.weight}</p>
          <p className="text-gray-700">Abilities: {currPokemon.abilities.map((ability) => ability.ability.name).join(", ")}</p>
        </div>
      </div>
    );
  };
  
  export default PokemonCards;