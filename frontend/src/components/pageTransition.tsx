// pageTransitions.ts

export const pageVariants = {
  initial: (direction: boolean) => ({
    opacity: 0,
    x: direction ? "20%" : "-20%",
  }),
  in: {
    opacity: 1,
    x: 0,
  },
  out: (direction: boolean) => ({
    opacity: 0,
  }),
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.15,
};
