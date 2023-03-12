import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "30px" }}>
        <Grid
          columns={3}
          justifyContent={"center"}
          gap={2}
          container
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Grid item style={{ backgroundColor: "#ffedd5", width: "300px", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "300px", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "300px", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "300px", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "300px", height: "350px" }}>
            Hello World
          </Grid>
          <Grid item style={{ backgroundColor: "#ffedd5", width: "300px", height: "350px" }}>
            Hello World
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
