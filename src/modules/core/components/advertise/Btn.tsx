import React from "react";

import "../../styles/advertise/Btn.scss";

export const Btn = ({
  styleBtn,
  children,
  styleCenter,
}: {
  styleBtn: any;
  children: React.ReactNode;
  styleCenter: string;
}) => {
  const setColor = () => {
    if (styleBtn?.backgroundColor === "#fff") {
      return "#111";
    } else {
      return "#fff";
    }
  };

  return (
    <button
      className={styleCenter}
      style={{
        ...styleBtn,
      }}
    >
      <div style={{ color: setColor() }}>{children}</div>
    </button>
  );
};
