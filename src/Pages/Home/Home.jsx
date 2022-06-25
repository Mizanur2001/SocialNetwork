import React from 'react'
import ProfileSide from '../../components/LeftSide/ProfileSide/ProfileSide'
import PostSide from '../../components/MiddleSide/PostSide/PostSide'
import RightSide from '../../components/RightSideF/RightSide/RightSide'
import './Home.css'
// LeftSide/ProfileSide/ProfileSide
const Home = () => {
    return (
        <div className='Home'>
            <ProfileSide />
            <PostSide />
            <RightSide />
        </div>
    )
}

export default Home
