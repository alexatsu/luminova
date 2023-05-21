import "../styles/assistNav.scss";

function AssistNav() {
  const categories = [
    {
      title: "Greener Cities",
    },
    {
      title: "Wallpapers",
    },
    {
      title: "3D Renders",
    },
    {
      title: "Nature",
    },
    {
      title: "Travel",
    },
    {
      title: "Architecture & Interiors",
    },
    {
      title: "Street Photography",
    },
    {
      title: "Textures & Patterns",
    },
    {
      title: "Film",
    },
    {
      title: "Experimental",
    },
    {
      title: "Animals",
    },
    {
      title: "Fashion & Beauty",
    },
    {
      title: "Business & Work",
    },
    {
      title: "Food & Drink",
    },
    {
      title: "People",
    },
    {
      title: "Spirituality",
    },
    {
      title: "Athletics",
    },
    {
      title: "Health & Wellness",
    },
    {
      title: "Current Events",
    },
    {
      title: "Arts & Culture",
    },
  ];

  const categoriesList = categories.map((category) => {
    return (
      <li key={category.title}>
        <a href="0">{category.title}</a>
      </li>
    );
  });

  return (
    <div className="assist-nav">
      <div className="main-category">
        <ul>
          <li>
            <a href="0">Editorial</a>
          </li>
        </ul>
      </div>

      <div className="line"></div>

      <div className="other-categories">
        <ul>
          {categoriesList}
        </ul>
      </div>
    </div>
  );
}

export default AssistNav;
