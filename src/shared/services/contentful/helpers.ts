import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { richTextOptions } from "./RichText";
import { Document } from "@contentful/rich-text-types";

const reuseContentful = () => {
  const renderField = (state: { [key: string]: string | Document[] }, fieldName: string) => {
    const fieldContent = state[fieldName];
    return documentToReactComponents(fieldContent as unknown as Document, richTextOptions);
  };

  return { renderField };
};

export { reuseContentful };
