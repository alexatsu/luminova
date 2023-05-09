import CloseIcon from "@mui/icons-material/Close";
import { modalStyles } from "@/styles/modal";
import { ModaCardProps } from "@/types/components";
import { useUploadImage } from "@/hooks/useUploadImage";
import { SetImageValuesProps } from "@/utils/functions";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

export function ModalCard({ modalOpen, handleClose }: ModaCardProps) {
  const { imageData, setImageData, addImageHandler, loading, doneLoading } = useUploadImage();
  const { url, title } = imageData;
  const { container, closeIcon } = modalStyles;
  const isAddButtonDisabled = title === "" || url === "";
  
  const setImageValues: SetImageValuesProps = (event) => {
    const { name, value } = event.target;
    setImageData((prevImageData) => ({ ...prevImageData, [name]: value }));
  };

  return (
    <Modal
      hideBackdrop={true}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={container}
      disablePortal
      closeAfterTransition
    >
      <Fade in={modalOpen}>
        <Box>
          <CloseIcon sx={closeIcon} onClick={handleClose} fontSize={"small"} />
          <Box sx={{ marginBottom: "10px" }}>
            <TextField
              label="title"
              sx={{ margin: "10px 0", width: "100%" }}
              onChange={setImageValues}
              value={title}
              required
              name="title"
            />
            <TextField
              label="url"
              sx={{ width: "100%" }}
              onChange={setImageValues}
              value={url}
              required
              name="url"
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Button
              sx={{ display: "flex", marginBottom: "-20px" }}
              onClick={addImageHandler}
              disabled={isAddButtonDisabled}
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
