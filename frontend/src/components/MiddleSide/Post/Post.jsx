import React, { useState } from 'react'
import LikeImg from '../../../img/like.png'
import NotlikeImg from '../../../img/notlike.png'
import ShareImg from '../../../img/share.png'
import CommentImg from '../../../img/comment.png'
import axios from 'axios'
import './Post.css'


const Post = (data) => {
    const [liked, setLiked] = useState(data.data.likes.includes(localStorage.getItem('userId')))
    const [noLikes, setNoLiks] = useState(data.data.likes.length)
    const [showComments, setShowComments] = useState(false)
    const [commentInfo, setCommentInfo] = useState({ comment: "", username: localStorage.getItem('userName'), userId: localStorage.getItem('userId') })
    const [loading, setLoading] = useState(false)

    const funcLiked = () => {
        const API = axios.create({ baseURL: `http://localhost:5000` })
        API.put(`/post/${data.data._id}/like`, { userId: localStorage.getItem('userId') }, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Responce => { }).catch(err => console.log(err))

        setLiked((prev) => !prev)
        liked ? setNoLiks((prev) => prev - 1) : setNoLiks((prev) => prev + 1)
    }

    const funcComment = () => {
        setShowComments((prev) => !prev)
    }

    const funcOnChange = (e) => {
        setCommentInfo({ ...commentInfo, [e.target.name]: e.target.value })
    }

    const funcSendComment = () => {
        if (commentInfo.comment !== '') {
            setLoading(true)
            axios.put(`http://localhost:5000/post/${data.data._id}/comment`, { commentInfo }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Response => { setCommentInfo({ ...commentInfo, comment: "" }); setLoading(false) }).catch(err => console.log(err))
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
                <img src={CommentImg} alt="likeImg" onClick={funcComment} />
                <img src={ShareImg} alt="likeImg" />
            </div>

            <span className='Likes'>{noLikes} likes</span>

            {showComments && <div className='commentBox'>
                <h4>comments({data.data.comment ? data.data.comment.length : '0'})</h4>
                <div className="allComments">
                    {data.data.comment ? data.data.comment.length === 0 ? <p style={{ marginLeft: '10px' }}>No Comments</p> : data.data.comment.map((comment, id) => {
                        return (
                            <div key={id}>
                                <div className='comment'><b>@{comment.username} : </b>
                                    {comment.comment}
                                </div>
                            </div>
                        )
                    }) : <p style={{ marginLeft: '10px' }}>No Comments</p>}
                </div>
                <hr />
                <div className='commentSender'>
                    <input type="text" autoComplete='off' placeholder='Enter you comment' onChange={funcOnChange} name='comment' value={commentInfo.comment} />
                    <button className='btn commentBtn' onClick={funcSendComment} disabled={loading}>{loading ? "Uploading..." : 'Comment'}</button>
                </div>
            </div>}
        </div>
    )
}

export default Post
