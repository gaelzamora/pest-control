export const backdropVariants = {
    visible: { opacity: 1},
    hidden: { opacity: 0 },
};

export const modalVariants = {
    hidden: {
      x: "100vw",
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      x: 0,
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 }
    },
  };

export const itemOpacity = {
    hidden: {
        opacity: 0,
        y: '20%'
    },
    visible: ({delay}: any) => ({
        opacity: 1,
        y: 0,
      transition: {
        delay,
        duration: 1
      }
    })
  }

  