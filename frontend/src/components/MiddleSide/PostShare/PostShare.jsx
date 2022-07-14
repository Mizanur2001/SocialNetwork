import React, { useState, useRef } from 'react'
import axios from 'axios'
import profileImg from '../../../img/sruti.jpg'
import './PostShare.css'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'

const PostShare = () => {
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const desc = useRef()
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

        if (image) {
            const formData = new FormData()
            const fileName = Date.now() + "--" + image.name
            newPost.image = fileName
            formData.append('name', fileName)
            formData.append('Photo', image)
            axios.post('http://localhost:5000/upload/img', formData, {
                Headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((Response) => { setImage(null) }).catch(err => console.log(err))
        }

        console.log(newPost)
    }

    return (
        <div className='PostShare'>
            <img src={profileImg} alt="ProfileImg" />
            <div>
                <input type="text" placeholder="what's Happening" ref={desc} required />
                <div className="PostOptions">
                    <div className="option" onClick={() => imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option">
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option">
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option">
                        <UilSchedule />
                        Shedule
                    </div>
                    <button className='btn psBtn' onClick={funcUploadImage}>Share</button>
                </div>
                <div style={{ display: "none" }}>
                    <input type="file" name='Photo' ref={imageRef} onChange={onImageChange} />
                </div>
                {image && (
                    <div className='previewImage'>
                        <UilTimes onClick={() => { setImage(null) }} />
                        <img src={URL.createObjectURL(image)} alt="shareImage" />
                    </div>
                )}
            </div>

        </div>
    )
}

export default PostShare
