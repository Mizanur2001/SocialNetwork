import { Modal, useMantineTheme } from "@mantine/core";
import './ProfileModel.css'
import { useState } from 'react'
import axios from 'axios'
import React from 'react'

const ProfileModel = ({ modelOpen, setModelOpen }) => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [profileImage, setProfileImage] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [updateUser, setUpdateUser] = useState({ _id: localStorage.getItem('userId'), firstname: '', lastname: '', liverin: '', worksat: '', relationship: '', about: '', profilepicture: '', coverpicture: '' })
    const theme = useMantineTheme();

    const funcSubmit = (e) => {
        if (updateUser.firstname === "") { delete (updateUser.firstname) }
        if (updateUser.lastname === "") { delete (updateUser.lastname) }
        if (updateUser.liverin === "") { delete (updateUser.liverin) }
        if (updateUser.worksat === "") { delete (updateUser.worksat) }
        if (updateUser.relationship === "") { delete (updateUser.relationship) }
        if (updateUser.about === "") { delete (updateUser.about) }
        if (updateUser.profilepicture === '') { delete (updateUser.profilepicture) }
        if (updateUser.coverpicture === '') { delete (updateUser.coverpicture) }
        e.preventDefault()

        if (updateUser.profilepicture !== '') {
            axios.post(`${URL}/upload/img`, profileImage, {
                headers: {
                    "authToken": localStorage.getItem("authToken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(Response => console.log(Response)).catch(err => console.log(err))
        }

        if (updateUser.coverpicture !== '') {
            console.log("holla")
            axios.post(`${URL}/upload/img`, coverImage, {
                headers: {
                    "authToken": localStorage.getItem("authToken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(Response => console.log(Response)).catch(err => console.log(err))
        }

        axios.put(`${URL}/user/${localStorage.getItem('userId')}`, updateUser).then(Response => { setModelOpen(false); funcReload() }).catch(err => console.log(err))
    }

    const funcReload = () => {
        document.location.reload()
    }

    const funcOnChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }

    const funcProfileImg = (e) => {
        const formData = new FormData()
        const fileName = Date.now() + "--ProfileImg--" + e.target.files[0].name
        formData.append('name', fileName)
        formData.append('Photo', e.target.files[0])
        setProfileImage(formData)
        setUpdateUser({ ...updateUser, profilepicture: fileName })
    }

    const funcCoverImg = (e) => {
        const formData = new FormData()
        const fileName = Date.now() + "--CoverImg--" + e.target.files[0].name
        formData.append('name', fileName)
        formData.append('Photo', e.target.files[0])
        setCoverImage(formData)
        setUpdateUser({ ...updateUser, coverpicture: fileName })
    }
    return (
        <div>
            <Modal
                overlayColor={
                    theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
                size="55%"
                opened={modelOpen}
                onClose={() => setModelOpen(false)}
            >
                <form className="SignUp" onSubmit={funcSubmit}>
                    <h3 className='gradientText'>Your Info</h3>
                    <div className="InpName">
                        <input type="text" placeholder='First Name' name='firstname' className='InfoInput' onChange={funcOnChange} value={updateUser.firstname} autoComplete='off' />
                        <input type="text" placeholder='Last Name' name='lastname' className='InfoInput' value={updateUser.lastname} onChange={funcOnChange} autoComplete='off' />
                    </div>
                    <div className="InpName">
                        <input type="text" placeholder='Liles In' name='liverin' className='InfoInput' value={updateUser.liverin} onChange={funcOnChange} autoComplete='off' />
                        <input type="text" placeholder='Works At' name='worksat' className='InfoInput' value={updateUser.worksat} onChange={funcOnChange} autoComplete='off' />
                    </div>

                    <input type="text" placeholder='Relationship Status' name='relationship' className='InfoInput w-60' value={updateUser.relationship} onChange={funcOnChange} autoComplete='off' />
                    <input type="text" placeholder='About Yourself' name='about' className='InfoInput w-60' value={updateUser.about} onChange={funcOnChange} autoComplete='off' />

                    <div className="PrfileImgUpdate">
                        <span>Profile Image</span>
                        <input type="file" name='profileImg' onChange={funcProfileImg} />
                        <span>Cover Image</span>
                        <input type="file" name="coverImg" onChange={funcCoverImg} />
                    </div>
                    <div className='bottomPartSignUp'>
                        <button className="btn SignUpBtn" type='submit'>Update</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ProfileModel
