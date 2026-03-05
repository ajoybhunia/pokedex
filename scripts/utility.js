export const toCapitalize = (word) => {
  return word ? `${word[0].toUpperCase()}${word.slice(1)}` : "";
};

export const getDistinctTypes = (pokemons) => {
  const set = new Set();

  pokemons.forEach((pokemon) => {
    pokemon.types.forEach((type) => set.add(type));
  });

  return [...set];
};

export const filter = (type, allPokemon) =>
  type === "all"
    ? allPokemon
    : allPokemon.filter((p) => p.types.includes(type));
