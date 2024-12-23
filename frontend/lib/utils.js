export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const spotlightVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.6,
    },
  },
};
export const trimmedContent = (content, maxLength = 20) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
};
export const cardVariants = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const infoVariants = {
  initial: {
    y: 300,
    opacity: 0,
  },
  hover: {
    y: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

export const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export const textVariants = {
  initial: { opacity: 0, y: 20 },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.3,
    },
  },
};

export const genres = {
  Action:
    "https://i.pinimg.com/736x/87/9a/ed/879aed8db6ac29b8475bb5804a96fc71.jpg",
  Adventure:
    "https://i.pinimg.com/736x/f4/d8/98/f4d8982f4fa8f8266623b3e69792f9c9.jpg",
  Cars: "https://i.pinimg.com/736x/a4/b2/93/a4b29356ad9b79ea8834163e31375c6d.jpg",
  Comedy:
    "https://i.pinimg.com/736x/5f/f2/63/5ff26300942c851f366c7c1d882efdd8.jpg",
  Dementia:
    "https://i.pinimg.com/736x/59/aa/c9/59aac9439870f1e045037386320e8af9.jpg",
  Drama:
    "https://i.pinimg.com/736x/6d/15/a3/6d15a3b8b54bd0d806185505d58a17c3.jpg",
  Ecchi:
    "https://i.pinimg.com/736x/8c/ed/f6/8cedf606ca0ea1f47aa9e61100ed8ec0.jpg",
  Fantasy:
    "https://i.pinimg.com/736x/83/6b/55/836b553049d3474d11060fe312d6dffb.jpg",
  Game: "https://i.pinimg.com/736x/3a/d0/a7/3ad0a7736f777ebdeba65f5ae4978b91.jpg",
  Harem:
    "https://i.pinimg.com/736x/f5/43/a6/f543a60a044da25f98e74a1c8bf2fcbc.jpg",
  Historical:
    "https://i.pinimg.com/736x/4f/21/94/4f219440dd4e975ffd35253585ce8f5f.jpg",
  Horror:
    "https://i.pinimg.com/736x/33/46/26/334626234b08f39747cd8012137486d5.jpg",
  Isekai:
    "https://i.pinimg.com/736x/23/1a/14/231a14e65e915c32f7212f077032ce7c.jpg",
  Josei:
    "https://i.pinimg.com/736x/87/5b/4f/875b4fb82c44a038466807b0dcf884cc.jpg",
  Kids: "https://i.pinimg.com/736x/c3/27/ba/c327ba4a6ac9b5f4b2a03e843ebf7aa5.jpg",
  Magic:
    "https://i.pinimg.com/736x/18/86/52/1886521e6bb263c60a9d99ec634e4836.jpg",
  "Martial Arts":
    "https://i.pinimg.com/736x/db/2e/65/db2e658f5f93756fb21cbc7074cc1d37.jpg",
  Mecha:
    "https://i.pinimg.com/736x/f9/80/a3/f980a3ea73ccb30b8043ae8e039f065d.jpg",
  Military:
    "https://i.pinimg.com/736x/ce/56/a9/ce56a9709ad9aff513ae04d7a6d7b0e0.jpg",
  Music:
    "https://i.pinimg.com/736x/f3/23/b7/f323b7e0128e889944591a06870ccbbc.jpg",
  Mystery:
    "https://i.pinimg.com/736x/c0/fb/4c/c0fb4c9f9188256cb3e026b4278ddf27.jpg",
  Parody:
    "https://i.pinimg.com/736x/f2/02/14/f202143591ccdf2d5ad3614307fad0d1.jpg",
  Police:
    "https://i.pinimg.com/736x/12/5e/0f/125e0f22e8c2976161fceb320bdd0476.jpg",
  Psychological:
    "https://i.pinimg.com/736x/d2/ac/b9/d2acb90f9534d210f3221935aa620d20.jpg",
  Romance:
    "https://i.pinimg.com/736x/17/4d/8f/174d8f755155d45b3ea266863ee367e2.jpg",
  Samurai:
    "https://i.pinimg.com/736x/5d/de/77/5dde77f0a2c1c90427b6b6e94dbf70ab.jpg",
  School:
    "https://i.pinimg.com/736x/d0/58/e5/d058e58349917189e96be9b10e4b51e7.jpg",
  "Sci-Fi":
    "https://i.pinimg.com/736x/32/b1/6c/32b16c17af79508bd3e1e3698a0ee2f3.jpg",
  Seinen:
    "https://i.pinimg.com/736x/8a/4c/d6/8a4cd6bc174eb96b2c56b6c7bae88ed6.jpg",
  Shoujo:
    "https://i.pinimg.com/736x/ec/f1/3e/ecf13e869151b4c29ea6b63048a05d4a.jpg",
  "Shoujo Ai":
    "https://i.pinimg.com/736x/88/db/17/88db17502a7f768fdffc1011249e1a34.jpg",
  Shounen:
    "https://i.pinimg.com/736x/24/2c/f5/242cf5d38575f6e17f2a495fef811d6e.jpg",
  "Shounen Ai":
    "https://i.pinimg.com/736x/55/d9/c5/55d9c54d810120b4af4f8665a93ebe23.jpg",
  "Slice of Life":
    "https://i.pinimg.com/736x/4c/14/b6/4c14b617507833ffb530864aa62e502c.jpg",
  Space:
    "https://i.pinimg.com/736x/16/70/f7/1670f77dc8efc4ae2a892c8e0c8d57d0.jpg",
  Sports:
    "https://i.pinimg.com/736x/38/29/31/3829311458e04d501aae6671a2ba824d.jpg",
  "Super Power":
    "https://i.pinimg.com/736x/4e/df/3a/4edf3af2742439ee351b649fb69fde14.jpg",
  Supernatural:
    "https://i.pinimg.com/736x/e7/fa/49/e7fa496c43b8fdc8e20fec9cea9e5e33.jpg",
  Thriller:
    "https://i.pinimg.com/736x/84/93/37/849337776a440e1baf7978b347e4a276.jpg",
  Vampire:
    "https://i.pinimg.com/736x/32/b5/95/32b59570fb106d44cf9f193ae247fabd.jpg",
};
