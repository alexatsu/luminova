type Resources = {
  public_id: string;
  url: string;
  filename: string;
  favorite: boolean;
};
type ImageResources = {
  collectionName: string;
  collectionDescription: string;
  collectionId: string;
  images: Resources[];
  pagePreview: PagePreview;
  text_for_page_preview: string;
};
type PagePreview = {
  img: string;
  description: string;
};
export type { ImageResources, Resources };
