import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

type PagePreviewProps = {
  imgURL: string | undefined;
  description?: string | undefined;
  title?: string | undefined;
  upload?: () => void;
};

export function PagePreview({ imgURL, description, title, upload }: PagePreviewProps) {
  return (
    <div className="page-preview-container">
      <img src={imgURL} alt="giga" />

      <section className="main-text-section">
        <h1 className="text-header">{title}</h1>
        <p className="text-description">{description}</p>

        {title !== "Luminova" && (
          <Button
            onClick={() => console.log("clicked")}
            variant="gradient"
            gradient={{ from: "#ffa2c7", to: "#ffb79c", deg: 35 }}
          >
            <p style={{ color: "black", fontWeight: "lighter" }}>
              Submit to <span style={{ fontWeight: "bold" }}>{title}</span>
            </p>
          </Button>
        )}
      </section>

      <div className="license-text-section">
        <span>
          Read more about the <Link to={"/tos/license"}>Luminova License</Link>
        </span>
      </div>
    </div>
  );
}
