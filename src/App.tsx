import useLoader from "./hooks/useLoader";
import { PuffLoader } from "react-spinners";
import { Footer, Navbar, Hero } from "./layouts";
import { ProgressBar } from "./components/ProgressBar";

export default function App() {
  const isLoading = useLoader();
  const Spinner = () => (
    <PuffLoader style={{ position: "absolute", top: "40%", right: "50%" }} color="#36d7b7" />
  );
  const Page = () => (
    <>
      <Navbar />
      <ProgressBar />
      <Hero />
      <Footer />
    </>
  );
  return isLoading ? <Spinner /> : <Page />;
}
