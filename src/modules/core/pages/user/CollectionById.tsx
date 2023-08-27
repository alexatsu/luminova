import { Link, useNavigate, useParams } from "react-router-dom";
import { MasonryImages } from "../../layouts";
import { Footer, MemoizedNavbar } from "@/layouts";

import { useAuth, useDebounce, useModal, useResizeWidth } from "@/hooks";
import { useImages } from "../../hooks";

import { downloadImage } from "../../utils";
import { endpoints, handleFetch } from "@/utils";

import { ImageResources } from "@/types";

import sass from "../../sass/pages/CollectionById.module.scss";
import { AiOutlineUser, AiOutlineShareAlt } from "react-icons/ai";
import { Loader } from "@/components";
import { ModalContainer } from "@/components/form";
import { Xshape } from "@/components/icons";
import { useState } from "react";
import { queryClient } from "@/main";
import { useMutation } from "@tanstack/react-query";

type Collection = {
  id: number;
  name: string;
  description?: string;
  user_id?: string;

  collectionImages: {
    id: number;
    public_id: string;
    collection_id?: number;
    collection?: Collection;
  }[];
};

const { getCollectionById } = endpoints.collections;
const userName = localStorage.getItem("userName");

export function CollectionById() {
  const [copied, setCopied] = useState(false);
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const { handleFetchError } = useAuth();
  const { handleOpen, handleClose, modalOpen } = useModal();

  const { collectionId } = useParams();
  const queryKey = ["collectionById", collectionId];
  const { data, status, updateFavoriteImages } = useImages(
    () => getCollectionImagesById(collectionId),
    queryKey
  );
  const { images, collectionDescription, collectionName } = data || {};

  // TODO Make error component
  if (status === "error") {
    return <p>Error</p>;
  }

  const getCollectionImagesById = async (id: string | undefined) => {
    type Fetch = { collection: Collection; error: string };
    const { collection, error }: Fetch = await handleFetch(getCollectionById, "POST", {
      collectionId: id,
    });
    const { name, description } = collection;

    if (handleFetchError(error)) return;

    const resources = collection.collectionImages.map((item) => {
      const url = `http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996`;
      return { ...item, url: `${url}/${item.public_id}` };
    });

    return {
      images: resources,
      collectionName: name,
      collectionDescription: description,
      collectionId: id,
    } as unknown as ImageResources;
  };

  const copyCurrentPathToClipboard = async () => {
    setCopied(true);

    const timeout = setTimeout(() => {
      const text = window.location.href;
      navigator.clipboard.writeText(text);
      setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };
  
  return (
    <>
      <header>
        <MemoizedNavbar />
      </header>

      {status === "loading" ? (
        <Loader style={{ margin: " auto " }} />
      ) : (
        <>
          <section className={sass.topWrapper}>
            <div className={sass.collectionInfo}>
              <h1 className={sass.colName}>{collectionName}</h1>
              <p className={sass.colDescription}>{collectionDescription}</p>
            </div>

            <div className={sass.profileWrapper}>
              <div className={sass.profileData}>
                <Link to={`/${userName}`}>
                  <AiOutlineUser color="rgb(175, 175, 175)" size={28} />
                  <div className={sass.profileName}>{userName}</div>
                </Link>
              </div>

              <div className={sass.profileButtons}>
                <button onClick={handleOpen}>Edit</button>

                {copied ? (
                  <button>Copied!</button>
                ) : (
                  <button onClick={copyCurrentPathToClipboard}>
                    <AiOutlineShareAlt />
                  </button>
                )}
              </div>
            </div>

            <div className={sass.imageOverlay}>
              <img src={`${images && images[0].url}`} alt="colimage" />
              <div className={sass.whiteLayer}></div>
            </div>
          </section>

          <div className={sass.imagesCounter}>{images?.length} images</div>

          <main>
            <MasonryImages
              width={debouncedWidth}
              data={images || []}
              updateFavImages={updateFavoriteImages}
              download={downloadImage}
            />
          </main>
          <ModalContainer modalOpen={modalOpen}>
            <EditModal handleClose={handleClose} collectionData={data} />
          </ModalContainer>
        </>
      )}

      <Footer />
    </>
  );
}

type EditModal = {
  handleClose: () => void;
  collectionData: ImageResources | undefined;
};

export function EditModal({ handleClose, collectionData }: EditModal) {
  const { collectionName, collectionDescription, collectionId } = collectionData as ImageResources;
  const [collection, setCollection] = useState({
    name: collectionName,
    description: collectionDescription,
  });
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { handleFetchError } = useAuth();

  type HandleCollection = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

  const handleCollectionData: HandleCollection = (e) => {
    const { name, value } = e.currentTarget;
    setCollection((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: editCollection } = useMutation({
    mutationFn: async () => {
      const { name, description } = collection;
      const { error, message }: { error: string; message: string } = await handleFetch(
        "http://localhost:8080/collections/edit",
        "PUT",
        { collectionId, name, description }
      );

      if (handleFetchError(error)) return;

      return message;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["collectionById", collectionId]);
      window.location.reload();
    },
  });

  const { mutate: deleteCollection } = useMutation({
    mutationFn: async () => {
      const { error, message }: { error: string; message: string } = await handleFetch(
        `http://localhost:8080/collections/delete/${collectionId}`,
        "DELETE"
      );

      if (handleFetchError(error)) return;

      return message;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["collectionById", collectionId]);
      navigate(`/${userName}/collections`);
    },
  });
  return (
    <div className={sass.editModalWrapper}>
      <div className={sass.editModal}>
        <section className={sass.editForm}>
          <h2>Edit Collection</h2>

          <div className={sass.inputs}>
            <div className={sass.nameInput}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={collection.name}
                name="name"
                onChange={handleCollectionData}
              />
            </div>

            <div className={sass.descriptionInput}>
              <label htmlFor="Description (optional)">
                Description <span style={{ color: "grey" }}>(optional)</span>
              </label>
              <textarea
                cols={4}
                rows={5}
                maxLength={250}
                value={collection.description}
                name={"description"}
                onChange={handleCollectionData}
              ></textarea>
            </div>
          </div>

          <div className={sass.editButtons}>
            {confirmDeletion ? (
              <div className={sass.deleteConfirm}>
                <span>Sure?</span>
                <button className={sass.yesDelete} onClick={() => deleteCollection()}>
                  Yes
                </button>
                <button className={sass.noDelete} onClick={() => setConfirmDeletion(false)}>
                  no
                </button>
              </div>
            ) : (
              <button className={sass.delete} onClick={() => setConfirmDeletion(true)}>
                Delete Collection
              </button>
            )}
            <button className={sass.save} type="submit" onClick={() => editCollection()}>
              Save
            </button>
          </div>
        </section>

        <button className={sass.closeButton} onClick={() => handleClose()}>
          <Xshape />
        </button>
      </div>
    </div>
  );
}
