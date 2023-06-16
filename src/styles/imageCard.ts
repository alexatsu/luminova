export const imagesStyles = {
  container: {
    position: "relative",
    "& img": {
      transition: "all 0.15s ease-in-out",
    },
    "&:hover img": {
      filter: ({ active }: { active: boolean }) => (active ? "brightness(90%)" : "none"), // apply filter based on active state
      transition: "all 0.15s ease-in-out",
    },
    "&:hover button": {
      opacity: 1,
    },
    "&:hover .title": {
      opacity: 1,
    },
  },
  buttonHeart: {
    borderRadius: "5px",
    width: "3rem",
    maxHeight: "100%",
    height: "2.25rem",
    backgroundColor: "#d9d8d8",
    "&:hover": { backgroundColor: "#f2f2f2" },
    "& svg": { fill: "grey" },
    position: "absolute",
    right: "10px",
    top: "10px",
  }, //TODO switch to sass
  buttonHeartActive: {
    borderRadius: "5px",
    width: "3rem",
    height: "2.25rem",
    backgroundColor: "rgb(231, 76, 76)",
    "&:hover": { backgroundColor: "rgb(200, 65, 65)" },
    "& svg": { fill: "#d9d8d8" },
    position: "absolute",
    right: "10px",
    top: "10px",
  },
  downloadButton: {
    borderRadius: "5px",
    height: "2.25rem",
    width: "3rem",
    position: "absolute",
    right: "10px",
    bottom: "20px",
    backgroundColor: "#d9d8d8",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },

  title: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0,
    color: "white",
    zIndex: "1",
    bottom: "10px",
    transition: "all 0.15s linear",
    padding: "0 5px",
    wordBreak: "break-word",
    margin: "5px",
  },
};
