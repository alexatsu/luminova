import { Description } from "../Description";
import { Btn } from "../Btn";
import { AudienceListItems } from "./audience-list-items/AudienceListItems";

import "../../../styles/advertise/Audience.scss";

export const Audience = ({ dataAudienceItems }: any) => {
  return (
    <div className="audience">
      <div style={{ textAlign: "center" }}>
        <Description title="Our Audience" />
      </div>

      <AudienceListItems dataAudienceItems={dataAudienceItems} />

      <div className="email-block">
        <div className="email-block-content">
          <h4 className="email-block-title">Ready to get started?</h4>
          <p
            className="email-block-desc"
            style={{ color: "#fff", fontSize: "14px", fontWeight: "400" }}
          >
            Not sure where to start? Email us directly{" "}
            <a
              href="mailto:partnershisp@luminova.com"
              style={{
                color: "grey",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              partnership@luminova.com
            </a>
          </p>
        </div>

        <div className="email-block-btn">
          <Btn
            styleBtn={{
              backgroundColor: "#fff",
              height: "50px",
              width: "200px",
              margin: "0 auto",
            }}
          >
            Get in touch with us
          </Btn>
        </div>
      </div>
    </div>
  );
};
