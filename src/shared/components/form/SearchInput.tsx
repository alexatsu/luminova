import { TextInput } from "@mantine/core";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchInput = {
  className?: string;
  value?: string;
  changeHandler?: ChangeEventHandler<HTMLInputElement>;
  setIsOpen?: MouseEventHandler<HTMLInputElement>;
  search?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};
export function SearchInput({ className, value, changeHandler, setIsOpen, search }: SearchInput) {
  return (
    <TextInput
      className={className}
      placeholder="Search images"
      variant={"filled"}
      icon={<AiOutlineSearch size={20} cursor={"pointer"} />}
      value={value}
      onChange={changeHandler}
      onClick={setIsOpen}
      onKeyDown={search}
    />
  );
}
