import { useEffect } from "react";
import { createPortal } from "react-dom";

type UploadModalProps = {
  modalOpen: boolean;
  children: JSX.Element;
};

export function UploadModal({ modalOpen, children }: UploadModalProps) {
  useEffect(() => {
    const body = document.body;

    if (modalOpen) {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.left = `-${scrollX}px`;
    } else {
      const scrollY = parseInt(body.style.top || "0") * -1;
      const scrollX = parseInt(body.style.left || "0") * -1;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      window.scrollTo(scrollX, scrollY);
    }
  }, [modalOpen]);

  const root = document.getElementById("root");
  return <>{modalOpen && createPortal(<> {children}</>, root as HTMLElement)}</>;
}
