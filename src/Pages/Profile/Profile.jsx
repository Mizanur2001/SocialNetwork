import React from 'react'
import './Profile.css'
import ProfileLeft from '../../components/UserProfile/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/LeftSide/ProfileCard/ProfileCard'
import PostSide from '../../components/MiddleSide/PostSide/PostSide'
import RightSide from '../../components/RightSideF/RightSide/RightSide'

const Profile = () => {
    return (
        <div className='Profile'>
            <ProfileLeft />
            <div className="ProfileCenter">
                <ProfileCard />
                <PostSide />
            </div>
            <RightSide />
        </div>
    )
}

export default Profile
