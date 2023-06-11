import { Description } from "../Description";
import { Btn } from "../Btn";

import "../../../styles/advertise/Header.scss";

export const Header = () => {
  return (
    <div
      className="adv-header"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px",
      }}
    >
      <div className="adv-header-info">
        <Description
          title={"Advertise on Luminova"}
          descr={"The world’s most popular creative platform."}
        />

        <Btn styleBtn={null}>Get in touch with us</Btn>
      </div>

      <img
        src="/img/advertiseHeader.avif"
        alt="advertise-header"
        style={{ marginTop: "20px", width: "540px" }}
      />
    </div>
  );
};
