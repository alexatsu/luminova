import { useNavigate, useParams } from "react-router-dom";
import { MasonryImages } from "../../layouts";
import { useDebounce, useResizeWidth } from "@/hooks";
import { downloadImage } from "../../utils";
import { useImages } from "../../hooks";
import { handleFetch } from "@/utils";
import { ImageResources } from "@/types";
import { MemoizedNavbar } from "@/layouts";

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
  const navigate = useNavigate();
  const { debouncedValue: debouncedWidth } = useDebounce<number>(width, 400);
  const { collectionId } = useParams();

  const queryKey = ["collectionById", collectionId];
  const { data, status, updateFavoriteImages } = useImages(
    () => fetchCollectionById(collectionId),
    queryKey
  );

  const { images } = data || {};
  console.log(data, "data");

  // TODO Make error component
  if (status === "error") {
    return <p>Error</p>;
  }
  const fetchCollectionById = async (id: string | undefined): Promise<ImageResources> => {
    const { collection, error }: { collection: Collection; error: string } = await handleFetch(
      `http://localhost:8080/collections/openbyid`,
      "POST",
      { collectionId: id }
    );

    if (error === "Refresh token missing" || error === "User not found") {
      navigate("/login");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userName");

      throw new Error("Refresh token missing");
    }

    const resources = collection.collectionImages.map((item) => {
      return {
        ...item,
        url: `http://res.cloudinary.com/dkdkbllwf/image/upload/v1690037996/${item.public_id}`,
      };
    });
    return { images: resources } as unknown as ImageResources;
  };

  return (
    <>
      <header style={{marginBottom: "20px"}}>
        <MemoizedNavbar />
      </header>
      <section>
      
      </section>
      <main>
        <MasonryImages
          width={debouncedWidth}
          data={images || []}
          updateFavImages={updateFavoriteImages}
          download={downloadImage}
        />
      </main>
      <section>recommendations</section>
      <footer>Here goes footer</footer>
    </>
  );
}
