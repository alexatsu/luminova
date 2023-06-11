import { Description } from "../Description";
import { Btn } from "../Btn";
import { AdvContainer } from "../AdvContainer";
import { AdvListItems } from "./adv-list-items/AdvListItems";

export const DirectAdv = ({ dataAdvItems }: { dataAdvItems: any }) => {
  return (
    <div
      className="direct-adv"
      style={{
        background: "linear-gradient(180deg, #ffffff, #F5F5F5)",
        padding: "70px 10px",
      }}
    >
      <div
        style={{
          margin: "0px auto",
          textAlign: "center",
          maxWidth: "630px",
        }}
      >
        <Description
          title={"Direct Advertising"}
          descr={`Direct ads are performance-driven placements. Built to generate traffic for brands and convert
              on customer acquisition KPIs. We create maximum impact with the following four paid placement opportunities`}
        />
      </div>
      <img
        src="./img/direct.avif"
        alt="Direct"
        style={{ margin: "100px 0 50px 0" }}
      />

      <AdvContainer>
        <AdvListItems dataAdvItems={dataAdvItems} />
      </AdvContainer>

      <Btn styleBtn={{ margin: "30px auto 0px auto" }}>
        Get in touch with us
      </Btn>
    </div>
  );
};
