import { CollectionWrapper } from "../../components/CollectionWrapper";
import { useEffect, useState } from "react";

import sass from "../../sass/user/Collections.module.scss";

export const Collections = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/collections/profile`, {
        credentials: "include",
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  console.log(data, "data");

  return (
    <>
      <div className={sass.listItem}>
        <CollectionWrapper />
        <CollectionWrapper />
      </div>
    </>
  );
};
