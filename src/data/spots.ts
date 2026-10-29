// milan-study-spots — replace/verify details as you visit them
export type SpotType = "library" | "café" | "coworking" | "campus";
export type Spot = {
  name: string;
  type: SpotType;
  neighborhood: string;
  address: string;
  traits: string[];        // quiet | outlets | good coffee | group-friendly | outdoor | open late
  noise: 1 | 2 | 3 | 4 | 5; // 5 = liveliest
  price: "free" | "€" | "€€" | "€€€";
  hours: string;
  bestFor: string;
  insider: string;         // your voice — drafts below, edit freely
  photo: string;           // image path — you shoot these
};

export const spots: Spot[] = [
  {
    name: "Biblioteca Nazionale Braidense",
    type: "library", neighborhood: "Brera",
    address: "Via Brera 28",
    traits: ["quiet", "beautiful", "historic"],
    noise: 1, price: "free",
    hours: "Mon–Fri 8:30–18:15, Sat 8:30–13:30 (verify)",
    bestFor: "Deep, silent focus in one of Italy's most beautiful reading rooms",
    insider: "Pair it with a pre-study espresso in Brera before the tourist crowd arrives.",
    photo: "/images/braidense.jpg",
  },
  {
    name: "Biblioteca Centrale di Architettura (PoliMi)",
    type: "campus", neighborhood: "Città Studi — Campus Leonardo",
    address: "Via Bonardi, Politecnico di Milano",
    traits: ["quiet", "outlets", "open late", "student energy"],
    noise: 2, price: "free",
    hours: "Extended hours; 24h experiment during exam periods (book ahead)",
    bestFor: "Exam-season marathons when everything else is full",
    insider: "Book a seat in exam weeks — this is the first university library in Milan that went 24/7.",
    photo: "/images/polimi-bcl.jpg",
  },
  {
    name: "Biblioteca Comunale Sormani",
    type: "library", neighborhood: "Porta Venezia",
    address: "Via Sormani 4",
    traits: ["quiet", "outlets", "free", "wifi"],
    noise: 1, price: "free",
    hours: "Check current civic-library hours (they change seasonally)",
    bestFor: "Milan's main civic library — big reading rooms, reliable wifi",
    insider: "The reading rooms fill fast in the afternoons; mornings are calmest.",
    photo: "/images/sormani.jpg",
  },
  {
    name: "Fondazione Feltrinelli",
    type: "library", neighborhood: "Porta Volta",
    address: "Viale Pasubio 5",
    traits: ["quiet", "wifi", "beautiful", "coffee nearby"],
    noise: 2, price: "free",
    hours: "Verify — varies with exhibition calendar",
    bestFor: "An inspiring research space designed by Herzog & de Meuron",
    insider: "The building alone is worth the trip; the reading spaces overlook the courtyard.",
    photo: "/images/feltrinelli.jpg",
  },
  {
    name: "The Seed Milano",
    type: "coworking", neighborhood: "Porta Romana",
    address: "Verify current address",
    traits: ["outlets", "wifi", "group-friendly", "coffee"],
    noise: 3, price: "€€",
    hours: "Verify",
    bestFor: "Long sessions in a café-coworking hybrid built for laptops",
    insider: "The study-club crowd here is serious — you'll see the same faces every week.",
    photo: "/images/the-seed.jpg",
  },
  {
    name: "Combo Milano",
    type: "coworking", neighborhood: "Navigli",
    address: "Vigevano area, Navigli",
    traits: ["wifi", "books", "peaceful", "outdoor"],
    noise: 2, price: "€€",
    hours: "Verify",
    bestFor: "Studying surrounded by bookshelves, then a canal-side break",
    insider: "Golden hour on the Naviglio right outside is the built-in reward.",
    photo: "/images/combo.jpg",
  },
  {
    name: "Pavé",
    type: "café", neighborhood: "Porta Venezia",
    address: "Via Cesare Battisti 21",
    traits: ["good coffee", "wifi", "pastries"],
    noise: 3, price: "€",
    hours: "Verify",
    bestFor: "A productive morning with genuinely excellent pastries",
    insider: "The pastry counter is the break you earn — order before you sit down.",
    photo: "/images/pave.jpg",
  },
  {
    name: "Gogol & Company",
    type: "café", neighborhood: "Centro",
    address: "Via Savona 5",
    traits: ["quiet-ish", "bookstore", "laptop friendly"],
    noise: 2, price: "€€",
    hours: "Verify",
    bestFor: "Bookstore-café calm in the middle of town",
    insider: "Browse the shelves during your break — it's the point of the place.",
    photo: "/images/gogol.jpg",
  },
  {
    name: "Sala Studio Via Venezian 15",
    type: "library", neighborhood: "Porta Venezia / Statale",
    address: "Via Venezian 15",
    traits: ["quiet", "free", "open to everyone"],
    noise: 1, price: "free",
    hours: "Mon–Fri, roughly 8:15–19:00 (verify)",
    bestFor: "A free public study hall run by the university — no student card needed",
    insider: "The rare free study hall open to non-enrolled students; arrive early for a desk.",
    photo: "/images/venezian.jpg",
  },
  {
    name: "oTTo",
    type: "café", neighborhood: "Navigli",
    address: "Navigli area",
    traits: ["wifi", "laptop friendly", "free water"],
    noise: 3, price: "€€",
    hours: "Verify",
    bestFor: "Laptop work rated laptop-friendly by the community, with free refills",
    insider: "Community-rated 71% laptop-friendly — go off-peak for the good tables.",
    photo: "/images/otto.jpg",
  },
];

// ——— helpers (no need to edit) ———
export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const getSpot = (slug: string) => spots.find((s) => slugify(s.name) === slug);
export const featuredSpots = spots.slice(0, 3);
