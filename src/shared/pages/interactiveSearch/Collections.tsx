import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { endpoints, handleFetch } from "@/shared/utils";
import { CollectionsLayout } from "@/shared/layouts";
import { Loader, NoResults } from "@/shared/components";

import sass from "@shared/styles/layouts/CollectionsLayout.module.scss";

const { search } = endpoints;
const userName = localStorage.getItem("userName");

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

export function Collections() {
  const { query } = useParams();
  const queryKey = ["searchCollections", query];

  const searchCollections = async (): Promise<Collections | undefined> => {
    const url = search.collections;

    const { collections, error } = (await handleFetch(`${url}/?query=${query}`)) as {
      collections: Collections;
      error: string;
    };

    if (error) {
      return;
    }

    return collections;
  };

  const { data, status } = useQuery({ queryKey, queryFn: searchCollections });

  if (status === "error") {
    return <div>Error occurred</div>;
  }

  if (status === "loading") {
    return <Loader style={{ margin: " auto " }} />;
  }

  if (data?.map((item) => item).length === 0) {
    return <NoResults className={sass.title} query={query} />;
  }

  const filterEmptyCollections = data?.filter((item) => item.collectionImages.length > 0);

  return (
    <CollectionWrapper>
      <h2 className={sass.title}>{query}</h2>
      <CollectionsLayout collections={filterEmptyCollections || []} userName={userName || ""} />
    </CollectionWrapper>
  );
}

function CollectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      {children}
    </div>
  );
}
