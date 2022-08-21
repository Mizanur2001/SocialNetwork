import React, { useState, useEffect } from 'react'
import './FollowersCart.css'
import defaulfImg from '../../../img/profilePic.jpg'
import Seach from '../LogoSearch/LogoSearch'
import { Loader } from '@mantine/core';
import axios from 'axios'

const FollowersCart = () => {
    const URL = "http://localhost:5000"
    const [allUser, setAllUsers] = useState([]);
    const [following, setfollowing] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get(`${URL}/users/`, {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => { setAllUsers(Responce.data); setLoading(false) }).catch(err => console.log(err))

        axios.get(`${URL}/user/${localStorage.getItem('userId')}`, {
            headers: {
                'authToken': localStorage.getItem('authToken')
            }
        }).then(Responce => setfollowing(Responce.data.following)).catch(err => console.log(err))
    }, [])

    const funcFollowUnfollow = (id) => {
        if (!following.includes(id)) {
            axios.put(`${URL}/user/${id}/follow`, {
                _id: localStorage.getItem('userId')
            }, {
                headers: {
                    'authToken': localStorage.getItem('authToken')
                }
            }).then(Responce => console.log(Responce.data)).catch(err => console.log(err))
            window.location.reload()
        }
        if (following.includes(id)) {
            axios.put(`${URL}/user/${id}/unfollow`, {
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
            <div className="seach">
                <Seach data={allUser} />
            </div>
            <h3>All Users</h3>
            {loading && <div className='loder'>
                <Loader color="grape" />
            </div>}
            {allUser.map((follower, id) => {
                return (
                    <div className="follower" key={id}>
                        <div>
                            <img src={follower.profilepicture ? process.env.REACT_APP_PUBLIC_IMG_FOLDER + follower.profilepicture : defaulfImg} alt="followerImg" className='followerImg' />
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
