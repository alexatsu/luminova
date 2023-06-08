import { Link } from "react-router-dom";

export function PagePreview({
  imgURL,
  description,
  title,
}: {
  imgURL: string | undefined;
  description?: string | undefined;
  title?: string | undefined;
}) {
  return (
    <div style={{ display: "flex", position: "relative", marginBottom: "2rem", height: "600px" }}>
      <img
        src={imgURL}
        alt="giga"
        style={{ objectFit: "cover", width: "100%", height: "100%", filter: "brightness(60%)" }}
      />
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "0",
          color: "white",
          width: "100%",
          padding: "0 20%",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", marginBottom: "1rem", fontWeight: "bold" }}>{title}</h1>
        <p
          style={{
            lineHeight: "1.7rem",
            fontSize: "1.2rem",
            fontWeight: "semi-bold",
            wordBreak: "break-word",
            minWidth: "30vw",
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          color: "grey",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <span style={{ color: "hsl(0, 3%, 94%)" }}>
          Read more about the{" "}
          <Link style={{ color: "white", textDecoration: "underline" }} to={"/tos/license"}>
            Luminova License
          </Link>
        </span>
      </div>
    </div>
  );
}
