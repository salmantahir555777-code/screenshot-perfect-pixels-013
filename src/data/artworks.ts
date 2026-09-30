import lahoreDusk from "@/assets/art-lahore-dusk.jpg";
import silentPortrait from "@/assets/art-silent-portrait.jpg";
import abstractQuiet from "@/assets/art-abstract-quiet.jpg";
import punjabFields from "@/assets/art-punjab-fields.jpg";
import crimsonStillLife from "@/assets/art-crimson-still-life.jpg";
import lahoreAfterRain from "@/assets/art-lahore-after-rain.jpg";
import gardenInBloom from "@/assets/art-garden-in-bloom.jpg";
import mughalShadows from "@/assets/art-mughal-shadows.jpg";
import beyondHorizon from "@/assets/art-beyond-horizon.jpg";
import sufiEvening from "@/assets/art-sufi-evening.jpg";
import elderPortrait from "@/assets/art-elder-portrait.jpg";
import tealDupatta from "@/assets/art-teal-dupatta.jpg";
import craftsman from "@/assets/art-craftsman.jpg";

export type Orientation = "portrait" | "landscape" | "square";

export type Artwork = {
  id: number;
  slug: string;
  title: string;
  artist: string;
  artistSlug: string;
  category: string;
  medium: string;
  dimensions: string;
  size: "Small" | "Medium" | "Large" | "Oversized";
  price: number;
  year: number;
  availability: "Available" | "Sold" | "Commission";
  image: string;
  orientation: Orientation;
  description: string;
};

export const CATEGORIES = [
  "Abstract",
  "Portrait",
  "Landscape",
  "Still Life",
  "Floral",
  "Contemporary",
  "Classical",
  "Pakistani Art",
] as const;

export const MEDIUMS = ["Oil on Canvas", "Oil on Board", "Acrylic", "Mixed Media"] as const;
export const SIZES = ["Small", "Medium", "Large", "Oversized"] as const;
export const AVAILABILITIES = ["Available", "Sold", "Commission"] as const;

export const PRICE_BANDS = [
  { label: "Under PKR 50,000", min: 0, max: 50000 },
  { label: "PKR 50,000 – 100,000", min: 50000, max: 100000 },
  { label: "PKR 100,000 – 250,000", min: 100000, max: 250000 },
  { label: "PKR 250,000+", min: 250000, max: Number.MAX_SAFE_INTEGER },
];

export const artworks: Artwork[] = [
  {
    id: 1,
    slug: "whispers-of-lahore",
    title: "Whispers of Lahore",
    artist: "Ahmed Khan",
    artistSlug: "ahmed-khan",
    category: "Pakistani Art",
    medium: "Oil on Canvas",
    dimensions: "36 × 48 in",
    size: "Large",
    price: 285000,
    year: 2026,
    availability: "Available",
    image: lahoreDusk,
    orientation: "landscape",
    description:
      "Whispers of Lahore captures the quiet rhythm of the old city at dusk. Warm architectural tones meet soft atmospheric shadows, creating a contemplative portrait of Lahore's historic rooftops as the last light settles over the minarets.",
  },
  {
    id: 2,
    slug: "the-silent-portrait",
    title: "The Silent Portrait",
    artist: "Ayesha Malik",
    artistSlug: "ayesha-malik",
    category: "Portrait",
    medium: "Oil on Canvas",
    dimensions: "24 × 36 in",
    size: "Medium",
    price: 145000,
    year: 2025,
    availability: "Available",
    image: silentPortrait,
    orientation: "portrait",
    description:
      "A study in restraint. The sitter turns away from the viewer's gaze while the light holds her in place, painted in thin glazes over a warm umber ground in the tradition of classical portraiture.",
  },
  {
    id: 3,
    slug: "quiet-morning",
    title: "Quiet Morning",
    artist: "Sara Hussain",
    artistSlug: "sara-hussain",
    category: "Abstract",
    medium: "Oil on Canvas",
    dimensions: "40 × 50 in",
    size: "Large",
    price: 195000,
    year: 2026,
    availability: "Available",
    image: abstractQuiet,
    orientation: "portrait",
    description:
      "Broad planes of bone white and warm stone are interrupted by a single burnt sienna passage. Built with a palette knife over many sittings, the surface rewards close looking.",
  },
  {
    id: 4,
    slug: "punjab-fields",
    title: "Punjab Fields",
    artist: "Ali Raza",
    artistSlug: "ali-raza",
    category: "Landscape",
    medium: "Oil on Canvas",
    dimensions: "30 × 44 in",
    size: "Large",
    price: 175000,
    year: 2025,
    availability: "Available",
    image: punjabFields,
    orientation: "landscape",
    description:
      "Late harvest light across the plains, painted from studies made outside Kasur. The wheat is laid in with thick, confident strokes that catch real light on the canvas surface.",
  },
  {
    id: 5,
    slug: "crimson-still-life",
    title: "Crimson Still Life",
    artist: "Mariam Shah",
    artistSlug: "mariam-shah",
    category: "Still Life",
    medium: "Oil on Canvas",
    dimensions: "24 × 30 in",
    size: "Medium",
    price: 125000,
    year: 2025,
    availability: "Available",
    image: crimsonStillLife,
    orientation: "landscape",
    description:
      "Copper, linen and split pomegranates arranged in a single raking light. A contemporary reading of the Dutch still-life tradition, warmed by a South Asian table.",
  },
  {
    id: 6,
    slug: "lahore-after-rain",
    title: "Lahore After Rain",
    artist: "Ahmed Khan",
    artistSlug: "ahmed-khan",
    category: "Pakistani Art",
    medium: "Oil on Canvas",
    dimensions: "32 × 40 in",
    size: "Large",
    price: 320000,
    year: 2026,
    availability: "Available",
    image: lahoreAfterRain,
    orientation: "portrait",
    description:
      "Lantern light dissolves into wet stone in the walled city. The painting is almost entirely about reflection — the street becomes a second sky.",
  },
  {
    id: 7,
    slug: "garden-in-bloom",
    title: "Garden in Bloom",
    artist: "Mariam Shah",
    artistSlug: "mariam-shah",
    category: "Floral",
    medium: "Oil on Board",
    dimensions: "18 × 24 in",
    size: "Small",
    price: 78000,
    year: 2025,
    availability: "Available",
    image: gardenInBloom,
    orientation: "portrait",
    description:
      "Roses loosened almost to abstraction against a grey-green ground. Painted alla prima in a single afternoon while the flowers were still opening.",
  },
  {
    id: 8,
    slug: "mughal-shadows",
    title: "Mughal Shadows",
    artist: "Hamza Qureshi",
    artistSlug: "hamza-qureshi",
    category: "Classical",
    medium: "Oil on Canvas",
    dimensions: "44 × 56 in",
    size: "Oversized",
    price: 495000,
    year: 2026,
    availability: "Available",
    image: mughalShadows,
    orientation: "portrait",
    description:
      "Carved sandstone arches frame an empty courtyard at midday. Violet shadows cut across warm terracotta in long diagonals, holding the architecture in a suspended silence.",
  },
  {
    id: 9,
    slug: "beyond-the-horizon",
    title: "Beyond the Horizon",
    artist: "Sara Hussain",
    artistSlug: "sara-hussain",
    category: "Landscape",
    medium: "Oil on Canvas",
    dimensions: "28 × 52 in",
    size: "Large",
    price: 225000,
    year: 2026,
    availability: "Available",
    image: beyondHorizon,
    orientation: "landscape",
    description:
      "A seascape reduced to three tones of light. The horizon sits low, and almost nothing happens — which is precisely the intention.",
  },
  {
    id: 10,
    slug: "sufi-evening",
    title: "Sufi Evening",
    artist: "Ali Raza",
    artistSlug: "ali-raza",
    category: "Pakistani Art",
    medium: "Oil on Canvas",
    dimensions: "36 × 48 in",
    size: "Large",
    price: 385000,
    year: 2026,
    availability: "Available",
    image: sufiEvening,
    orientation: "landscape",
    description:
      "A shrine courtyard at dusk, lit by lantern and incense. Ochre robes turn in the half-light while the gathering holds still around them.",
  },
  {
    id: 11,
    slug: "old-city-at-dusk",
    title: "Old City at Dusk",
    artist: "Ahmed Khan",
    artistSlug: "ahmed-khan",
    category: "Pakistani Art",
    medium: "Oil on Canvas",
    dimensions: "24 × 36 in",
    size: "Medium",
    price: 165000,
    year: 2024,
    availability: "Sold",
    image: lahoreDusk,
    orientation: "landscape",
    description:
      "An earlier treatment of the walled-city skyline, painted from a rooftop near Delhi Gate in the last twenty minutes of light.",
  },
  {
    id: 12,
    slug: "monsoon-memories",
    title: "Monsoon Memories",
    artist: "Ayesha Malik",
    artistSlug: "ayesha-malik",
    category: "Contemporary",
    medium: "Mixed Media",
    dimensions: "30 × 40 in",
    size: "Large",
    price: 148000,
    year: 2025,
    availability: "Available",
    image: lahoreAfterRain,
    orientation: "portrait",
    description:
      "Rain as memory rather than weather. Layers of oil and pigment are wiped back until the street beneath resurfaces only in fragments.",
  },
  {
    id: 13,
    slug: "golden-hour",
    title: "Golden Hour",
    artist: "Ali Raza",
    artistSlug: "ali-raza",
    category: "Landscape",
    medium: "Oil on Board",
    dimensions: "16 × 24 in",
    size: "Small",
    price: 62000,
    year: 2024,
    availability: "Available",
    image: punjabFields,
    orientation: "landscape",
    description:
      "A small field study kept deliberately unfinished at the edges, where the board still shows through the paint.",
  },
  {
    id: 14,
    slug: "the-blue-room",
    title: "The Blue Room",
    artist: "Sara Hussain",
    artistSlug: "sara-hussain",
    category: "Abstract",
    medium: "Acrylic",
    dimensions: "36 × 36 in",
    size: "Medium",
    price: 132000,
    year: 2025,
    availability: "Available",
    image: abstractQuiet,
    orientation: "portrait",
    description:
      "An interior remembered rather than observed: geometry softened by repeated washes until the room becomes atmosphere.",
  },
  {
    id: 15,
    slug: "light-through-the-window",
    title: "Light Through the Window",
    artist: "Mariam Shah",
    artistSlug: "mariam-shah",
    category: "Still Life",
    medium: "Oil on Canvas",
    dimensions: "20 × 26 in",
    size: "Small",
    price: 95000,
    year: 2026,
    availability: "Available",
    image: crimsonStillLife,
    orientation: "landscape",
    description:
      "Morning light crosses a table of copper and cloth. The subject is ordinary; the light is not.",
  },
  {
    id: 16,
    slug: "the-old-courtyard",
    title: "The Old Courtyard",
    artist: "Hamza Qureshi",
    artistSlug: "hamza-qureshi",
    category: "Classical",
    medium: "Oil on Canvas",
    dimensions: "34 × 42 in",
    size: "Large",
    price: 275000,
    year: 2025,
    availability: "Available",
    image: mughalShadows,
    orientation: "portrait",
    description:
      "A haveli courtyard drawn in perspective and then dissolved in heat. Architecture becomes a pretext for studying reflected light on stone.",
  },
  {
    id: 17,
    slug: "evening-prayer",
    title: "Evening Prayer",
    artist: "Hamza Qureshi",
    artistSlug: "hamza-qureshi",
    category: "Pakistani Art",
    medium: "Oil on Canvas",
    dimensions: "40 × 54 in",
    size: "Oversized",
    price: 560000,
    year: 2026,
    availability: "Commission",
    image: sufiEvening,
    orientation: "landscape",
    description:
      "A large-format devotional scene available as a commissioned variation, scaled and toned for the collector's space.",
  },
  {
    id: 18,
    slug: "autumn-garden",
    title: "Autumn Garden",
    artist: "Ayesha Malik",
    artistSlug: "ayesha-malik",
    category: "Floral",
    medium: "Oil on Canvas",
    dimensions: "22 × 28 in",
    size: "Medium",
    price: 88000,
    year: 2025,
    availability: "Available",
    image: gardenInBloom,
    orientation: "portrait",
    description:
      "Late blooms past their peak, painted with affection for the moment just before the petals fall.",
  },
  {
    id: 19,
    slug: "city-of-stories",
    title: "City of Stories",
    artist: "Ahmed Khan",
    artistSlug: "ahmed-khan",
    category: "Contemporary",
    medium: "Mixed Media",
    dimensions: "48 × 60 in",
    size: "Oversized",
    price: 750000,
    year: 2026,
    availability: "Available",
    image: lahoreDusk,
    orientation: "landscape",
    description:
      "The artist's largest work to date: a panoramic, layered reading of Lahore built from dozens of rooftop studies made over three years.",
  },
  {
    id: 20,
    slug: "forgotten-streets",
    title: "Forgotten Streets",
    artist: "Ali Raza",
    artistSlug: "ali-raza",
    category: "Portrait",
    medium: "Oil on Board",
    dimensions: "18 × 24 in",
    size: "Small",
    price: 45000,
    year: 2024,
    availability: "Sold",
    image: silentPortrait,
    orientation: "portrait",
    description:
      "A quiet head study made in the artist's first year in Lahore, painted on salvaged board from a carpenter's shop in Anarkali.",
  },
  {
    id: 21,
    slug: "the-keeper",
    title: "The Keeper",
    artist: "Ayesha Malik",
    artistSlug: "ayesha-malik",
    category: "Portrait",
    medium: "Oil on Canvas",
    dimensions: "26 × 36 in",
    size: "Medium",
    price: 168000,
    year: 2026,
    availability: "Available",
    image: elderPortrait,
    orientation: "portrait",
    description:
      "An elder of the walled city, painted over eleven sittings in thin umber glazes. The wool shawl carries most of the painting; the face holds it still.",
  },
  {
    id: 22,
    slug: "teal-dupatta",
    title: "Teal Dupatta",
    artist: "Ayesha Malik",
    artistSlug: "ayesha-malik",
    category: "Portrait",
    medium: "Oil on Canvas",
    dimensions: "28 × 34 in",
    size: "Medium",
    price: 185000,
    year: 2026,
    availability: "Available",
    image: tealDupatta,
    orientation: "portrait",
    description:
      "The sitter turns her gaze just past the viewer, wrapped in a teal dupatta against a dark ground. Painted in slow glazes, the cloth worked wet-into-wet.",
  },
  {
    id: 23,
    slug: "the-carpenter",
    title: "The Carpenter",
    artist: "Hamza Qureshi",
    artistSlug: "hamza-qureshi",
    category: "Portrait",
    medium: "Oil on Canvas",
    dimensions: "30 × 38 in",
    size: "Medium",
    price: 215000,
    year: 2025,
    availability: "Available",
    image: craftsman,
    orientation: "portrait",
    description:
      "A Anarkali woodworker at his bench under a single lamp, shavings pooled around the chisel. Painted in the low-key light of the old Dutch workshop portraits.",
  },
  {
    id: 24,
    slug: "study-in-umber",
    title: "Study in Umber",
    artist: "Ali Raza",
    artistSlug: "ali-raza",
    category: "Portrait",
    medium: "Oil on Board",
    dimensions: "16 × 22 in",
    size: "Small",
    price: 58000,
    year: 2025,
    availability: "Available",
    image: elderPortrait,
    orientation: "portrait",
    description:
      "A single-sitting head study in two tones of umber, kept deliberately loose at the shoulders where the board still shows through.",
  },
];

export const formatPKR = (value: number) =>
  `PKR ${new Intl.NumberFormat("en-PK").format(value)}`;

export const getArtwork = (slug: string) => artworks.find((a) => a.slug === slug);
