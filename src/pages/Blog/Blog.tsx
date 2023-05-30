import BlogCard from "@/components/BlogCard";
import { useState } from "react";
import "./Blog.scss";
import { MenuList } from "@/components/MenuList";

const Blog = () => {

    const post = {
        category: "Category 1",
        title: "Title 1",
        author: "Author 1",
        date: 1234567890
    }

    const [posts, setPosts] = useState<any[]>([
        {
            category: "Category 1",
            title: "Title 1",
            author: "Author 1",
            date: 1234567890
        },
        {
            category: "Category 2",
            title: "Title 2",
            author: "Author 2",
            date: 1234567890
        },
        {
            category: "Category 3",
            title: "Title 3",
            author: "Author 3",
            date: 1234567890
        },
        {
            category: "Category 4",
            title: "Title 4",
            author: "Author 4",
            date: 1234567890
        },
        {
            category: "Category 1",
            title: "Title 1",
            author: "Author 1",
            date: 1234567890
        },
        {
            category: "Category 2",
            title: "Title 2",
            author: "Author 2",
            date: 1234567890
        },
        {
            category: "Category 3",
            title: "Title 3",
            author: "Author 3",
            date: 1234567890
        },
        {
            category: "Category 4",
            title: "Title 4",
            author: "Author 4",
            date: 1234567890
        },
        {
            category: "Category 1",
            title: "Title 1",
            author: "Author 1",
            date: 1234567890
        },
        {
            category: "Category 2",
            title: "Title 2",
            author: "Author 2",
            date: 1234567890
        },
        {
            category: "Category 3",
            title: "Title 3",
            author: "Author 3",
            date: 1234567890
        },
        {
            category: "Category 4",
            title: "Title 4",
            author: "Author 4",
            date: 1234567890
        },
        {
            category: "Category 1",
            title: "Title 1",
            author: "Author 1",
            date: 1234567890
        },
        {
            category: "Category 2",
            title: "Title 2",
            author: "Author 2",
            date: 1234567890
        },
        {
            category: "Category 3",
            title: "Title 3",
            author: "Author 3",
            date: 1234567890
        },
    ]);


    return (
        <>
            <nav className={'navigation'}>
                <h1 className={'logo'}>Unsplash</h1>
                <div className='navWrap'>
                    <MenuList/>
                </div>
            </nav>

            <div className={'header'}>
                <h1 className={'title'}>Unsplash Blog</h1>
                <h2 className={'subtitle'}>Stories from the community powering the internet’s visuals</h2>
            </div>

            <main>
                <div className="section">
                    <div className="grid-container">
                        <h3 className="section__title">Feutured</h3>
                        <div className="grid-featured">
                            <BlogCard {...post}/>
                            <BlogCard {...post}/>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="grid-container">
                        <h3 className="section__title">Latest from the team</h3>
                        <div className="grid-feed">
                            {posts.map((post, index) => 
                                <BlogCard key={index} {...post}/>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="grid-container section--foter">
                <div className="footer">
                    <div className="footer__logo">
                        <a href="#"></a>
                        <span>Make something awesome</span>
                    </div>
                    <div className="footer__links">
                        <ul>
                            <li><a href="#">About</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Blog;