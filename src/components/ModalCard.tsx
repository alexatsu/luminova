import { Box, Button, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useImagesStore } from "../store/useImagesStore";
import { ReactNode, useState } from "react";
import { modalStyles } from "../styles/modal";

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
    />
    <TextField
      label="url"
      sx={{ width: "100%" }}
      onChange={(event) => setImageData({ ...imageData, url: event.target.value })}
    />
  </Box>
);

export default function ModalCard({ modalOpen, handleClose }: ModalProps) {
  const { addImage } = useImagesStore();
  const [imageData, setImageData] = useState({ title: "", url: "" });
  const addImageHandler = () => {
    addImage(imageData.url, imageData.title);
    handleClose();
  };
  return (
    <Modal
      hideBackdrop={true}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modalStyles.container}
      disablePortal
    >
      <Box>
        <CloseIcon sx={modalStyles.closeIcon} onClick={handleClose} fontSize={"small"} />
        <Inputs imageData={imageData} setImageData={setImageData} />
        <Button sx={{ display: "flex", marginBottom: "-20px" }} onClick={addImageHandler}>
          Upload
        </Button>
      </Box>
    </Modal>
  );
}
