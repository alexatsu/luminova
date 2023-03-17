import { ImageList, ImageListItem } from "@mui/material";
import Container from "@mui/material/Container";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";

import patient from "../src/assets/images/patient.jpg";
import bubbles from "../src/assets/images/bubbles.jpg";
import river from "../src/assets/images/river.jpg";
import sunset from "../src/assets/images/sunset.jpg";

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "100px" }}>
        <ImageList variant="masonry" cols={3} gap={8}>
          <ImageListItem>
            <img src={patient} width="350px" alt="patient" loading="lazy" />
          </ImageListItem>
          <ImageListItem>
            <img src={bubbles} width="350px" alt="bubbles" loading="lazy" />
          </ImageListItem>
          <ImageListItem>
            <img src={river} width="350px" alt="river" loading="lazy" />
          </ImageListItem>
          <ImageListItem>
            <img src={sunset} width="350px" alt="river" loading="lazy" />
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
