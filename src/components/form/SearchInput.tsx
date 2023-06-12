import { Sx, TextInput } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

export function SearchInput({ className }: { className?: string }) {
  return (
    <TextInput
      className={className}
      placeholder="Search images"
      variant={"filled"}
      icon={<AiOutlineSearch size={20} cursor={"pointer"} />}
    />
  );
}
