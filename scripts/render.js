import { createFragment } from "./create_fragment.js";
import { pokemonCardTemplate, sidebarTemplate } from "./template.js";

const clear = (element) => (element.innerHTML = "");

const renderCards = (allPokemon, container) => {
  clear(container);

  allPokemon.forEach((pokemon) =>
    container.append(createFragment(pokemonCardTemplate(pokemon)))
  );
};

const renderSidebar = (types, container, type) => {
  clear(container);

  sidebarTemplate(types, type).forEach((template) =>
    container.append(createFragment(template))
  );
};

export const renderPage = (types, type, allPokemon, sidebarContainer) => {
  const cardsContainer = document.querySelector(".cards");

  renderSidebar(types, sidebarContainer, type);
  renderCards(allPokemon, cardsContainer);
};
