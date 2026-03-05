import { createFragment } from "./create_fragment.js";
import { pokemonCardTemplate, sidebarTemplate } from "./template.js";

const clear = (element) => (element.innerHTML = "");

const renderCards = (allPokemon, container) => {
  clear(container);

  const cards = allPokemon.map((pokemon) =>
    createFragment(pokemonCardTemplate(pokemon))
  );

  container.append(...cards);
};

const renderSidebar = (types, container, type) => {
  clear(container);

  const pokeTypes = sidebarTemplate(types, type).map((template) =>
    createFragment(template)
  );

  container.append(...pokeTypes);
};

export const renderPage = (types, type, allPokemon, sidebarContainer) => {
  const cardsContainer = document.querySelector(".cards");

  renderSidebar(types, sidebarContainer, type);
  renderCards(allPokemon, cardsContainer);
};
