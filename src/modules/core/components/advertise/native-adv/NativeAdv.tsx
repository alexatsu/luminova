import { Description } from "../Description";
import { Btn } from "../Btn";
import { AdvContainer } from "../AdvContainer";

import "../../../styles/advertise/NativeAdv.scss";

export const NativeAdv = () => {
  return (
    <div className="native-adv">
      <div
        style={{
          margin: "60px auto",
          textAlign: "center",
          maxWidth: "630px",
        }}
      >
        <Description
          title={"Native advertising"}
          descr={`Generate brand lift unseen on any other platform.
          It works simply by sharing your brand’s beautiful
          content on Luminova in targeted search results. And in exchange,
          creators of the internet share your content with their audiences — in
          relevant trusted places.`}
        />
      </div>

      <img
        src="./img/native-banner.avif"
        alt="Native"
        style={{
          margin: "100px 0",
          width: "100%",
        }}
      />

      <p style={{ textAlign: "center", fontSize: "14px", fontWeight: "400" }}>
        Trusted by the world’s biggest brands
      </p>

      <AdvContainer>
        <div className="studio">
          <div className="studio-info" style={{ maxWidth: "500px" }}>
            <Description
              title={"Don’t have images readily available?"}
              descr={`Take advantage of Luminova Studio: work with Luminova photographers
              to create custom content specifically intended for your campaign.`}
              styleTitle={{
                fontSize: "28px",
              }}
            />
            <Btn styleCenter={"center"} styleBtn={null}>
              Get in touch to learn more about Studio
            </Btn>
          </div>

          <img
            className="studio-img"
            src="./img/studio.avif"
            alt="Studio"
            style={{ width: "500px" }}
          />
        </div>
      </AdvContainer>
    </div>
  );
};
