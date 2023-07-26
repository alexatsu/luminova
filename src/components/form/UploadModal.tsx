import { useResizeWidth } from "@/hooks";
import { endpoints } from "@/utils";
import { useState, useRef } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Xshape } from "../icons";
import uploadImg from "@/assets/uploadImg.jpg";
import sass from "@/styles/components/UploadModal.module.scss";
import { Loader } from "../Loader";

type UploadProps = {
  handleClose: () => void;
  category?: string | undefined;
  title?: string | undefined;
};

export function UploadModal({
  handleClose,
  category = "gallery",
  title = "Editorial",
}: UploadProps) {
  const [imageUrls, setImageUrls] = useState<{ blob: string; small: boolean }[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const width = useResizeWidth();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...e.target.files!] as File[];
    const urls = files.map((file) => URL.createObjectURL(file));
    const newImages = [] as { blob: string; small: boolean }[];

    let loadedCount = 0;
    const onLoad = () => {
      loadedCount++;

      if (loadedCount === urls.length) {
        const uniqueImages = newImages.filter(
          (newImage) => !imageUrls.some((image) => image.blob === newImage.blob)
        );

        setImageUrls((prevImages) => [...prevImages, ...uniqueImages]);
        setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
      }
    };

    urls.forEach((url) => {
      const image = new Image();
      image.src = url;

      image.onload = () => {
        const { naturalWidth, naturalHeight } = image;
        const result = { blob: url, small: naturalHeight < 2000 || naturalWidth < 2000 };

        newImages.push(result);
        onLoad();
      };
    });
  };

  const isImageSmall = async (file: File) => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();

      img.onload = () => {
        const { naturalWidth, naturalHeight } = img;
        const isSmall = naturalWidth < 2000 || naturalHeight < 2000;
        resolve(isSmall);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const sendToBackend = async (files: File[]) => {
    const formData = new FormData();
    const userName = localStorage.getItem("userName") as string;
    const { upload } = endpoints.images;

    for (const file of files) {
      const isSmall = await isImageSmall(file);
      if (isSmall) {
        continue;
      }

      formData.append(`file`, file);
    }
    formData.append("userName", userName);
    formData.append("category", category);

    await fetch(upload, { method: "POST", body: formData }).then(() => setUploaded(true));
  };

  const filterSmallImages = (images: { blob: string; small: boolean }[]) => {
    return images.filter((image) => image.small !== true);
  };

  const removeImage = (url: string) => {
    setImageUrls((prevImages) => prevImages.filter((image) => image.blob !== url));
  };

  const onClickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterSmallImages(imageUrls).length < 1) {
      return;
    }
    sendToBackend(uploadedFiles);
    setLoading(true);
  };

  const containerRef = useRef<null | HTMLDivElement>(null);

  containerRef.current
    ? containerRef.current.style.setProperty("--top", `calc(50% + ${window.scrollY}px)`)
    : null;

  return (
    <div ref={containerRef} className={sass.modalContainer}>
      <section className={sass.sectionTop}>
        <h3 style={{ margin: "auto" }}>Submit to {title}</h3>
        <button onClick={handleClose} style={{ all: "unset", cursor: "pointer" }}>
          <Xshape className={sass.closeIcon} />
        </button>
      </section>

      {uploaded ? (
        <div className={sass.uploaded}>
          <div className={sass.uploadedIconContainer}>
            <AiOutlineCheck className={sass.uploadedIcon} />
          </div>
          <p>Uploaded {filterSmallImages(imageUrls).length} images</p>
          <Link to="/profile">
            <button onClick={handleClose}>View your profile</button>
          </Link>
        </div>
      ) : loading ? (
        <Loader style={{ margin: "auto" }} />
      ) : (
        <>
          <form className={sass.sectionForm} encType="multipart/form-data">
            <input
              id="upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              multiple
              onChange={handleFileUpload}
              disabled={imageUrls.length >= 10}
            />

            {width < 768 && (
              <>
                {imageUrls.length < 10 && (
                  <Uploader className={imageUrls.length > 0 ? sass.filledImages : sass.uploadBtn} />
                )}
              </>
            )}

            <ul className={sass.imageList}>
              {width >= 768 && (
                <>{imageUrls.length < 10 && <Uploader className={sass.uploadInList} />}</>
              )}

              {imageUrls.map(({ blob, small }) => {
                return (
                  <div key={blob} className={sass.imageContainer}>
                    <li className={sass.imageItem}>
                      <img src={blob} width={230} height={200} alt="upload" />
                      <button onClick={() => removeImage(blob)}>
                        <AiOutlineClose size={14} fontWeight={"bold"} />
                      </button>
                    </li>
                    {small ? (
                      <div className={sass.limit}>
                        Current file did not meet the minimum size. Please upload images over
                        2000x2000px. Please, provide better quality images or remove them.
                      </div>
                    ) : (
                      <section className={sass.additionals}>
                        <input type="text" placeholder="Add a tag" />
                        <textarea
                          rows={3}
                          maxLength={600}
                          placeholder="Add a description (optional)"
                        />
                      </section>
                    )}
                  </div>
                );
              })}
            </ul>
          </form>

          <div className={sass.sumbitContainer}>
            {imageUrls.length < 10 && (
              <div style={{ padding: "10px" }}>
                {filterSmallImages(imageUrls).length} images will be uploaded
              </div>
            )}

            {imageUrls.length >= 10 && <div style={{ color: "red" }}>Max 10 images</div>}
            <button
              onClick={(e) => onClickSubmit(e)}
              className={
                filterSmallImages(imageUrls).length < 1 ? sass.submitBtn : sass.submitBtnFilled
              }
            >
              <span>Submit to Luminova</span>
            </button>

            <p className={sass.licenseText}>
              Read the <Link to={"/tos/license"}>Luminova License</Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function Uploader({ className }: { className: string }) {
  return (
    <>
      <label htmlFor="upload" className={className}>
        <img src={uploadImg} alt="upload" />
        <div>Add your photos here</div>
      </label>
    </>
  );
}
