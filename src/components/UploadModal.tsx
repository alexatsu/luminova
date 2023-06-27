import { MouseEventHandler, useEffect } from "react";
import { createPortal } from "react-dom";
import sass from "../styles/components/UploadModal.module.scss";
import uploadImg from "../assets/uploadImg.jpg";

type UploadModalProps = {
  handleClose: MouseEventHandler<HTMLButtonElement>;
  modalOpen: boolean;
};

export function UploadModal({ handleClose, modalOpen }: UploadModalProps) {
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
          <div style={{ top: `calc(50% + ${window.scrollY}px)` }} className={sass.modalContainer}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <section className={sass.sectionTop}>
                <h3 style={{ margin: "auto" }}>Submit to Luminova</h3>
                <button onClick={handleClose} style={{ all: "unset", cursor: "pointer" }}>
                  <svg
                    className={sass.closeIcon}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    version="1.1"
                    aria-hidden="false"
                  >
                    <desc lang="en-US">An X shape</desc>
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"></path>
                  </svg>
                </button>
              </section>

              <form className={sass.sectionForm}>
                <div className={sass.uploaderContainer}>
                  <button className={sass.uploadBtn}>
                    <img src={uploadImg} alt="upload" />
                    <div>Add your photos here</div>
                  </button>
                  {/* <input type="file" /> */}
                </div>

                <div className={sass.sumbitContainer}>
                  <button className={sass.submitBtn}>
                    <span>Submit to Luminova</span>
                  </button>

                  <p className={sass.licenseText}>
                    Read the <span>Luminova License</span>
                  </p>
                </div>
              </form>
            </div>
          </div>,
          root as HTMLElement
        )}
    </>
  );
}
