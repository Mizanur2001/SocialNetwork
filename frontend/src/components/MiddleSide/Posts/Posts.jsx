import React, { useEffect, useState } from 'react'
import { Loader } from '@mantine/core';
import './Posts.css'
import Post from '../Post/Post'
import axios from 'axios'
import noTimeLineImg from '../../../img/noTimeLine.jpg'


const Posts = () => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [timelines, setTimelines] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (localStorage.getItem('authToken')) {
            axios.get(`${URL}/post/62bc18c7d70675a780966bfc/timeline`, {
                headers: {
                    "authToken": localStorage.getItem("authToken")
                }
            }).then((Response) => { setTimelines(Response.data); setLoading(false) }).catch(err => console.log(err))
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {loading && <div className='loder'>
                <Loader color="grape" />
            </div>}

            {!loading && timelines.length === 0 && <div className='noTimeLineDiv'>
                <img src={noTimeLineImg} alt="notimeLine" />
                <h3> No TimeLime Found :( </h3>
            </div>}

            <div className='Posts'>
                {timelines.map((post, id) => {
                    return (
                        <Post data={post} key={id} />
                    )
                })}
            </div>
        </>
    )
}

export default Posts
