import { getDistinctTypes, toCapitalize } from "./utility.js";

const addCardsToTemplate = (cards, types) => `
<!DOCTYPE html>
<html>

<head>
  <title>Pokedex</title>
  <link rel="stylesheet" href="/style.css">
</head>

<body>
  <div class="display">
    <div class="sidebar">
      ${types}
    </div>

    <div class="cards">
    ${cards}
    </div>
  </div>

</body>

</html>
`;

const generateTypes = (types) => {
  return types.map((t) => `
              <div class="${t.toLowerCase()} type">
                <p>${toCapitalize(t)}</p>
              </div>
  `).join("");
};

const TO_SHOW = [
  "weight",
  "base XP",
  "hp",
  "attack",
  "defense",
  "speed",
];

const generateTableRow = (stats) => {
  const rows = [];

  TO_SHOW.forEach((each) => {
    if (each in stats) {
      rows.push(`
                <tr>
                  <td class="col1">${toCapitalize(each)}</td>
                  <td class="col2">${stats[each]}</td>
                </tr>
    `);
    }
  });

  return rows.join("");
};

const generateCard = (details) => {
  return `
        <div class="card">
        <div class="image-container">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${details.id}.png"
            alt="${details.name}">
        </div>

        <div class="description">

          <div class="name-heading">
            <div class="items">
              <h4>${toCapitalize(details.name)}</h4>
            </div>

            <div class="items">
              ${generateTypes(details.types)}
            </div>
          </div>

          <section>
            <table class="table">
              <tbody>
                ${generateTableRow(details.stats)}
              </tbody>
            </table>
          </section>

        </div>
      </div>
  `;
};

const generateSidebarContent = (types, fileName, type) => {
  return types.map((t, i) => {
    const tagId = t.toLowerCase() === type.toLowerCase() ? t.toLowerCase() : "";

    return `
    <a href="/${fileName[i]}.html" class="category" id="${tagId}">${
      toCapitalize(t)
    }</a>
    `;
  }).join("");
};

const generateCards = (pokemons) =>
  pokemons.map((pokemon) => generateCard(pokemon)).join("");

const writeContent = async (filePath, content) => {
  await Deno.writeTextFile(`./${filePath}.html`, content);
};

const generatePage = (cards, types, type) => {
  const sideBarContent = ["all", ...types];
  const pageNames = ["index", ...types];

  const categories = generateSidebarContent(sideBarContent, pageNames, type);
  return addCardsToTemplate(cards, categories);
};

const createHomePage = async (cards, types) => {
  const content = generatePage(cards, types, "all");
  await writeContent("index", content);
};

const createOtherPages = async (types, allPokemons) => {
  for (const type of types) {
    const pokemons = [];

    for (const pokemon of allPokemons) {
      if (pokemon.types.includes(type)) pokemons.push(pokemon);
    }

    const cards = generateCards(pokemons);
    const content = generatePage(cards, types, type);

    await writeContent(type, content);
  }
};

export const generateScript = async () => {
  const content = await Deno.readTextFile("./pokemons.json");
  const allPokemons = await JSON.parse(content);

  const cards = generateCards(allPokemons);
  const types = getDistinctTypes(allPokemons);

  await createHomePage(cards, types);
  await createOtherPages(types, allPokemons);
};
