import '@styles/components/BlogCard.scss';

interface IBlogCardProps {
    category: string;
    title: string;
    author: string;
    date: number;
}

const BlogCard = (props: IBlogCardProps) => {
    return (
        <>
            <div className="post-card">
                <a href="#" className="post-card__link" title="Read: Somthing"></a>
                <div className="post-card__img-container">
                    <div className="img"></div>
                </div>
                <div className="post-card__body">
                    <div className="post-card__tag">
                        <span>{props.category}</span>
                    </div>
                    <h5 className="post-card__title">{props.title}</h5>
                    <span className="post-card__info">
                        <span>{props.author}</span>
                        <span className="post-card__info-divider">·</span>
                        &quot; {props.date} &quot;
                    </span>
                </div>
            </div>
        </>
    )
}

export default BlogCard;