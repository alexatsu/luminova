import { env } from "@/shared/utils";
import * as contentful from "contentful";

const client = contentful.createClient({
  space: env("CONTENTFUL_SPACE"),
  environment: env("CONTENTFUL_ENVIRONMENT"),
  accessToken: env("CONTENTFUL_ACCESS_TOKEN"),
});

export { client };
