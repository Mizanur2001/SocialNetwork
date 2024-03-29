import { Modal, useMantineTheme } from "@mantine/core";
import './ProfileModel.css'
import { useState } from 'react'
import axios from 'axios'
import React from 'react'
import Compressor from 'compressorjs';

const ProfileModel = ({ modelOpen, setModelOpen }) => {
    const URL = process.env.REACT_APP_BACKEND_URL
    const [loading, setLoading] = useState(false)
    const [profileImage, setProfileImage] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [updateUser, setUpdateUser] = useState({ _id: localStorage.getItem('userId'), firstname: '', lastname: '', liverin: '', worksat: '', relationship: '', about: '', profilepicture: '', coverpicture: '' })
    const theme = useMantineTheme();

    const funcSubmit = (e) => {
        setLoading(true)
        if (updateUser.firstname === "") { delete (updateUser.firstname) }
        if (updateUser.lastname === "") { delete (updateUser.lastname) }
        if (updateUser.liverin === "") { delete (updateUser.liverin) }
        if (updateUser.worksat === "") { delete (updateUser.worksat) }
        if (updateUser.relationship === "") { delete (updateUser.relationship) }
        if (updateUser.about === "") { delete (updateUser.about) }
        if (updateUser.profilepicture === '') { delete (updateUser.profilepicture) }
        if (updateUser.coverpicture === '') { delete (updateUser.coverpicture) }
        e.preventDefault()

        if (updateUser.profilepicture) {
            console.log("holla1")
            axios.post(`${URL}/upload/img`, profileImage, {
                headers: {
                    "authToken": localStorage.getItem("authToken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(Response => { updateUserServer(); setLoading(false) }).catch(err => console.log(err))
        }

        if (updateUser.coverpicture) {
            console.log("holla2")
            axios.post(`${URL}/upload/img`, coverImage, {
                headers: {
                    "authToken": localStorage.getItem("authToken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(Response => { updateUserServer(); setLoading(false) }).catch(err => console.log(err))
        }

        const updateUserServer = () => {
            axios.put(`${URL}/user/${localStorage.getItem('userId')}`, updateUser).then(Response => { setModelOpen(false); funcReload(); setLoading(false) }).catch(err => console.log(err))
        }


        if (!updateUser.coverpicture && !updateUser.profilepicture) {
            updateUserServer()
        }

    }

    const funcReload = () => {
        document.location.reload()
    }

    const funcOnChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value })
    }

    const funcProfileImg = (e) => {

        //compressing the image 
        if (e.target.files[0].size / (1024 * 1024) < 6) {
            new Compressor(e.target.files[0], {
                quality: 0.6, success(result) {
                    const formData = new FormData()
                    const fileName = Date.now() + "--ProfileImg--" + e.target.files[0].name
                    formData.append('name', fileName)
                    formData.append('Photo', result)
                    setProfileImage(formData)
                    setUpdateUser({ ...updateUser, profilepicture: fileName })
                }, error(err) { console.log(err) }
            })
        }
        else {
            new Compressor(e.target.files[0], {
                quality: 0.09, success(result) {
                    const formData = new FormData()
                    const fileName = Date.now() + "--ProfileImg--" + e.target.files[0].name
                    formData.append('name', fileName)
                    formData.append('Photo', result)
                    setProfileImage(formData)
                    setUpdateUser({ ...updateUser, profilepicture: fileName })
                }, error(err) { console.log(err) }
            })
        }
    }

    const funcCoverImg = (e) => {
        if (e.target.files[0].size / (1024 * 1024) < 6) {
            new Compressor(e.target.files[0], {
                quality: 0.6, success(result) {
                    const formData = new FormData()
                    const fileName = Date.now() + "--CoverImg--" + e.target.files[0].name
                    formData.append('name', fileName)
                    formData.append('Photo', result)
                    setCoverImage(formData)
                    setUpdateUser({ ...updateUser, coverpicture: fileName })
                }, error(err) { console.log(err) }
            })
        }
        else {
            new Compressor(e.target.files[0], {
                quality: 0.09, success(result) {
                    const formData = new FormData()
                    const fileName = Date.now() + "--CoverImg--" + e.target.files[0].name
                    formData.append('name', fileName)
                    formData.append('Photo', result)
                    setCoverImage(formData)
                    setUpdateUser({ ...updateUser, coverpicture: fileName })
                }, error(err) { console.log(err) }
            })
        }
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
                        <input type="text" placeholder='Lives In' name='liverin' className='InfoInput' value={updateUser.liverin} onChange={funcOnChange} autoComplete='off' />
                        <input type="text" placeholder='Works At' name='worksat' className='InfoInput' value={updateUser.worksat} onChange={funcOnChange} autoComplete='off' />
                    </div>

                    <input type="text" placeholder='Relationship Status' name='relationship' className='InfoInput w-60' value={updateUser.relationship} onChange={funcOnChange} autoComplete='off' />
                    <input type="text" placeholder='About Yourself' name='about' className='InfoInput w-60' value={updateUser.about} onChange={funcOnChange} autoComplete='off' />

                    <div className="PrfileImgUpdate">
                        <span>Profile Image</span>
                        <input type="file" name='profileImg' onChange={funcProfileImg} accept="image/*" />
                        <span>Cover Image</span>
                        <input type="file" name="coverImg" onChange={funcCoverImg} accept='image/*' />
                    </div>
                    <div className='bottomPartSignUp'>
                        <button className="btn SignUpBtn" type='submit' disabled={loading}>{loading ? "Uploading..." : "Update"}</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default ProfileModel
