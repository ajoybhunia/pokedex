export const toCapitalize = (word) => {
  return word ? `${word[0].toUpperCase()}${word.slice(1)}` : "";
};

export const getDistinctTypes = (pokemons) => {
  const set = new Set();
  pokemons.map((pokemon) => pokemon.types.map((type) => set.add(type)));

  return [...set];
};

export const filterPokemon = (type, allPokemon) =>
  type === "all"
    ? allPokemon
    : allPokemon.filter((p) => p.types.includes(type));
