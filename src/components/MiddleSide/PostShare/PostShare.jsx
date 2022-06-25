import React, { useState, useRef } from 'react'
import profileImg from '../../../img/sruti.jpg'
import './PostShare.css'
import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from '@iconscout/react-unicons'

const PostShare = () => {
    const [image, setImage] = useState(null)
    const imageRef = useRef()
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
                image: URL.createObjectURL(img)
            })
        }
    }

    return (
        <div className='PostShare'>
            <img src={profileImg} alt="ProfileImg" />
            <div>
                <input type="text" placeholder="what's Happening" />
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
                    <button className='btn psBtn'>Share</button>
                </div>
                <div style={{ display: "none" }}>
                    <input type="file" name='myPhoto' ref={imageRef} onChange={onImageChange} />
                </div>
                {image && (
                    <div className='previewImage'>
                        <UilTimes onClick={() => { setImage(null) }} />
                        <img src={image.image} alt="shareImage" />
                    </div>
                )}
            </div>

        </div>
    )
}

export default PostShare
