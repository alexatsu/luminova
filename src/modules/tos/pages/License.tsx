import { useState } from "react";
import * as contentful from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export function License() {
  const [content, setContent] = useState("");
  const client = contentful.createClient({
    space: "1zsteu2afj6i",
    environment: "master", // defaults to 'master' if not set
    accessToken: "fDQ-fsg3NdWoB-GQsTxiaVahb1giqRHcwsbnKJ69uEE",
  });
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, next) => `<p class="my-paragraph-class">${next(node.content)}</p>`,
      [INLINES.HYPERLINK]: (node, next) =>
        `<a href="${node.data.uri}" class="my-link-class">${next(node.content)}</a>`,
    },
  };
  return (
    <>
      <div
        onClick={() =>
          client
            .getEntry("1tYXDH3UpPp0soOF5RNPcM")
            .then((entry) => {
              const rawRichTextField = entry.fields.luminova;
              console.log(entry, "entry");
              setContent(documentToHtmlString(rawRichTextField));
            })

            .catch((error) => console.log(error))
        }
      >
        get data
      </div>
      <div>{content}</div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}
