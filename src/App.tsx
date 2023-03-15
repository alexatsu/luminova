import { Grid, ImageList, ImageListItem } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
import img from "../src/assets/images/patient.jpg";
import bubbles from "../src/assets/images/bubbles.jpg";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "100px" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          <ImageListItem>
            <img src={img} width="350px" alt="patient" loading="lazy" />
          </ImageListItem>
          <ImageListItem>
            <img src={bubbles} width="350px" alt="patient" loading="lazy" />
          </ImageListItem>
          
          {/* {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))} */}
        </ImageList>
      </Container>
      <Footer />
    </>
  );
}
