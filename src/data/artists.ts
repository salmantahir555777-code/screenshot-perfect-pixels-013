import { artworks } from "./artworks";
import ahmedKhanPortrait from "@/assets/artist-ahmed-khan.jpg";
import ayeshaMalikPortrait from "@/assets/artist-ayesha-malik.jpg";
import saraHussainPortrait from "@/assets/artist-sara-hussain.jpg";
import aliRazaPortrait from "@/assets/artist-ali-raza.jpg";
import hamzaQureshiPortrait from "@/assets/artist-hamza-qureshi.jpg";
import mariamShahPortrait from "@/assets/artist-mariam-shah.jpg";

export type Artist = {
  slug: string;
  name: string;
  style: string;
  location: string;
  bio: string;
  philosophy: string;
  exhibitions: string[];
  portrait: string;
};

export const artists: Artist[] = [
  {
    slug: "ahmed-khan",
    name: "Ahmed Khan",
    style: "Urban landscape, atmospheric realism",
    location: "Lahore, Pakistan",
    bio: "Ahmed Khan has painted the walled city for over two decades, working from rooftops at the two hours of the day he considers worth painting. His canvases treat Lahore as a single, continuous subject.",
    philosophy:
      "A city is not its monuments. It is the light between them, and the light changes faster than anyone builds.",
    exhibitions: [
      "Alhamra Art Gallery, Lahore — 2024",
      "Canvas Gallery, Karachi — 2022",
      "South Asian Modern, Dubai — 2021",
    ],
    portrait: ahmedKhanPortrait,
  },
  {
    slug: "ayesha-malik",
    name: "Ayesha Malik",
    style: "Portraiture, contemporary figuration",
    location: "Lahore, Pakistan",
    bio: "Trained at the National College of Arts, Ayesha Malik paints sitters she knows well, often over many months. Her portraits are built in thin glazes and rarely meet the viewer's eye.",
    philosophy: "A portrait should keep something back. That is what makes it worth returning to.",
    exhibitions: ["Sanat Initiative, Karachi — 2025", "NCA Alumni Show, Lahore — 2023"],
    portrait: ayeshaMalikPortrait,
  },
  {
    slug: "sara-hussain",
    name: "Sara Hussain",
    style: "Abstraction, reductive landscape",
    location: "Islamabad, Pakistan",
    bio: "Sara Hussain works in large planes of muted colour, building surfaces with a palette knife until the paint itself carries the image. Her recent work moves between abstraction and seascape.",
    philosophy: "I remove until only the feeling of the place is left.",
    exhibitions: ["Tanzara Gallery, Islamabad — 2026", "Koel Gallery, Karachi — 2024"],
    portrait: saraHussainPortrait,
  },
  {
    slug: "ali-raza",
    name: "Ali Raza",
    style: "Rural landscape, plein air",
    location: "Kasur, Pakistan",
    bio: "Ali Raza paints almost exclusively outdoors across rural Punjab, finishing most works in a single session. The unfinished edges of his boards are deliberate.",
    philosophy: "The field will not wait for you to be careful.",
    exhibitions: ["Ejaz Art Gallery, Lahore — 2025", "Punjab Landscape Survey — 2023"],
    portrait: aliRazaPortrait,
  },
  {
    slug: "hamza-qureshi",
    name: "Hamza Qureshi",
    style: "Architectural and classical painting",
    location: "Lahore, Pakistan",
    bio: "Hamza Qureshi studies Mughal architecture as a draughtsman before he paints it, then allows heat and shadow to dissolve the drawing underneath.",
    philosophy: "Measure first. Then forget the measurements.",
    exhibitions: ["Lahore Biennale Associated Programme — 2024", "Full Circle Gallery — 2022"],
    portrait: hamzaQureshiPortrait,
  },
  {
    slug: "mariam-shah",
    name: "Mariam Shah",
    style: "Still life and floral painting",
    location: "Lahore, Pakistan",
    bio: "Mariam Shah works from a north-facing studio with a single window, painting copper, cloth and flowers in raking light. Her still lifes are small, slow and precisely observed.",
    philosophy: "Everything ordinary becomes serious under the right light.",
    exhibitions: ["O Art Space, Lahore — 2025", "Still Life Now, Islamabad — 2023"],
    portrait: mariamShahPortrait,
  },
];

export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);

export const artworksByArtist = (slug: string) =>
  artworks.filter((a) => a.artistSlug === slug);
