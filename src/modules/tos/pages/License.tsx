import { reuseContentful } from "@/shared/services/contentful";
import { useToS } from "../hooks";

export function License() {
  const { renderField } = reuseContentful();
  const licenseEntryId = "6HEsrWxkiKZtujNNwvetAS";
  const { content } = useToS(licenseEntryId);

  return (
    <div>
      <h1>{renderField(content, "header")}</h1>
      <div>{renderField(content, "luminovaCanBeUsedFreely")}</div>
      <h4>{renderField(content, "whatIsAllowed")}</h4>
      <div>{renderField(content, "allowedList")}</div> 
      <h4>{renderField(content, "whatIsNotPermitted")}</h4>
      <h4>{renderField(content, "notPermittedList")}</h4>
      <h4>{renderField(content, "longform")}</h4>
      <h4>{renderField(content, "longformText")}</h4>
      <h4>{renderField(content, "questions")}</h4>
    </div>
  );
}
 