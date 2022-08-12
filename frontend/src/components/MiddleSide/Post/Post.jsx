import React, { useState } from 'react'
import LikeImg from '../../../img/like.png'
import NotlikeImg from '../../../img/notlike.png'
import ShareImg from '../../../img/share.png'
import CommentImg from '../../../img/comment.png'
import axios from 'axios'
import './Post.css'
import { comments } from '../../../Data/commentData'


const Post = (data, id) => {
    const [liked, setLiked] = useState(data.data.likes.includes(localStorage.getItem('userId')))
    const [noLikes, setNoLiks] = useState(data.data.likes.length)
    const [showComments, setShowComments] = useState(false)

    const funcLiked = () => {
        const API = axios.create({ baseURL: `http://localhost:5000` })
        API.put(`/post/${data.data._id}/like`, { userId: localStorage.getItem('userId') }, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Responce => {
        }).catch(err => console.log(err))

        setLiked((prev) => !prev)
        liked ? setNoLiks((prev) => prev - 1) : setNoLiks((prev) => prev + 1)
    }

    const funcComment = () => {
        setShowComments((prev) => !prev)
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
                <img src={CommentImg} alt="likeImg" onClick={funcComment} />
                <img src={ShareImg} alt="likeImg" />
            </div>

            <span className='Likes'>{noLikes} likes</span>

            {showComments && <div className='commentBox'>
                <h4>comments(5)</h4>
                <div className="allComments">
                    {comments.map((comment, id) => {
                        return (
                            <div key={id}>
                                <div className='comment'><b>{comment.userName} : </b>
                                    {comment.comment}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <hr />
                <div className='commentSender'>
                    <input type="text" autoComplete='off' placeholder='Enter you comment' />
                    <button className='btn commentBtn'>Comment</button>
                </div>
            </div>}
        </div>
    )
}

export default Post
