import { reuseContentful } from "@/services/contentful";
import { useToS } from "../hooks";

export function License() {
  const { renderField } = reuseContentful();
  const licenseEntryId = "6HEsrWxkiKZtujNNwvetAS";
  const { content } = useToS(licenseEntryId);

  return (
    <div>
      <h1>{renderField(content, "header")}</h1>
      <div>{renderField(content, "luminovaCanBeUsedFreely")}</div>
    </div>
  );
}
 