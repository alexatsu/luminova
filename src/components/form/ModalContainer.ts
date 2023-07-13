import { useEffect } from "react";
import { createPortal } from "react-dom";

type UploadModalProps = {
  modalOpen: boolean;
  children: JSX.Element;
};

export function ModalContainer({ modalOpen, children }: UploadModalProps) {
  useEffect(() => {
    const body = document.body;

    if (modalOpen) {
      body.style.overflow = "hidden";
    }
    return () => body.removeAttribute("style");
  }, [modalOpen]);

  const root = document.getElementById("root");
  return modalOpen && createPortal(children, root as HTMLElement);
}
