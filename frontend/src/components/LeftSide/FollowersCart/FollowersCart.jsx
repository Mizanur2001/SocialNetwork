import React, { useState, useEffect } from 'react'
import './FollowersCart.css'
// import { Followers } from '../../../Data/FollowersData'
import axios from 'axios'

const FollowersCart = () => {
    const defaulfImg = 'https://img.freepik.com/free-vector/user-follower-icons-social-media-notification-icon-speech-bubbles-vector-illustration_56104-847.jpg?t=st=1659452798~exp=1659453398~hmac=37745248bd89ff166846ddbc085f2fb9dda32a3250a61cb5c2ed356333ff8ff9'
    const [allUser, setAllUsers] = useState([]);
    const [following, setfollowing] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users/', {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => setAllUsers(Responce.data)).catch(err => console.log(err))

        axios.get(`http://localhost:5000/user/${localStorage.getItem('userId')}`, {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => setfollowing(Responce.data.following)).catch(err => console.log(err))
    }, [])

    const funcFollowUnfollow = (id) => {
        if (!following.includes(id)) {
            axios.put(`http://localhost:5000/user/${id}/follow`, {
                _id: localStorage.getItem('userId')
            }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Responce => console.log(Responce.data)).catch(err => console.log(err))
            window.location.reload()
        }
        if (following.includes(id)) {
            axios.put(`http://localhost:5000/user/${id}/unfollow`, {
                _id: localStorage.getItem('userId')
            }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Responce => console.log(Responce.data)).catch(err => console.log(err))
            window.location.reload()
        }
    }

    return (
        <div className='FollowersCarts'>
            <h3>All Users</h3>
            {allUser.map((follower, id) => {
                return (
                    <div className="follower" key={id}>
                        <div>
                            <img src={follower.img ? follower.img : defaulfImg} alt="followerImg" className='followerImg' />
                            <div className="name">
                                <span>{follower.firstname} {follower.lastname}</span>
                                <span>@{follower.username}</span>
                            </div>
                        </div>
                        <button className='btn followBtn' onClick={() => funcFollowUnfollow(follower._id)}>
                            {following.includes(follower._id) ? 'Unfollow' : "Follow"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default FollowersCart
