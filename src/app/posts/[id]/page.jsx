import React from 'react';
import style from './../post.module.css'
export const getSinglePost = async(post_id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post_id}`)
    const data = await res.json()
    return data;
}

export async function generateMetadata({ params}) {
    // read route params
    const { id } = await params
 
    // fetch data
    const singlePost = await getSinglePost(id)
   
    return {
      title: singlePost.title,
      description: singlePost.body,
    }
  }
   
  

const SinglePost = async ({params}) => {
    const p = await params;
    const singlePost = await getSinglePost(p.id)
    return (
        <div>
           <p> {JSON.stringify(singlePost)}</p> 
           <h1 className={`text-2xl font-bold mt-6 ${style["post-title"]}`}>{singlePost.title}</h1>
           <p className={`font-semibold mt-3 ${style["post-description"]}`}>{singlePost.body}</p>
        </div>
    );
};

export default SinglePost;