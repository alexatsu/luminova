import { images } from "@/assets/images";

const dummyImgData = images.map(({ id, image, title }) => ({
  public_id: id,
  url: image,
  filename: title,
}));

export { dummyImgData };
