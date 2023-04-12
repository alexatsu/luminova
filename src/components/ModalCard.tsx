import CloseIcon from "@mui/icons-material/Close";
import { modalStyles } from "../styles/modal";
// import { useImagesStore } from "../store/useImagesStore";
import { useEffect, useState } from "react";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

const baseURL = "http://localhost:8080";
type ModalProps = { modalOpen: boolean; handleClose: () => void };
type InputsProps = {
  imageData: {
    title: string;
    url: string;
  };
  setImageData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      url: string;
    }>
  >;
};
const Inputs = ({ imageData, setImageData }: InputsProps) => (
  <Box sx={{ marginBottom: "10px" }}>
    <TextField
      label="title"
      sx={{ margin: "10px 0", width: "100%" }}
      onChange={(event) => setImageData({ ...imageData, title: event.target.value })}
      value={imageData.title}
      required
    />
    <TextField
      label="url"
      sx={{ width: "100%" }}
      onChange={(event) => setImageData({ ...imageData, url: event.target.value })}
      value={imageData.url}
      required
    />
  </Box>
);

export default function ModalCard({ modalOpen, handleClose }: ModalProps) {
  // const { addImage } = useImagesStore();
  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [imageData, setImageData] = useState({ title: "", url: "" });

  const addImageHandler = async () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const { url, title } = imageData;
      // addImage(url, title);
      console.log("fired");
      fetch(`${baseURL}/api/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, title }),
      })
        .then((data) => console.log(data, "data sent"))
        .catch((err) => console.log(err, "coudn't send data"));

      setLoading(false);
      setDoneLoading(true);
      setImageData({ title: "", url: "" });
    }, 3000);
  };

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (doneLoading) {
      timeout = setTimeout(() => setDoneLoading(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [doneLoading]);

  return (
    <Modal
      hideBackdrop={true}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalStyles.container}
      disablePortal
      closeAfterTransition
    >
      <Fade in={modalOpen}>
        <Box>
          <CloseIcon sx={modalStyles.closeIcon} onClick={handleClose} fontSize={"small"} />
          <Inputs imageData={imageData} setImageData={setImageData} />
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Button
              sx={{ display: "flex", marginBottom: "-20px" }}
              onClick={addImageHandler}
              disabled={imageData.title === "" || imageData.url === ""}
            >
              {loading ? "Loading..." : "Add"}
            </Button>
            {doneLoading && (
              <Typography sx={{ marginBottom: "-19px", fontSize: "14px" }}>Done!</Typography>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
