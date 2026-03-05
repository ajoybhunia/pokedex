import { filterPokemon, getDistinctTypes } from "./scripts/utility.js";
import { renderPage } from "./scripts/render.js";
import { fetchAllPokemon } from "./scripts/fetch.js";

window.onload = async () => {
  const sidebarContainer = document.querySelector(".sidebar");

  const allPokemon = await fetchAllPokemon();

  const types = getDistinctTypes(allPokemon);
  types.unshift("all");

  renderPage(types, "all", allPokemon, sidebarContainer);

  sidebarContainer.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedType = e.target.dataset.type;

    const filtered = filterPokemon(selectedType, allPokemon);

    renderPage(types, selectedType, filtered, sidebarContainer);
  });
};
