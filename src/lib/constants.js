export const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },

  {
    name: "Resources",
    dropdown: true,
    items: [
      {
        name: "Knowledge Center",
        link: "/knowledge-center",
      },
      {
        name: "Success Stories",
        link: "/success-stories",
      },
    ],
  },

  { name: "Pricing", link: "/pricing" },
  { name: "Contact", id: "contact" },
];
