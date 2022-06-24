import React from 'react'
import './FollowersCart.css'
import { Followers } from '../../Data/FollowersData'

const FollowersCart = () => {
    return (
        <div className='FollowersCarts'>
            <h3>Following you</h3>
            {Followers.map((follower, id) => {
                return (
                    <div className="follower">
                        <div>
                            <img src={follower.img} alt="followerImg" className='followerImg' />
                            <div className="name">
                                <span>{follower.name}</span>
                                <span>@{follower.userName}</span>
                            </div>
                        </div>
                        <button className='btn followBtn'>
                            Follow
                        </button>
                    </div>
                )
            })}
            <span>See More</span>
        </div>
    )
}

export default FollowersCart
