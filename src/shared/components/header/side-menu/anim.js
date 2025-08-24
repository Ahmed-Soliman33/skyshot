export const menuSlide = (direction = "ltr") => ({
  initial: {
    x: direction === "rtl" ? "calc(-100% - 100px)" : "calc(100% + 100px)",
    opacity: 0,
  },
  enter: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: direction === "rtl" ? "calc(-100% - 100px)" : "calc(100% + 100px)",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren",
    },
  },
});

export const curve = {
  initial: (height) => ({
    d: `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`,
  }),
  enter: (height) => ({
    d: `M100 0 L100 ${height} Q100 ${height / 2} 100 0`,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
  exit: (height) => ({
    d: `M100 0 L100 ${height} Q-100 ${height / 2} 100 0`,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

export const scale = {
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2, // كان 0.3
      ease: [0.76, 0, 0.24, 1],
    },
  },
  closed: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.3, // كان 0.4
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const backdrop = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.3 }, // كان 0.5
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }, // كان 0.3
  },
};

export const socialSlide = {
  initial: {
    y: 50,
    opacity: 0,
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4, // كان 0.6
      ease: [0.76, 0, 0.24, 1],
      delay: 0.2, // كان 0.4
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.3, // كان 0.4
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export const slide = (direction = "ltr") => ({
  initial: {
    x: direction === "rtl" ? -80 : 80,
    opacity: 0,
    y: 20,
  },
  enter: (i) => ({
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.03 * i,
    },
  }),
  exit: (i) => ({
    x: direction === "rtl" ? -80 : 80,
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.02 * i,
    },
  }),
});
