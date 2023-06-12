export const navstyles = {
  container: {
    zIndex: "2",
    top: 0,
    position: "sticky",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 15px",
    width: "100%",
    height: "50px",
    backgroundColor: "#ffffff",
  },
  logo: {
    margin: "5px 20px 0px 0px",
    "@media (max-width: 568px)": {
      display: "none",
    },
    pointerEvents: "none",
  },
  searchInput: {
    ":hover": { border: "transparent" },
    ":focus": { border: "1px solid #e0e0e0" },
    "& .MuiInput-underline:before": { borderBottom: "transparent" },
    "& .MuiInputBase-root:after": { borderBottom: "1px solid #767676" },
    alignSelf: "flex-end",
  },
  btnAddPhoto: {
    ":hover": { backgroundColor: "white", color: "black" },
    color: "grey",
    marginBottom: "-5px",
    transition: "color 0.2s ease-in-out",
    textTransform: "none",
    whiteSpace: "nowrap",
    display: "inline-block",
    boxSizing: "border-box",
    padding: "10px 15px",
  },
};
