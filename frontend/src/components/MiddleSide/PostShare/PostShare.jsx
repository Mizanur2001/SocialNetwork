import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import profileImg from '../../../img/profilePic.jpg'
import './PostShare.css'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'
import { ToastContainer, toast } from 'react-toastify';

const PostShare = () => {
    const url = process.env.REACT_APP_BACKEND_URL
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [userInfo, setUserInfo] = useState("")
    const imageRef = useRef()
    const desc = useRef()

    useEffect(() => {
        axios.get(`${url}/user/${localStorage.getItem('userId')}`, {
            headers: {
                "authToken": localStorage.getItem("authToken")
            }
        }).then(Response => setUserInfo(Response.data)).catch(err => console.log(err))
        // eslint-disable-next-line
    }, [])

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img)
        }
    }

    const funcUploadImage = () => {
        const newPost = {
            desc: desc.current.value
        }

        if (desc.current.value === "" && image === null) {
            return -1
        }
        setLoading(true)

        if (image) {
            const formData = new FormData()
            const fileName = Date.now() + "--" + image.name
            newPost.image = fileName
            formData.append('name', fileName)
            formData.append('Photo', image)
            axios.post(`${url}/upload/img`, formData, {
                headers: {
                    "authToken": localStorage.getItem("authToken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then((Response) => { setImage(null); setLoading(false); sendPost() }).catch(err => { console.log(err); setLoading(false) })

            const sendPost = () => {
                axios.post(`${url}/post/`, newPost, {
                    headers: {
                        "authToken": localStorage.getItem("authToken")
                    }
                }).then((Response) => { desc.current.value = ""; setLoading(false); window.location.reload() }).catch(err => { console.log(err); setLoading(false) })
            }

        }
        if (!image) {
            axios.post(`${url}/post/`, newPost, {
                headers: {
                    "authToken": localStorage.getItem("authToken")
                }
            }).then((Response) => { desc.current.value = ""; setLoading(false); window.location.reload() }).catch(err => { console.log(err); setLoading(false) })
        }
    }

    const funcComingSoon = () => {
        toast.info("Coming soon :)");
    }

    return (
        <>
            <div className='PostShare'>
                <img src={userInfo.profilepicture ? process.env.REACT_APP_PUBLIC_IMG_FOLDER + userInfo.profilepicture : profileImg} alt="ProfileImg" />
                <div>
                    <input type="text" required={true} placeholder="what's Happening" ref={desc} />
                    <div className="PostOptions">
                        <div className="option" onClick={() => imageRef.current.click()}>
                            <UilScenery />
                            Photo
                        </div>
                        <div className="option" onClick={funcComingSoon}>
                            <UilPlayCircle />
                            Video
                        </div>
                        <div className="option" onClick={funcComingSoon}>
                            <UilLocationPoint />
                            Location
                        </div>
                        <div className="option" onClick={funcComingSoon}>
                            <UilSchedule />
                            Shedule
                        </div>
                        <button className='btn psBtn' onClick={funcUploadImage} disabled={loading}>{loading ? "Uploading..." : "Share"}</button>
                    </div>
                    <div style={{ display: "none" }}>
                        <input type="file" name='Photo' ref={imageRef} onChange={onImageChange} accept="image/*" />
                    </div>
                    {image && (
                        <div className='previewImage'>
                            <UilTimes onClick={() => { setImage(null) }} />
                            <img src={URL.createObjectURL(image)} alt="shareImage" />
                        </div>
                    )}
                </div>

            </div>
            <div>
                <ToastContainer />
            </div>
        </>
    )
}

export default PostShare
