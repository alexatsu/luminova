import { Link } from "react-router-dom";
import sass from "@modules/blog/sass/components/BlogCard.module.scss";

type IBlogCardProps = {
  category: string;
  title: string;
  author: string;
  date: number;
};

export function BlogCard(props: IBlogCardProps): JSX.Element {
  return (
    <div className={sass.postCard}>
      <Link to={"/"} className={sass.postCardLink} title="Read: Somthing"></Link>
      <div className={sass.postCardImgContainer}>
        <div className={sass.img}></div>
      </div>
      <div className={sass.postCardBody}>
        <div className={sass.postCardTag}>
          <span>{props.category}</span>
        </div>
        <h5 className={sass.postCardTitle}>{props.title}</h5>
        <span className={sass.postCardInfo}>
          <span>{props.author}</span>
          <span className={sass.postCardInfoDivider}>·</span>
          &quot; {props.date} &quot;
        </span>
      </div>
    </div>
  );
}
