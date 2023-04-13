export const navstyles = {
  container: {
    zIndex: "1",
    top: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 20px",
    width: "100%",
    height: "50px",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.25)",
    backgroundColor: "#ffffff",
  },
  logo: {
    margin: "5px 20px 0px 0px",
    "@media (max-width: 568px)": {
      display: "none",
    },
  },
  searchInput: {
    ":hover": { border: "transparent" },
    ":focus": { border: "1px solid #e0e0e0" },
    "& .MuiInput-underline:before": { borderBottom: "transparent" },
    "& .MuiInputBase-root:after": { borderBottom: "1px solid #767676" },
    alignSelf: "flex-end",
  },
  btnAddPhoto: {
    backgroundColor: "white",
    color: "#767676",
    ":hover": { backgroundColor: "white", color: "black" },
    height: "30px",
    fontSize: "12px",
    alignSelf: "center",
    transition: "all 0.15s ease-in-out",
    "@media (max-width: 568px)": {
      fontSize: "10px",
    },
  },
  authBtn: function () {
    return {
      ...this.btnAddPhoto,
      fontSize: ".85rem",
      fontWeight: "bold",
      width: "2.5rem",
      ":hover": {},
      "@media(hover:hover)": {
        ":hover": this.btnAddPhoto[":hover"],
      },
    };
  },
};
