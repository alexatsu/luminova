import { Link } from "react-router-dom";
import "@/styles/assistNav.scss";

export function AssistNav() {
  const paths = [
    {
      name: "Animals",
      path: "animals",
    },
    {
      name: "Anime",
      path: "anime",
    },
    {
      name: "Architecture and Interiors",
      path: "architecture-and-interiors",
    },
    {
      name: "Arts and Culture",
      path: "arts-and-culture",
    },
    {
      name: "Fashion and Beauty",
      path: "fashion-and-beauty",
    },
    {
      name: "Food and Drink",
      path: "food-and-drink",
    },
    {
      name: "Greener Cities",
      path: "greener-cities",
    },
    {
      name: "Health and Wellness",
      path: "health-and-wellness",
    },
    {
      name: "Travel",
      path: "travel",
    },
    {
      name: "Wallpapers",
      path: "wallpapers",
    },
  ];

  const categoriesList = paths.map(({ name, path }) => {
    return (
      <li key={name}>
        <Link to={`/categories/${path}`}>{name}</Link>
      </li>
    );
  });

  return (
    <div className="assist-nav">
      <div className="main-category">
        <ul>
          <li>
            <Link to="/">Editorial</Link>
          </li>
        </ul>
      </div>

      <div className="line"></div>

      <div className="other-categories">
        <ul>{categoriesList}</ul>
      </div>
    </div>
  );
}
