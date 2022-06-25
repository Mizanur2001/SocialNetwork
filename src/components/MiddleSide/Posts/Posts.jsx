import React from 'react'
import './Posts.css'
import PostData from '../../../Data/PostsData'
import Post from '../Post/Post'


const Posts = () => {
    return (
        <div className='Posts'>
            {PostData.map((post, id) => {
                return (
                    <Post data={post} id={id} />
                )
            })}
        </div>
    )
}

export default Posts
