import { client } from "@/shared/services/contentful";
import { useEffect, useState } from "react";
import { Document } from "@contentful/rich-text-types";

export function useToS(entryId: string) {
  const [content, setContent] = useState<{ [key: string]: string | Document[] }>({});

  useEffect(() => {
    const getEntry = async () => {
      const entry = await client.getEntry(entryId);
      console.log(entry);
      setContent({ ...entry.fields } as { [key: string]: string | Document[] });
    };

    getEntry();
  }, [entryId]);

  return { content };
}
