export const modalStyles = {
  container: {
    position: "absolute",
    top: "600%" /* temporarily */,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 220,
    "@media (max-width: 568px)": {
      width: 300,
      height: 220,
    },
    border: "1px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    backgroundColor: "#ededed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    cursor: "pointer",
    color: "#767676",
    transition: "all 0.15s ease-in-out",
    "&:hover": {
      color: "#000",
    },
  },
};