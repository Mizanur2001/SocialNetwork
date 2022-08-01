import React, { useState } from 'react'
import LikeImg from '../../../img/like.png'
import NotlikeImg from '../../../img/notlike.png'
import ShareImg from '../../../img/share.png'
import CommentImg from '../../../img/comment.png'
import axios from 'axios'
import './Post.css'


const Post = (data, id) => {
    const [liked, setLiked] = useState(data.data.likes.includes(localStorage.getItem('userId')))
    const [noLikes, setNoLiks] = useState(data.data.likes.length)

    const funcLiked = () => {
        const API = axios.create({ baseURL: `http://localhost:5000` })
        API.put(`/post/${data.data._id}/like`, { userId: localStorage.getItem('userId') }).then(Responce => {
            setLiked((prev) => !prev)
            liked ? setNoLiks((prev) => prev - 1) : setNoLiks((prev) => prev + 1)
        }).catch(err => console.log(err))
    }
    
    return (
        <div className='Post'>
            <div className="detail">
                <span><b>{data.data.userInfo.firstname} {data.data.userInfo.lastname}</b> </span>
                <span><b>@</b>{data.data.userInfo.username}</span>
                <span className='postDesc'> {data.data.desc}</span>
            </div>

            {data.data.image && <img src={process.env.REACT_APP_PUBLIC_IMG_FOLDER + data.data.image} alt={data.data.image} />}

            <div className="PostReact">
                <img src={liked ? LikeImg : NotlikeImg} alt="likeImg" onClick={funcLiked} />
                <img src={CommentImg} alt="likeImg" />
                <img src={ShareImg} alt="likeImg" />
            </div>

            <span className='Likes'>{noLikes} likes</span>
        </div>
    )
}

export default Post
