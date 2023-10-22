import { Link } from "react-router-dom";
import sass from "../sass/pages/About.module.scss";
import { aboutImages } from "../assets/img";

const { aboutHeader, guyBesideTheWall, community, girlWithLaptop } = aboutImages;

export const About = () => {
  return (
    <main className={sass.container}>
      <section className={sass.headerSection}>
        <div className={sass.headerText}>
          <div>
            <h1>Photos for everyone</h1>

            <p>
              Over 3 million free high-resolution images brought to you by the world’s most generous
              community of photographers.
            </p>
          </div>

          <Link to="/" className={sass.headerBtn}>
            <button>Start browsing</button>
          </Link>
        </div>

        <div>
          <img className={sass.headerImg} alt={"about-header"} src={aboutHeader} />
        </div>
      </section>

      <section className={sass.heroTop}>
        <div className={sass.heroTopText}>
          <h2>Luminova is internet’s source of freely usable images.</h2>
        </div>

        <div className={sass.usableImagesPreview}>
          <img alt={"guy beside the wall"} src={guyBesideTheWall} />
          <h4>Over three million curated photos</h4>
          <p>
            We hand-select every photo and accept only the best, so that no matter what you
            need—you’ll find exactly what you’re looking for on Luminova.
          </p>
        </div>
        <div className={sass.usableImagesPreview}>
          <img alt={"community"} src={community} />
          <h4>A community of 293,995 photographers</h4>
          <p>
            Luminova is home to a growing community of photographers—from hobbyists, professionals,
            emerging brands and everyone in between.
          </p>
        </div>
        <div className={sass.usableImagesPreview}>
          <img alt={"girl with laptop"} src={girlWithLaptop} />
          <h4>Fuelling your favourite platforms</h4>
          <p>
            With partners like BuzzFeed, Squarespace and Trello being powered by our API, the
            Luminova library is more widely accessible than ever.
          </p>
        </div>
      </section>

      
    </main>
  );
};
