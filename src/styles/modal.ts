import { navstyles } from "./navbar";

export const modalStyles = {
  container: {
    position: "absolute",
    top: "50%",
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

export const authModalStyles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalWrapper: {
    backgroundColor: modalStyles.container.backgroundColor,
    padding: "0.75rem 1.2rem",
    borderRadius: ".5rem",
    display: "flex",
    flexDirection: "column",
    minWidth: "65%",
  },
  inputsWrapper: {
    display: "flex",
    gap: ".5rem",
    padding: ".5rem 0",
    flexDirection: "column",
  },
  modalFooter: {
    display: "flex",
    flexDirection: "column",
    gap: ".5rem",
  },
  submitBtn: {
    // ...navstyles.btnAddPhoto,
    color: navstyles.btnAddPhoto.color,
    ":hover": { color: "#000" },
    background: "transparent",
    width: "100%",
    fontSize: ".9rem",
  },
  changeModalBtn: {
    color: navstyles.btnAddPhoto.color,
    background: "transparent",
    ":hover": { color: "#000", background: "transparent" },
  },
};
