import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Navbar from "./layouts/Navbar";

function App() {
  return (
    <Container sx={{ margin: "0 auto" }}>
      <Navbar />
      <Container>
        <Grid sx={{ height: "100%" }}>
          <div style={{ backgroundColor: "teal", width: "300px", height: "350px" }}>
            Hello World
          </div>
          <div style={{ backgroundColor: "teal", width: "300px", height: "350px" }}>
            Hello World
          </div>
          <div style={{ backgroundColor: "teal", width: "300px", height: "350px" }}>
            Hello World
          </div>
          <div style={{ backgroundColor: "teal", width: "300px", height: "350px" }}>
            Hello World
          </div>
          <div style={{ backgroundColor: "teal", width: "300px", height: "350px" }}>
            Hello World
          </div>
        </Grid>
      </Container>
    </Container>
  );
}

export default App;
