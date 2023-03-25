import useLoader from "./hooks/useLoader";
import { PuffLoader } from "react-spinners";
import { Footer, Navbar, Hero } from "./layouts";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };
  // return (
  //   <div>
  //     <Button onClick={handleOpen}>Open modal</Button>
  //     <Modal
  //       aria-labelledby="transition-modal-title"
  //       aria-describedby="transition-modal-description"
  //       open={open}
  //       onClose={handleClose}
  //       closeAfterTransition
  //       slots={{ backdrop: Backdrop }}
  //       slotProps={{
  //         backdrop: {
  //           timeout: 500,
  //         },
  //       }}
  //     >
  //       <Fade in={open}>
  //         <Box sx={style}>
  //           <Typography id="transition-modal-title" variant="h6" component="h2">
  //             Text in a modal
  //           </Typography>
  //           <Typography id="transition-modal-description" sx={{ mt: 2 }}>
  //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //           </Typography>
  //         </Box>
  //       </Fade>
  //     </Modal>
  //   </div>
  // );
}
