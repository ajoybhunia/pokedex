export const toCapitalize = (word) => {
  return word ? `${word[0].toUpperCase()}${word.slice(1)}` : "";
};

export const getDistinctTypes = (pokemons) => {
  const distinct = [];

  for (const pokemon of pokemons) {
    for (const type of pokemon.types) {
      if (!(distinct.includes(type))) distinct.push(type);
    }
  }

  return distinct;
};
