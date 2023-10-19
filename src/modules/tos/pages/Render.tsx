import Markdown from "react-markdown";
import { useQuery } from "@tanstack/react-query";

import { Loader } from "@/shared/components";
import sass from "../sass/pages/Render.module.scss";

export function Render({ queryKey, filePath }: { queryKey: string[]; filePath: string }) {
  const { data, status } = useQuery({
    queryKey: [queryKey, filePath],
    queryFn: async () => {
      const response = await fetch(filePath);
      return await response.text();
    },
  });

  if (status === "loading") {
    return <Loader style={{ margin: "0 auto" }} />;
  }

  if (status === "error") {
    return <p>Error</p>;
  }

  return <Markdown className={sass.container}>{data}</Markdown>;
}
