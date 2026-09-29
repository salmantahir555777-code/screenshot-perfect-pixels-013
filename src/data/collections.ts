import lahoreDusk from "@/assets/art-lahore-dusk.jpg";
import silentPortrait from "@/assets/art-silent-portrait.jpg";
import abstractQuiet from "@/assets/art-abstract-quiet.jpg";
import punjabFields from "@/assets/art-punjab-fields.jpg";
import crimsonStillLife from "@/assets/art-crimson-still-life.jpg";
import lahoreAfterRain from "@/assets/art-lahore-after-rain.jpg";
import gardenInBloom from "@/assets/art-garden-in-bloom.jpg";
import mughalShadows from "@/assets/art-mughal-shadows.jpg";

export type Collection = {
  name: string;
  category: string;
  blurb: string;
  image: string;
};

export const collections: Collection[] = [
  {
    name: "Abstract",
    category: "Abstract",
    blurb: "Surface, weight and silence.",
    image: abstractQuiet,
  },
  {
    name: "Portraits",
    category: "Portrait",
    blurb: "Faces held in quiet light.",
    image: silentPortrait,
  },
  {
    name: "Landscapes",
    category: "Landscape",
    blurb: "Fields, water and open distance.",
    image: punjabFields,
  },
  {
    name: "Still Life",
    category: "Still Life",
    blurb: "Copper, cloth and slow observation.",
    image: crimsonStillLife,
  },
  {
    name: "Contemporary",
    category: "Contemporary",
    blurb: "New voices, layered surfaces.",
    image: lahoreAfterRain,
  },
  {
    name: "Traditional",
    category: "Floral",
    blurb: "The enduring subjects, freshly painted.",
    image: gardenInBloom,
  },
  {
    name: "Pakistani Art",
    category: "Pakistani Art",
    blurb: "Lahore, Punjab and the Sufi evening.",
    image: lahoreDusk,
  },
  {
    name: "Classical",
    category: "Classical",
    blurb: "Mughal architecture and measured light.",
    image: mughalShadows,
  },
];
