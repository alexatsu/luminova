import { useAuth } from "@/hooks";
import { queryClient } from "@/main";
import { endpoints, handleFetch } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Collection = {
  id: number;
  name: string;
  description: string;
  user_id: string;
  collectionImages: { id: number; public_id: string }[];
}[];

type Props = (
  queryKey: (string | undefined)[],
  queryFunction: () => Promise<Collection | undefined>
) => {
  getCollections: {
    data: Collection | undefined;
    status: "error" | "success" | "loading";
  };
  createCollections: {
    createCollection: () => void;
    collectionData: {
      name: string;
      description: string;
      extend: boolean;
    };
    setCollectionData: React.Dispatch<
      React.SetStateAction<{
        name: string;
        description: string;
        extend: boolean;
      }>
    >;
  };
  updateImagesInCollection: {
    updateImageInCollection: ({ id, public_id }: { id: number; public_id: string }) => void;
    collectionStatus: { [id: number]: boolean };
  };
};

type Response = {
  collection: Collection;
  message: string;
  error: string;
};

const { collections } = endpoints;

export const useCollections: Props = (queryKey, queryFunction) => {
  const [collectionData, setCollectionData] = useState({
    name: "",
    description: "",
    extend: false,
  });

  const { handleFetchError } = useAuth();

  const { data, status } = useQuery({ queryKey: queryKey, queryFn: queryFunction });

  const { mutate: createCollection } = useMutation({
    mutationFn: async () => {
      const { name, description } = collectionData;
      const { collection, error }: Response = await handleFetch(collections.create, "POST", {
        name,
        description,
      });

      if (handleFetchError(error)) return;
      setCollectionData((prev) => ({ ...prev, extend: false }));
      return collection;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },

    onError: (err) => {
      console.log(err, "error creating collection");
    },
  });

  const [collectionStatus, setCollectionStatus] = useState<{ [id: number]: boolean }>({});
  const { mutate: updateImageInCollection } = useMutation({
    mutationFn: async ({ id, public_id }: { id: number; public_id: string }) => {
      setCollectionStatus((prevStatus) => ({ ...prevStatus, [id]: true }));

      const response = await handleFetch(collections.updateImg, "POST", {
        collectionId: id,
        public_id: public_id,
      });

      if (handleFetchError(response.error)) return;
      return response;
    },

    onSuccess: (data, { id }) => {
      setCollectionStatus((prevStatus) => ({ ...prevStatus, [id]: true }));
      queryClient.invalidateQueries({ queryKey: queryKey });
      setTimeout(() => setCollectionStatus((prev) => ({ ...prev, [id]: false })), 500);
    },

    onError: (err, { id }) => {
      setCollectionStatus((prevStatus) => ({ ...prevStatus, [id]: false }));
      console.log(err, "error updating images in collection");
    },
  });

  return {
    getCollections: { data, status },
    createCollections: { createCollection, collectionData, setCollectionData },
    updateImagesInCollection: { updateImageInCollection, collectionStatus },
  };
};
