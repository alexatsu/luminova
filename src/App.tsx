import useLoader from "./hooks/useLoader";
import { PuffLoader } from "react-spinners";
import { Footer, Navbar, Hero } from "./layouts";

export default function App() {
  const isLoading = useLoader();
  const spinner = (
    <PuffLoader style={{ position: "absolute", top: "40%", right: "50%" }} color="#36d7b7" />
  );
  const page = (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
  return isLoading ? spinner : page;
}
