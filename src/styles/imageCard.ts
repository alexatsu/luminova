export const imagesStyles = {
  container: {
    position: "relative",
    ":hover .MuiTypography-root": { color: "#ededed", backgroundColor: "#141414" },
    transition: "all 0.15s ease-in-out",
    opacity: 0.97,
    ":hover": { transform: "scale(0.99)", opacity: 1 },
  },
  title: {
    position: "absolute",
    color: "transparent",
    zIndex: "1",
    bottom: "10px",
    left: "7px",
    transition: "all 0.15s linear",
    padding: "0 5px",
  },
};