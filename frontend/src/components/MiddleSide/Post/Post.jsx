import React, { useState, useEffect } from 'react'
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
    const [allComments, setAllComments] = useState([])
    const [noComment, setNoComment] = useState(0)
    const [editDeleteDisplay, setEditDeleteDisplay] = useState(false)
    const [threeDotsDisplay, setThreeDotsDisplay] = useState(false)
    const [editPostContainerDispaly, setEditPostContainerDispaly] = useState(false)
    const [editPost, setEditPost] = useState({
        userId: localStorage.getItem('userId'),
        desc: ""
    })
    const [postDesc, setPostDesc] = useState([])

    useEffect(() => {
        data.data.comment ? setAllComments(data.data.comment) : setAllComments([])
        data.data.comment ? setNoComment(data.data.comment.length) : setNoComment(0)
        data.data.userId === localStorage.getItem('userId') ? setThreeDotsDisplay(true) : setThreeDotsDisplay(false)
        setPostDesc(data.data.desc)
        // eslint-disable-next-line
    }, [])

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

            const newComments = {
                comment: commentInfo.comment, username: localStorage.getItem('userName'), userId: localStorage.getItem('userId')
            }

            setAllComments(oldComments => [...oldComments, newComments])
            let commentNo = noComment
            setNoComment(++commentNo)
        }
    }

    const funcEditDeleteContainer = () => {
        setEditDeleteDisplay(prev => !prev)
    }

    const funcEdit = () => {
        setEditPostContainerDispaly(prev => !prev)
    }

    const funcDelete = () => {
        if (data.data.userId === localStorage.getItem('userId')) {
            axios.delete(`http://localhost:5000/post/${data.data._id}`, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                },
                data: {
                    userId: localStorage.getItem('userId')
                }
            }).then((Response) => { window.location.reload() }).catch(err => console.log(err))
        }
        else {
            console.log("access denied")
        }
    }


    const funcOnChangeEditInput = (e) => {
        setEditPost({ ...editPost, [e.target.name]: e.target.value })
    }

    const funcEditPost = () => {
        if (editPost.desc !== '') {
            setLoading(true)
            axios.put(`http://localhost:5000/post/${data.data._id}`, { editPost }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Response => { setEditPost({ ...editPost, desc: "" }, setPostDesc(editPost.desc)); setLoading(false) }).catch(err => console.log(err))
        }

        console.log(data.data.desc)
    }

    return (
        <div className='Post'>
            <div className="detail">
                <div className='nameUsernameThreedotsContainer'>
                    <div className='nameUsernameContainer'>
                        <span><b>{data.data.userInfo.firstname} {data.data.userInfo.lastname}</b> </span>
                        <span><b>@</b>{data.data.userInfo.username}</span>
                    </div>
                    {threeDotsDisplay && <span className="material-symbols-outlined pointer" onClick={funcEditDeleteContainer}> more_vert </span>}
                </div>
                <div className='descDeleteEditContainer'>
                    <span className='postDesc'> {postDesc}</span>
                    {editDeleteDisplay && <div className='editDeleteContainer'>
                        <span className="material-symbols-outlined pointer" onClick={funcEdit}>
                            edit
                        </span >
                        <hr />
                        <span className="material-symbols-outlined pointer" onClick={funcDelete}>
                            delete
                        </span>
                    </div>}
                </div>
            </div>

            {editPostContainerDispaly && <div className='editPostContainer'>
                <input type="text" placeholder='Edit Description' name='desc' autoCapitalize='off' onChange={funcOnChangeEditInput} value={editPost.desc} />
                <button className='btn editBtn' onClick={funcEditPost} disabled={loading}>{loading ? 'Uploading' : "Edit"} </button>
            </div>}

            {data.data.image && <img src={process.env.REACT_APP_PUBLIC_IMG_FOLDER + data.data.image} alt={data.data.image} />}

            <div className="PostReact">
                <img src={liked ? LikeImg : NotlikeImg} alt="likeImg" onClick={funcLiked} />
                <img src={CommentImg} alt="likeImg" onClick={funcComment} />
                <img src={ShareImg} alt="likeImg" />
            </div>

            <span className='Likes'>{noLikes} likes | {noComment} Comments</span>

            {showComments && <div className='commentBox'>
                <h4>comments({noComment})</h4>
                <div className="allComments">
                    {allComments.map((comment, id) => {
                        return (
                            <div key={id}>
                                <div className='comment'><b>@{comment.username} : </b>
                                    {comment.comment}
                                </div>
                            </div>
                        )
                    })}
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
