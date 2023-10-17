import { endpoints, handleFetch } from "@/shared/utils";
import { useAuth } from "@/shared/hooks";
import { useCollections } from "../../hooks";

import { CollectionsLayout } from "@/shared/layouts";

type Collections = {
  id: number;
  name: string;
  user_id: string;
  description: string;
  collectionImages: {
    id: number;
    public_id: string;
    collection_id: number;
  }[];
}[];

const { collections } = endpoints;
const userName = localStorage.getItem("userName") || undefined;

export function Collections() {
  const { handleFetchError } = useAuth();

  const getCollections = async () => {
    type Fetch = { collection: Collections; error: string };
    const { collection, error }: Fetch = await handleFetch(collections.profile);

    if (handleFetchError(error)) return;
    return collection;
  };

  const queryKey = ["collections", userName];
  const {
    getCollections: { data, status },
  } = useCollections(queryKey, () => getCollections());

  if (status === "error") {
    return <p>Error</p>;
  }

  const filterEmptyCollections = data?.filter((item) => item.collectionImages.length > 0);

  return <CollectionsLayout collections={filterEmptyCollections || []} userName={userName || ""} />;
}
