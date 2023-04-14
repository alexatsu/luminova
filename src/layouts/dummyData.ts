import { images } from "../assets/images";

export const dummyImgData = images.map(img => ({
  public_id: img.id,
  url: img.image,
  filename: img.title,
}));
