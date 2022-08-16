import React, { useState, useEffect } from 'react'
import './Profile.css'
import ProfileLeft from '../../components/UserProfile/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/LeftSide/ProfileCard/ProfileCard'
import PostSide from '../../components/MiddleSide/Post/Post'
import UserInfoCart from '../../components/UserProfile/InfoCard/InfoCard'
import RightSide from '../../components/RightSideF/RightSide/RightSide'
import axios from 'axios'

const Profile = () => {
    const [userposts, setUserposts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/post/user/posts', {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Response => setUserposts(Response.data)).catch(err => console.log(err))
    }, [])

    return (
        <div className='Profile'>
            <ProfileLeft />
            <div className="ProfileCenter">
                <ProfileCard />
                <div className='userInfoContainer'>
                    <UserInfoCart />
                </div>
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
