type ImagesProps = {
  public_id: string;
  url: string;
  filename: string;
  favorite: boolean;
};
type ImageResources = { resources: ImagesProps[] };
export type { ImageResources, ImagesProps };