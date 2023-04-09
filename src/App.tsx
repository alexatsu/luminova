import { PuffLoader } from "react-spinners";
import useLoader from "./hooks/useLoader";
import { Footer, Hero, Navbar } from "./layouts";

export default function App() {
  const isLoading = useLoader();
  const Spinner = () => (
    <PuffLoader
      style={{ position: "absolute", top: "40%", right: "50%" }}
      color="#36d7b7"
    />
  );
  const Page = () => (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
  return isLoading ? <Spinner /> : <Page />;
}
