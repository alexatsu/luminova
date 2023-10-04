import { Link, useNavigate, useParams } from "react-router-dom";
import { MasonryImages } from "../../layouts";
import { Footer, MemoizedNavbar } from "@/shared/layouts";

import { useAuth, useDebounce, useModal, useResizeWidth } from "@/shared/hooks";
import { useImages } from "../../hooks";

import { downloadImage } from "@/shared/utils";
import { endpoints, handleFetch } from "@/shared/utils";

import { ImageResources } from "@/shared/types";

import sass from "../../sass/pages/CollectionById.module.scss";
import { AiOutlineUser, AiOutlineShareAlt } from "react-icons/ai";
import { Loader } from "@/shared/components";
import { ModalContainer } from "@/shared/components/form";
import { Xshape } from "@/shared/components/icons";
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

const { collections, cdn } = endpoints;
const userName = localStorage.getItem("userName");

export function CollectionById() {
  const [copied, setCopied] = useState(false);
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const { handleFetchError } = useAuth();
  const { handleOpen, handleClose, modalOpen } = useModal();

  const { collectionId } = useParams();
  const queryKey = ["collectionById", collectionId];

  const getCollectionImagesById = async (id: string | undefined) => {
    type Fetch = { collection: Collection; error: string };
    const { collection, error }: Fetch = await handleFetch(collections.getCollectionById, "POST", {
      collectionId: id,
    });

    if (handleFetchError(error)) return;

    const { name, description } = collection;

    const resources = collection.collectionImages.map((item) => {
      return { ...item, url: `${cdn.cloudinary}/${item.public_id}` };
    });

    return {
      collectionName: name,
      collectionDescription: description,
      images: resources,
      collectionId: id,
    } as unknown as ImageResources | undefined;
  };

  const { data, status, updateFavoriteImages } = useImages(
    () => getCollectionImagesById(collectionId),
    queryKey
  );

  const { images, collectionDescription, collectionName } = data || {};

  // TODO Make error component
  if (status === "error") {
    return <p>Error</p>;
  }

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
    <div>
      <header>
        <MemoizedNavbar />
      </header>

      {status === "loading" ? (
        <Loader style={{ margin: " auto " }} />
      ) : (
        <div>
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
        </div>
      )}

      <Footer />
    </div>
  );
}

type EditModal = {
  handleClose: () => void;
  collectionData: ImageResources | undefined;
};

export function EditModal({ handleClose, collectionData }: EditModal) {
  const { collectionName, collectionDescription, collectionId } = collectionData as ImageResources;
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { handleFetchError } = useAuth();

  const [collection, setCollection] = useState({
    name: collectionName,
    description: collectionDescription,
  });

  type HandleCollection = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

  const handleCollectionData: HandleCollection = (e) => {
    const { name, value } = e.currentTarget;
    setCollection((prev) => ({ ...prev, [name]: value }));
  };

  const queryKey = ["collectionById", collectionId];
  const { mutate: editCollectionById } = useMutation({
    mutationFn: async () => {
      const { name, description } = collection;
      const { error, message }: { error: string; message: string } = await handleFetch(
        collections.edit,
        "PUT",
        { collectionId, name, description }
      );

      if (handleFetchError(error)) return;

      return message;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      window.location.reload();
    },
  });

  const { mutate: deleteCollectionById } = useMutation({
    mutationFn: async () => {
      const { error, message }: { error: string; message: string } = await handleFetch(
        `${collections.delete}/${collectionId}`,
        "DELETE"
      );

      if (handleFetchError(error)) return;

      return message;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
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
                <button className={sass.yesDelete} onClick={() => deleteCollectionById()}>
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
            <button className={sass.save} type="submit" onClick={() => editCollectionById()}>
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
