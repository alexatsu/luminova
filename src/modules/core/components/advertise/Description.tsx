export const Description = ({ title, descr, styleTitle, styleDescr }: any) => {
  return (
    <div className="description">
      {title ? (
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginBottom: "20px",
            ...styleTitle,
          }}
        >
          {title}
        </h2>
      ) : null}
      {descr ? (
        <p
          style={{
            marginBottom: "30px",
            fontSize: "18px",
            lineHeight: "27px",
            fontWeight: "400",
            ...styleDescr,
          }}
        >
          {descr}
        </p>
      ) : null}
    </div>
  );
};
