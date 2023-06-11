export const Brands = ({ dataBrands }: { dataBrands: any }) => {
  return (
    <div className="brands" style={{ marginTop: "30px" }}>
      <p style={{ fontSize: "14px", fontWeight: "400", textAlign: "center" }}>
        Join the world’s biggest brands that we’re proud to call partners
      </p>

      <div
        className="brand-list"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "80px",
        }}
      >
        {dataBrands.map((item: any, index: number) => (
          <img key={index} src={item.url} alt={item.alt} width={"80px"} />
        ))}
      </div>
    </div>
  );
};
