import { Description } from "../../Description";

export const AdvItem = ({ url, title, descr }: any) => {
  return (
    <div className="adv-item" style={{ width: "300px", maxHeight: "100%" }}>
      <img
        src={url}
        alt={title}
        style={{ height: "110px", margin: "0 auto" }}
      />

      <div
        className="adv-item-info"
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
          height: "50%",
        }}
      >
        <Description
          title={title}
          descr={descr}
          styleTitle={{ fontSize: "18px" }}
          styleDescr={{ fontSize: "14px" }}
        />
      </div>
    </div>
  );
};
