import { CSSProperties, MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
//uuid

type ModalCardProps = {
  handleClose: MouseEventHandler<HTMLButtonElement>;
  modalOpen: boolean;
};

export function ModalCard({ handleClose, modalOpen }: ModalCardProps) {
  const styles = {
    zIndex: "3",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: `calc(50% + ${window.scrollY}px)`,
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#0009",
  };
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
  return (
    <>
      {modalOpen &&
        createPortal(
          <div style={styles as CSSProperties}>
            <button onClick={handleClose}>x</button>
            <div
              style={{
                width: "90%",
                height: "90%",
                backgroundColor: "white",
                position: "absolute",
                margin: "auto",
                top: "5%",
                left: "5%",
                borderRadius: "10px",
              }}
            >
              wrapper
            </div>
          </div>,
          root as HTMLElement
        )}
    </>
  );
}
