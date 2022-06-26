import React from 'react'
import LikeImg from '../../../img/like.png'
import NotlikeImg from '../../../img/notlike.png'
import ShareImg from '../../../img/share.png'
import CommentImg from '../../../img/comment.png'
import './Post.css'


const Post = (data, id) => {
    return (
        <div className='Post'>
            <img src={data.data.img} alt="" />

            <div className="PostReact">
                <img src={data.data.liked ? LikeImg : NotlikeImg} alt="likeImg" />
                <img src={CommentImg} alt="likeImg" />
                <img src={ShareImg} alt="likeImg" />
            </div>

            <span className='Likes'>{data.data.likes} likes</span>

            <div className="detail">
                <span><b>{data.data.name}</b> </span>
                <span> {data.data.desc}</span>
            </div>

        </div>
    )
}

export default Post
