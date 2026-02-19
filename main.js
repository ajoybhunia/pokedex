import { getPokemons } from "./script/fetch.js";
import { generateScript } from "./script/script.js";

const main = async (count) => {
  const pokemons = await getPokemons(count);
  await Deno.writeTextFile("./pokemons.json", pokemons);
  await generateScript();
};

await main(1025);
