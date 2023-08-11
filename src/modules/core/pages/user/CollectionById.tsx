import { Link, useNavigate, useParams } from "react-router-dom";
import { MasonryImages } from "../../layouts";
import { MemoizedNavbar } from "@/layouts";

import { useDebounce, useModal, useResizeWidth } from "@/hooks";
import { useImages } from "../../hooks";

import { downloadImage } from "../../utils";
import { handleFetch } from "@/utils";

import { ImageResources } from "@/types";

import sass from "../../sass/pages/CollectionById.module.scss";
import { AiOutlineUser, AiOutlineShareAlt } from "react-icons/ai";
import { Loader } from "@/components";
import { ModalContainer } from "@/components/form";
import { Xshape } from "@/components/icons";
import { useState } from "react";
import { queryClient } from "@/main";

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

export function CollectionById() {
  const width = useResizeWidth();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const navigate = useNavigate();
  const { collectionId } = useParams();
  const userName = localStorage.getItem("userName");
  const { handleOpen, handleClose, modalOpen } = useModal();

  const queryKey = ["collectionById", collectionId];
  const { data, status, updateFavoriteImages } = useImages(
    () => fetchCollectionById(collectionId),
    queryKey
  );
  const { images, collectionDescription, collectionName } = data || {};

  console.log(images, "data");

  // TODO Make error component
  if (status === "error") {
    return <p>Error</p>;
  }
  
  const fetchCollectionById = async (id: string | undefined) => {
    const { collection, error }: { collection: Collection; error: string } = await handleFetch(
      `http://localhost:8080/collections/openbyid`,
      "POST",
      { collectionId: id }
    );

    if (error === "Refresh token missing" || error === "User not found") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      return;
    }

    // console.log(collection, "collection");
    const resources = collection.collectionImages.map((item) => {
      return {
        ...item,
        url: `http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996/${item.public_id}`,
      };
    });
    const { name, description } = collection;

    return {
      images: resources,
      collectionName: name,
      collectionDescription: description,
      collectionId: id,
    } as unknown as ImageResources;
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
                <ModalContainer modalOpen={modalOpen}>
                  <EditModal handleClose={handleClose} collectionData={data} />
                </ModalContainer>

                <button>
                  <AiOutlineShareAlt />
                </button>
              </div>
            </div>

            <div className={sass.imageOverlay}>
              <img src={`${images && images[0].url}`} alt="colimage" />
              <div className={sass.whiteLayer} />
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
        </>
      )}

      <section>recommendations</section>
      <footer>Here goes footer</footer>
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
  const navigate = useNavigate();

  type HandleCollection = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

  const handleCollection: HandleCollection = (e) => {
    const { name, value } = e.currentTarget;
    setCollection((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    console.log(collection, "collection");
    const { name, description } = collection;
    const { error, message }: { error: string; message: string } = await handleFetch(
      "http://localhost:8080/collections/edit",
      "PUT",
      { collectionId: collectionId, name: name, description: description }
    );

    if (error === "Refresh token missing") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");
      return;
    }
    console.log(message, "message");
    queryClient.invalidateQueries(["collectionById", collectionId]);
    return message;
  };
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
                onChange={handleCollection}
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
                onChange={handleCollection}
              ></textarea>
            </div>
          </div>

          <div className={sass.editButtons}>
            <button className={sass.delete}>Delete Collection</button>
            <button
              className={sass.save}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleEditSubmit();
              }}
            >
              Save
            </button>
          </div>
        </section>

        <button className={sass.closeButton} onClick={handleClose}>
          <Xshape />
        </button>
      </div>
    </div>
  );
}
