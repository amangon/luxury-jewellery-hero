/**
 * Central content source for the home page sections that are still
 * editorial/marketing copy rather than live catalogue data (trust
 * features, testimonials, Instagram gallery). Categories, featured
 * pieces, best sellers, and new arrivals are now fetched live from
 * the backend API — see ShopByCategory, FeaturedCollections,
 * BestSellers, and NewArrivals.
 */

export const FEATURES = [
  {
    id: "feat-1",
    title: "Certified Diamonds",
    description: "Every stone is independently graded and certified before setting.",
    icon: "gem",
  },
  {
    id: "feat-2",
    title: "Lifetime Craftsmanship Warranty",
    description: "Complimentary repairs and resizing for as long as you own the piece.",
    icon: "shield",
  },
  {
    id: "feat-3",
    title: "Insured Worldwide Shipping",
    description: "Every order arrives fully insured, tracked, and discreetly packaged.",
    icon: "truck",
  },
  {
    id: "feat-4",
    title: "Private Consultations",
    description: "Book a one-to-one session with a jewellery specialist, in-store or virtual.",
    icon: "sparkle",
  },
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Meera Kapoor",
    role: "Verified Buyer",
    quote:
      "The Aurora ring arrived exactly as photographed, and the craftsmanship is even better in person. It's become the piece I reach for every day.",
    rating: 5,
  },
  {
    id: "test-2",
    name: "Simone Achebe",
    role: "Verified Buyer",
    quote:
      "I ordered the Éclat necklace for my anniversary and the packaging alone felt like an occasion. The stone catches light beautifully.",
    rating: 5,
  },
  {
    id: "test-3",
    name: "Priya Nair",
    role: "Verified Buyer",
    quote:
      "Their consultation call helped me choose between two settings I couldn't decide on. The team clearly knows the craft.",
    rating: 5,
  },
];

export const INSTAGRAM_POSTS = [
  { id: "ig-1", image: "https://images.unsplash.com/photo-1611591437281-460914d3f7ac?auto=format&fit=crop&w=500&q=80" },
  { id: "ig-2", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=500&q=80" },
  { id: "ig-3", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=500&q=80" },
  { id: "ig-4", image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=500&q=80" },
  { id: "ig-5", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80" },
  { id: "ig-6", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=500&q=80" },
];
