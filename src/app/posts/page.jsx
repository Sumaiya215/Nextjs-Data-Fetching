import Link from "next/link";
import style from './post.module.css'
export const getPosts = async() => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await res.json()
    return data;
}

export const metadata = {
    title: "All Posts ",
    description: "Loading JSON placeholder posts using server component",
  };

const Posts = async () => {
    const posts = await getPosts();
    return (
        <div className="grid grid-cols-4 gap-12">
            {/* <p>{JSON.stringify(posts)}</p> */}
            {
                posts.map((singlePost)=> {
                    return (
                      
                            <div key={singlePost.id} className="border-2 border-gray-600">
                                <p className={`font-bold text-xl mb-2 ${style["post-title"]}`}>{singlePost.title}</p>
                                <p className="mb-4 testing-css-class">{singlePost.body}</p>
                                <Link href={`/posts/${singlePost.id}`}>
                                  <button className="button bg-green-400">Details</button>
                                </Link>
                            </div>
                      
                    )
                }
            )}
        </div>
    );
};

export default Posts;