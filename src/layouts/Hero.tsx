import { Container, ImageList } from "@mui/material";
import ImageCard from "../components/ImageCard";
import useResizeWidth from "../hooks/useResizeWidth";

export default function Hero() {
  const width = useResizeWidth();
  return (
    <Container sx={{ marginTop: "100px" }} >
      <ImageList variant="masonry" cols={width > 568 ? 3 : 1} gap={8}>
        <ImageCard />
      </ImageList>
    </Container>
  );
}
