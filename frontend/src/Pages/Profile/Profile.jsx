import React, { useState, useEffect } from 'react'
import './Profile.css'
import ProfileLeft from '../../components/UserProfile/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/LeftSide/ProfileCard/ProfileCard'
import PostSide from '../../components/MiddleSide/Post/Post'
import UserInfoCart from '../../components/UserProfile/InfoCard/InfoCard'
import RightSide from '../../components/RightSideF/RightSide/RightSide'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [userposts, setUserposts] = useState([])
    const params = useParams()

    useEffect(() => {
        axios.get(`${URL}/post/user/posts`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Response => setUserposts(Response.data)).catch(err => console.log(err));
    }, [URL, params])

    return (
        <div className='Profile'>
            <ProfileLeft />
            <div className="ProfileCenter">
                <ProfileCard id={params.id} />
                <div className='userInfoContainer'>
                    <UserInfoCart />
                </div>
                <h4>Your Posts</h4>
                {userposts.map((post, id) => {
                    return (
                        <PostSide data={post} key={id} />
                    )
                })}
            </div>
            <RightSide />
        </div>
    )
}

export default Profile
