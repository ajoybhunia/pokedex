const getTypes = (types) => types.map((t) => t.type.name);

const getStats = (stats) => {
  const attributes = ["special-attack", "special-defense"];
  const required = stats.filter((s) => !(attributes.includes(s.stat.name)));

  const filteredStats = {};

  for (const s of required) {
    filteredStats[s.stat.name] = s.base_stat;
  }

  return filteredStats;
};

const getDetail = async (url) => {
  const response = await fetch(url);
  const { id, name, weight, base_experience, types, stats } = await response
    .json();

  const categories = getTypes(types);
  const filteredStats = getStats(stats);
  filteredStats["weight"] = weight;
  filteredStats["base XP"] = base_experience;

  return { id, name, types: categories, stats: filteredStats };
};

const getDetails = async (url) => {
  const response = await fetch(url);
  const { results } = await response.json();

  const pokemons = await Promise.all(
    results.map(async (result) => await getDetail(result.url)),
  );

  return JSON.stringify(pokemons);
};

export const getPokemons = async (count) => {
  return await getDetails(
    `https://pokeapi.co/api/v2/pokemon?limit=${count}&offset=0`,
  );
};
