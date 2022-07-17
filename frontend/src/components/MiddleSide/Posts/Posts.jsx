import React, { useEffect, useState } from 'react'
import './Posts.css'
// eslint-disable-next-line
import PostData from '../../../Data/PostsData'
import Post from '../Post/Post'
import axios from 'axios'


const Posts = () => {
    const [timelines, setTimelines] = useState([])

    useEffect(() => {

        if (localStorage.getItem('authToken')) {
            axios.get(`http://localhost:5000/post/62bc18c7d70675a780966bfc/timeline`, {
                headers: {
                    "authToken":localStorage.getItem("authToken")
                }
            }).then(Response => setTimelines(Response.data)).catch(err => console.log(err))
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='Posts'>
            {timelines.map((post, id) => {
                return (
                    <Post data={post} key={id} />
                )
            })}
        </div>
    )
}

export default Posts
