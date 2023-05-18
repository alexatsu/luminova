type ModaCardProps = { modalOpen: boolean; handleClose: () => void };
type InputsProps = {
  imageData: { title: string; url: string };
  setImageData: React.Dispatch<React.SetStateAction<{ title: string; url: string }>>;
};

export type { ModaCardProps, InputsProps };