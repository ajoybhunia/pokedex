import { toCapitalize } from "./utility.js";

const getRows = (stats) =>
  Object.entries(stats).map(([stat, value]) => [
    "tr",
    {},
    [
      ["td", { class: "col1" }, [toCapitalize(stat)]],
      ["td", { class: "col2" }, [String(value)]],
    ],
  ]);

const statsTemplate = (stats) => [
  "section",
  {},
  [
    [
      "table",
      { class: "table" },
      [
        ["tbody", {}, getRows(stats)],
      ],
    ],
  ],
];

const getPokemonTypes = (types) =>
  types.map((type) => [
    "div",
    { class: `type ${type}` },
    [
      ["p", {}, [toCapitalize(type)]],
    ],
  ]);

const getTypesField = (types) => [
  "div",
  { class: "items" },
  getPokemonTypes(types),
];

const getName = (name) => [
  "div",
  { class: "items" },
  [
    ["h4", {}, [toCapitalize(name)]],
  ],
];

const getHeading = (pokemon) => [
  "div",
  { class: "name-heading" },
  [
    getName(pokemon.name),
    getTypesField(pokemon.types),
  ],
];

const getDescription = (pokemon) => [
  "div",
  { class: "description" },
  [
    getHeading(pokemon),
    statsTemplate(pokemon.stats),
  ],
];

const getImage = (pokemon) => [
  "div",
  { class: "image-container" },
  [
    ["img", { src: pokemon.imgSrc, alt: pokemon.name }, []],
  ],
];

export const pokemonCardTemplate = (pokemon) => [
  "div",
  { class: "card" },
  [
    getImage(pokemon),
    getDescription(pokemon),
  ],
];

export const sidebarTemplate = (types, currType) =>
  types.map((type) => {
    const id = type === currType ? type : "";

    return [
      "a",
      { href: "#", class: "category", "data-type": type, id },
      [toCapitalize(type)],
    ];
  });
