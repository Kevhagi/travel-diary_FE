import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Components
import NavigationBar from '../components/Navbar'

//CKeditor
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

//Styles
import { Button, Alert } from 'react-bootstrap'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

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
    const [details, setDetails] = useState({
        image : '',
        title : '',
        desc : ''
    })

    document.title = `Edit '${details.title}' | The Journey`

    const [state, reducer] = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const {id} = useParams()

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

            setLoading(true)

            // Check form
            if (form.image === '') {
                const config = {
                    headers: {
                    "Content-type": "application/json"
                    }
                }

                let data
                if (form.title !== '') {
                    data = {
                        title : form.title,
                        desc : form.desc
                    }
                } else if (form.title === '') {
                    data = {
                        desc : form.desc
                    }
                }

                const response = await API.patch(`/journey-noimage/${id}`, data, config)

                if(response?.status === 200){
                    navigate('/profile')
                }
            } else if (form.image !== '') {
                const config = {
                    headers: {
                    "Content-type": "multipart/form-data"
                    }
                }

                const formData = new FormData()
                formData.set("image", form.image[0], form.image[0].name)
                if (form.title !== '') {
                    formData.set("title", form.title) 
                }
                formData.set("desc", form.desc)

                const response = await API.patch(`/journey/${id}`, formData, config)

                if(response?.status === 200){
                    navigate('/profile')
                }
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

    const getDetails = async (e) => {
        try {
            const response = await API.get(`/journey/${id}`)
            setDetails({
                image : response.data.image,
                title : response.data.title,
                desc : response.data.desc
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDetails()
    }, [])

    return(
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold mb-5'>Edit Journey</h2>

                <form onSubmit={handleSubmit} id="inputJourney">
                <div className="px-sm-2 px-md-5">
                    <div className="mb-3 d-flex justify-content-center">
                        <div 
                        className="d-flex justify-content-center align-items-center border border-5 rounded" 
                        onClick={()=>{selectUploadImage()}} 
                        style={{width:500, height:300, cursor:"pointer"}}
                        >
                            {form.image !== '' ?
                                <img src={preview} alt="upload" style={{maxWidth:'100%', maxHeight:'100%'}}/>
                            : 
                                <img src={details.image} alt="plus" style={{maxWidth:'100%', maxHeight:'100%'}}/>
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
                        placeholder={details.title}
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
                        data={details.desc}
                        editor={ClassicEditor}
                        onChange={handleChangeEditor}
                    />

                    <div className="d-flex justify-content-end">
                        <Box sx={{ m: 1, position: 'relative' }}>
                            {loading === false ?
                                <Button type="submit" className='px-4 mt-4' variant="primary fw-bold">Edit Journey</Button>
                            :
                                <>
                                    {loading && (
                                        <>
                                        <Button type="submit" className='px-4 mt-4' variant="primary fw-bold" disabled>Edit Journey</Button>
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginLeft: '-12px',
                                            }}
                                        />
                                        </>
                                    )}
                                </>
                            }
                        </Box>
                    </div>
                    
                </div>
                </form>
            </div>
        </div>
    )
}

export default AddJourney