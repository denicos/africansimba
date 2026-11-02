// The bottles on /drinks. Add, remove or reorder bottles here; the page updates itself.
// Images live in public/images/drinks/.
// The homepage Martell showcase also uses MARTELL_BOTTLES, in this order.

export type Bottle = {
  name: string;
  image: string;
  alt: string;
  description: string;
  width?: number; // Real image size, used by the homepage Martell showcase.
  height?: number;
};

export const MARTELL_BOTTLES: Bottle[] = [
  {
    name: "Martell VS",
    image: "martell-vs2.jpg",
    width: 430,
    height: 648,
    alt: "Bottle of Martell VS cognac on a marble table beside a glass on ice",
    description: "Fresh and fruity single-distillery cognac. Great neat, on ice or in a long drink.",
  },
  {
    name: "Martell VSOP",
    image: "martell-vsop2.jpg",
    width: 433,
    height: 636,
    alt: "Bottle of Martell VSOP cognac against swirling gold and blue light",
    description: "Smooth and rounded, with ripe fruit and gentle oak.",
  },
  {
    name: "Martell XO",
    image: "martell-xo.png",
    width: 674,
    height: 682,
    alt: "Bottle of Martell XO cognac with its arched shape",
    description: "Rich and elegant, with warm spice and a long finish.",
  },
  {
    name: "Martell XXO",
    image: "martell-xxo-cutout.webp", // martell-xxo.png with its white background removed, for dark panels
    width: 873,
    height: 748,
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
    name: "Johnnie Walker Blue Label",
    image: "blue-label.png",
    alt: "Johnnie Walker Blue Label whisky bottle beside its box",
    description: "Rare blended Scotch whisky, silky smooth with a long, smoky finish.",
  },
  {
    name: "Belaire Rosé",
    image: "belaire-rose.png",
    alt: "Black bottle of Belaire Rosé sparkling wine",
    description: "French sparkling rosé for the celebration table.",
  },
];
