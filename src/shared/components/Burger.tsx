import cl from "@styles/components/Burger.module.scss";
import { MouseEventHandler } from "react";

export const Burger = ({ handleClick }: { handleClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <button className={cl.burger} onClick={handleClick}>
      <span className={cl.burgerLine}></span>
      <span className={cl.burgerLine}></span>
      <span className={cl.burgerLine}></span>
    </button>
  );
};
