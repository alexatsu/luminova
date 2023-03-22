import { Box, Button, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
type ModalProps = {
  modalOpen: boolean;
  handleClose: () => void;
};
const modalStyles = {
  container: {
    position: "absolute",
    top: "600%" /* temporarily */,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 220,
    "@media (max-width: 568px)": {
      width: 300,
      height: 220,
    },
    border: "1px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    backgroundColor: "#ededed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    right: "5px",
    top: "5px",
    cursor: "pointer",
    color: "#767676",
    transition: "all 0.15s ease-in-out",
    "&:hover": {
      color: "#000",
    },
  },
};
export default function ModalCard({ modalOpen, handleClose }: ModalProps) {
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
        <Box sx={{ marginBottom: "10px" }}>
          <TextField label="title" sx={{ margin: "10px 0", width: "100%" }} />
          <TextField label="link" sx={{ width: "100%" }} />
        </Box>
        <Button sx={{ display: "flex", marginBottom: "-20px" }}>Upload</Button>
      </Box>
    </Modal>
  );
}
