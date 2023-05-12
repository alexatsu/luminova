export const imagesStyles = {
  container: {
    position: "relative",
    transition: "all 0.15s ease-in-out",
    opacity: 0.97,

    ":hover": { transform: "scale(0.99)", opacity: 1 },
    ":hover .MuiTypography-root": {
      color: "#ededed",
      backgroundColor: "#141414",
    },
    ":hover .delete": { opacity: 1 },
  },
  title: {
    position: "absolute",
    color: "transparent",
    zIndex: "1",
    bottom: "10px",
    transition: "all 0.15s linear",
    padding: "0 5px",
    wordBreak: "break-word",
    margin: '5px'
  },
};
