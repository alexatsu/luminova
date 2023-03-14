import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "100px" }}>
        <Grid
          justifyContent={"center"}
          columns={3}
          gap={2}
          container
          spacing={2}
          sx={{ height: "100%", maxWidth: "900px", margin: "0 auto" }}
        >
          <Grid item style={{ backgroundColor: "#ffedd5", width: "30%", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "30%", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "30%", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "30%", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "30%", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "30%", height: "350px" }}>
            Hello World
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
