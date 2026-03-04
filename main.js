import { toCapitalize, getDistinctTypes } from "./script/utility.js";

const addImageContainer = (src, name) => {
  const imageContainer =  document.createElement('div');
  imageContainer.classList.add("image-container");

  const image = document.createElement("img");
  image.setAttribute("src", src)
  image.setAttribute("alt", name)

  imageContainer.appendChild(image);
  return imageContainer;
}

const addHeading = (pokemon) => {
  const nameHeading = document.createElement('div');
  nameHeading.classList.add("name-heading");

  const heading = document.createElement('div');
  heading.className = 'items';

  const h = document.createElement('h4');
  h.textContent = toCapitalize(pokemon.name);

  const types = document.createElement('div');
  types.className = 'items';

  pokemon.types.forEach(type => {
    const pokeType = document.createElement('div');
    pokeType.classList.add(type, 'type');

    const p = document.createElement('p');
    p.textContent = type;

    pokeType.append(p);
    types.append(pokeType);
  })

  heading.appendChild(h)

  nameHeading.append(heading, types)

  return nameHeading;
}

const addStat = (stats) => {
  const container = document.createElement('section');

  const table = document.createElement("table");
  table.className = 'table';

  const tbody = document.createElement('tbody');

  for(const stat in stats) {
    const tr = document.createElement('tr');

    const td1 = document.createElement('td');
    td1.className = 'col1';

    const td2 = document.createElement('td');
    td2.className = 'col2';

    td1.textContent = toCapitalize(stat);
    td2.textContent = stats[stat];

    tr.append(td1, td2);

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  container.appendChild(table);

  return container;
}

const addDescription = (pokemon) => {
  const description = document.createElement('div');
  description.classList.add("description");

  const heading = addHeading(pokemon);
  const desc = addStat(pokemon.stats);

  description.append(heading, desc);

  return description;
}


const addCard = (pokemon) => {
  const cards = document.querySelector(".cards");

  const card = document.createElement('div');
  card.classList.add('card');
  
  const imageContainer = addImageContainer(pokemon.imgSrc, pokemon.name)
  const description =  addDescription(pokemon)

  card.append(imageContainer, description);

  cards.appendChild(card);
};

const addSidebar = (pokemons) => {
  const sidebar = document.querySelector(".sidebar");

  const types = getDistinctTypes(pokemons);
  
  types.forEach(type => {
    const anchor = document.createElement('a');

    anchor.className = 'category';
    anchor.setAttribute('id', type);
    anchor.setAttribute('href', '#');
    
    anchor.textContent = type;

    sidebar.appendChild(anchor);
  })
}

const filterPokemons = (pokemons) => {

}

window.onload = async() => {

  const pokemons = await fetch('/pokemons.json').then(data => data.json());

  addSidebar(pokemons);

  pokemons.forEach(pokemon => {
    addCard(pokemon);
  })
};


// const createFragment = (tag, attrs, content) => {
//   const element = document.createElement(tag);
//   // const typeElements = 
// }

// window.onload = () => {
//   const data = [
//     'div',
//     []
//   ]
//   createFragment()
// }