import { TextInput } from "@mantine/core";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchInput = {
  className?: string;
  value?: string;
  changeHandler?: ChangeEventHandler<HTMLInputElement>;
  setIsOpen?: MouseEventHandler<HTMLInputElement>;
};
export function SearchInput({ className, value, changeHandler, setIsOpen }: SearchInput) {
  return (
    <TextInput
      className={className}
      placeholder="Search images"
      variant={"filled"}
      icon={<AiOutlineSearch size={20} cursor={"pointer"} />}
      value={value}
      onChange={changeHandler}
      onClick={setIsOpen}
    />
  );
}
