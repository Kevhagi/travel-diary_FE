import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Components
import NavigationBar from '../components/Navbar'

//CKeditor
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

//Styles
import { Button, Alert } from 'react-bootstrap'

//Images
import Plus from '../images/AddJourney/plus.svg'

//API
import { API } from '../config/api'

//UserContext
import { UserContext } from "../context/userContext";

function AddJourney() {
    const navigate = useNavigate()

    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState(null)
    const [state, reducer] = useContext(UserContext)

    const [form, setForm] = useState({
        title : '',
        desc : '',
        image : '',
        userID : state.user.id
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.type === "file" ? e.target.files : e.target.value,
            userID : state.user.id
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }
    
    const handleChangeEditor = (e, editor) => {
        const data = editor.getData()
        setForm({
            ...form,
            desc : data
        })
    }

    const selectUploadImage = async () => {
        try {
            document.getElementById("uploadImage").click()
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            // Check form
            if (form.image === '') {
                const alert = (
                    <Alert variant='danger' className='py-1 px-1'>
                        <center>Image attachment cannot be empty</center>
                    </Alert>
                )
                setMessage(alert)
                return
            } else if (form.title === '') {
                const alert = (
                    <Alert variant='danger' className='py-1 px-1'>
                        <center>Title cannot be empty</center>
                    </Alert>
                )
                setMessage(alert)
                return
            } else if (form.desc === '') {
                const alert = (
                    <Alert variant='danger' className='py-1 px-1'>
                        <center>Description cannot be empty</center>
                    </Alert>
                )
                setMessage(alert)
                return 
            }
    
            const config = {
                headers: {
                "Content-type": "multipart/form-data",
                },
            };
        
            const formData = new FormData()
            formData.set("image", form.image[0], form.image[0].name)
            formData.set("title", form.title)
            formData.set("desc", form.desc)
            formData.set("userID", form.userID)
        
            const response = await API.post('/journey', formData, config)

            if(response?.status === 200){
                //Bisa ditambahin modal, add more journey/go profile
                navigate('/profile')
            }

        } catch (error) {
            console.log(error)
            console.log(error.response);
            const alert = (
                <Alert variant='danger' className='py-1 px-1'>
                    <center>{error.response.data.message}</center>
                </Alert>
            )
            setMessage(alert)
        }
    }

    return(
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold mb-5'>New Journey</h2>

                <form onSubmit={handleSubmit} id="inputJourney">
                <div className="px-5">
                    <div className="mb-3 d-flex justify-content-center">
                        <div 
                        className="d-flex justify-content-center align-items-center border border-5 rounded" 
                        onClick={()=>{selectUploadImage()}} 
                        style={{width:500, height:300, cursor:"pointer"}}
                        >
                            {form.image !== '' ?
                                <img src={preview} alt="upload" style={{maxWidth:'100%', maxHeight:'100%'}}/>
                            : 
                                <img src={Plus} alt="plus" style={{width:40, opacity:0.2 }}/>
                            }
                            <input 
                                type="file" 
                                id="uploadImage"
                                name="image" 
                                style={{display:'none'}}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    {message && message}
                    <h5 className="fw-bold">Title</h5>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={handleChange}
                        className="mb-4 rounded p-2"
                        style={{
                            border:"1px solid #A6A6A6",
                            width: "100%"
                        }}
                    />

                    <CKEditor 
                        editor={ClassicEditor}
                        onChange={handleChangeEditor}
                    />

                    <div className="d-flex justify-content-end">
                        <Button type="submit" className='px-4 mt-4' variant="primary fw-bold">Add Journey</Button>    
                    </div>
                    
                </div>
                </form>
            </div>
        </div>
    )
}

export default AddJourney