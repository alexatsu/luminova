import { Container, ImageList } from "@mui/material";
import ImageCard from "../components/ImageCard";

export default function Main() {
  return (
    <Container sx={{ marginTop: "100px" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        <ImageCard />
      </ImageList>
    </Container>
  );
}
