import { Sx, TextInput } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

export function SearchInput({ styles }: { styles: Sx | (Sx | undefined)[] | undefined }) {
  return (
    <TextInput
      sx={styles}
      placeholder="Search images"
      variant={"filled"}
      icon={<AiOutlineSearch size={20} cursor={"pointer"}/>}
    />
  );
}
