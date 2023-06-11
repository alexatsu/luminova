import "../../../../styles/advertise/AudienceItem.scss";

export const AudienceItem = ({ bgColor, title, descr }: any) => {
  const textColor = () => {
    if (bgColor !== "#f5f5f5") {
      return "#fff";
    } else {
      return "#000";
    }
  };

  return (
    <div
      className="audience-item"
      style={{
        backgroundColor: bgColor,
        color: textColor(),
      }}
    >
      <p>{title}</p>
      <span>{descr}</span>
    </div>
  );
};
