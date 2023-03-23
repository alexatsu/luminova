import { useState } from "react";

export default function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return { modalOpen, handleOpen, handleClose };
}
