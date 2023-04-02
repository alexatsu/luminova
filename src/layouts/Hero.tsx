import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import useResizeWidth from "../hooks/useResizeWidth";
import { Container, ImageList } from "@mui/material";

const baseURL = "http://localhost:8080";
export default function Hero() {
  const [img, setImg] = useState<null | string[]>();

  useEffect(() => {
    fetch(`${baseURL}/api/images`)
      .then((response) => response.json())
      .then((data) => setImg(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    // <Container sx={{ marginTop: "100px" }}>
    //   <ImageList variant="masonry" cols={width > 568 ? 3 : 1} gap={8}>
    //     <ImageCard />
    //   </ImageList>
    // </Container>
    <>
      {img?.map((image) => (
        <img key={image} src={`${baseURL}/${image}`} alt={image} />
      ))}
    </>
  );
}
