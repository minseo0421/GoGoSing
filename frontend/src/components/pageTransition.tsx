<<<<<<< HEAD
// pageTransitions.ts
export const pageVariants = {
=======
export const PageVariants = {
>>>>>>> ee2a4b0b0a8c9b0e906ca50c0edc5957d7aff78b
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

export const PageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.15,
};
