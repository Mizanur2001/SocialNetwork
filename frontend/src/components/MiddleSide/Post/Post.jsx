import React, { useState } from 'react'
import LikeImg from '../../../img/like.png'
import NotlikeImg from '../../../img/notlike.png'
import ShareImg from '../../../img/share.png'
import CommentImg from '../../../img/comment.png'
import './Post.css'


const Post = (data, id) => {
    const [liked, setLiked] = useState(false)
    const funcLiked = () => {
        if (liked) {
            setLiked(false)
        }
        else{
            setLiked(true)
        }
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

            <span className='Likes'>{data.data.likes.length} likes</span>
        </div>
    )
}

export default Post
