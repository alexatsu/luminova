type ImagesProps = {
  public_id: string;
  url: string;
  filename: string;
  favorite: boolean;
};
type ImageResources = { resources: ImagesProps[]; page_preview: string };
export type { ImageResources, ImagesProps };
