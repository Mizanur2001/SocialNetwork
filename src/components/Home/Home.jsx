import React from 'react'
import ProfileSide from '../ProfileSide/ProfileSide'
import PostSide from '../PostSide/PostSide'
import './Home.css'
const Home = () => {
    return (
        <div className='Home'>
            <ProfileSide />
            <PostSide/>
            <div className="righteSide">righteSide</div>
        </div>
    )
}

export default Home
