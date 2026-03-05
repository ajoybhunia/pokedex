export const fetchAllPokemon = async () =>
  fetch("/pokemons.json")
    .then((res) => res.json());
