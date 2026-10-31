// The bottles on /drinks. Add, remove or reorder bottles here; the page updates itself.
// Images live in public/images/drinks/.

export type Bottle = {
  name: string;
  image: string;
  alt: string;
  description: string;
};

export const MARTELL_BOTTLES: Bottle[] = [
  {
    name: "Martell VS",
    image: "martell-vs.png",
    alt: "Close-up of the Martell VS Single Distillery cognac label",
    description: "Fresh and fruity single-distillery cognac. Great neat, on ice or in a long drink.",
  },
  {
    name: "Martell VSOP",
    image: "martell-vsop.png",
    alt: "Two bottles of Martell VSOP cognac tied with a blue ribbon",
    description: "Smooth and rounded, with ripe fruit and gentle oak.",
  },
  {
    name: "Martell XO",
    image: "martell-xo.png",
    alt: "Bottle of Martell XO cognac with its arched shape",
    description: "Rich and elegant, with warm spice and a long finish.",
  },
  {
    name: "Martell XXO",
    image: "martell-xxo.png",
    alt: "Martell Chanteloup XXO cognac bottle beside its silver gift box",
    description: "Martell Chanteloup XXO. Bold, deep and made for the big occasion.",
  },
];

export const OTHER_BOTTLES: Bottle[] = [
  {
    name: "Don Julio Reposado",
    image: "don-julio-reposado.png",
    alt: "Bottle of Don Julio Reposado tequila",
    description: "Oak-aged tequila, soft with caramel and vanilla.",
  },
  {
    name: "Don Julio 1942",
    image: "don-julio-1942.png",
    alt: "Tall bottle of Don Julio 1942 tequila beside its box",
    description: "Luxury añejo tequila, rich and smooth.",
  },
  {
    name: "Clase Azul Plata",
    image: "clase-azul-plata.png",
    alt: "Clase Azul Plata tequila in a white and blue hand-painted decanter",
    description: "Crisp, clean tequila in a hand-painted ceramic decanter.",
  },
  {
    name: "Johnnie Walker Black Label",
    image: "black-label.png",
    alt: "Johnnie Walker whisky bottle beside its box",
    description: "Blended Scotch whisky, aged 12 years. Smoky and smooth.",
  },
  {
    name: "Belaire Rosé",
    image: "belaire-rose.png",
    alt: "Black bottle of Belaire Rosé sparkling wine",
    description: "French sparkling rosé for the celebration table.",
  },
];
