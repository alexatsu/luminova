import { PuffLoader } from "react-spinners";

export const Loader = () => {
  return (
    <lottie-player
      src="https://assets8.lottiefiles.com/packages/lf20_z9ed2jna.json"
      background="transparent"
      speed="1"
      style={{ width: "300px", height: "300px" }}
      loop
      autoplay
    ></lottie-player>
  );
  // <PuffLoader style={{ position: "absolute", top: "40%", right: "50%" }} color="#36d7b7" />
};
