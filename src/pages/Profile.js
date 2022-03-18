import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from 'react-avatar';

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import Trash from '../images/Profile/trash.svg'
import Upload from '../images/Profile/upload.svg'
import Edit from '../images/Profile/edit.svg'

//styles
import { Row, Button } from 'react-bootstrap'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Profile() {
    const [state, dispatch] = useContext(UserContext);
    const [post, setPost] = useState([])
    const [message, setMessage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    //snackbar materialUI
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    const [user, setUser] = useState({
        fullName : '',
        email : '',
        id : '',
        image : ''
    })

    const getProfile = async() => {
        try {
            const response = await API.get(`/profile/${state.user.id}`)
            setUser(response.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.type === "file" ? e.target.files : e.target.value,
            userID : state.user.id
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                "Content-type": "multipart/form-data"
                }
            }

            setLoading(true)

            if (user.image !== null){
                const formData = new FormData()
                formData.set("image", user.image[0], user.image[0].name)
                
                const response = await API.patch(`/profile/${user.id}`, formData, config)
                if(response?.status === 200){
                    document.location.reload(true)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPosts = async () => {
        try {
            const response = await API.get(`/profile/${state.user.id}/journey`)
            setPost(response.data.data)
        } catch (error) {
            console.log(error);
            console.log(error.response);
        }
    }

    const selectUploadImage = async () => {
        try {
            document.getElementById("uploadImage").click()
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemove = async (journeyID) => {
        try {
            const response = await API.delete(`/journey/${journeyID}`)

            if (response?.status === 200) {
                const messageAlert = (
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {response.data.message}
                    </Alert>
                )
                setMessage(messageAlert)
                handleClick()
                document.location.reload(true)
            }
            
        } catch (error) {
            console.log(error);
            const messageAlert = (
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {error.response.data.message}
                </Alert>
            ) 
            setMessage(messageAlert)
            handleClick()
        }
    }

    const goAddJourney = () => {
        navigate("/add-journey")
    }

    useEffect(() => {
        getProfile()
        getPosts()
    }, [state])

    return (
        <div>
            <NavigationBar />
            {state.isLogin === true ?
                <div className='p-5'>
                    <h2 className='Montserrat fs-1 fw-bold'>Profile</h2>

                    <div className='Montserrat py-3'>
                        <form action="" onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-center'>
                            {user.image === null ?
                                <div style={{position:"relative"}}>
                                    <Avatar 
                                        name={user.fullName} 
                                        className="rounded-circle" 
                                        size="200"
                                    />
                                    <img 
                                        src={Upload}
                                        alt="UploadImage"
                                        width={60} 
                                        style={{
                                            position:"absolute", 
                                            top:0, 
                                            right:0,
                                            padding:10,
                                            cursor:"pointer"
                                        }}
                                        onClick={() => {selectUploadImage()}}
                                        className="rounded-circle bg-light"
                                    />
                                </div>
                                
                            :
                                <>
                                {preview !== null ?
                                    <div style={{position:"relative"}}>
                                        <img 
                                            src={preview} 
                                            width="200" 
                                            height="200" 
                                            className='rounded-circle' 
                                            alt="profilepic" 
                                        />
                                        <img 
                                            src={Upload}
                                            alt="UploadImage"
                                            width={60} 
                                            style={{
                                                position:"absolute", 
                                                top:0, 
                                                right:0,
                                                padding:10,
                                                cursor:"pointer"
                                            }}
                                            onClick={() => {selectUploadImage()}}
                                            className="rounded-circle bg-light"
                                        />
                                    </div>
                                :
                                    <div style={{position:"relative"}}>
                                        <img 
                                            src={user.image} 
                                            width="200" 
                                            height="200" 
                                            className='rounded-circle' 
                                            alt="profilepic" 
                                        />
                                        <img 
                                            src={Upload}
                                            alt="UploadImage"
                                            width={60} 
                                            style={{
                                                position:"absolute", 
                                                top:0, 
                                                right:0,
                                                padding:10,
                                                cursor:"pointer"
                                            }}
                                            onClick={() => {selectUploadImage()}}
                                            className="rounded-circle bg-light"
                                        />
                                    </div>
                                }
                                </>
                            }
                            
                            <input type="file" name="image" id="uploadImage" onChange={handleChange} style={{display:"none"}}/>
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                            {preview !== null ?
                            <Box sx={{ m: 1, position: 'relative' }}>
                                {loading === false ? 
                                    <Button 
                                        className='px-4' 
                                        variant="outline-primary fw-bold"
                                        type="submit"
                                    >Update Image</Button>
                                :
                                <>
                                    {loading && (
                                    <>
                                        <Button 
                                            className='px-4' 
                                            variant="outline-primary fw-bold"
                                            type="submit"
                                            disabled
                                        >Update Image</Button>
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            marginTop: '-12px',
                                            marginLeft: '-12px',
                                        }}
                                        />
                                    </>
                                    )}
                                </>
                                }
                            </Box>
                                
                            :
                                <></>
                            }    
                        </div>
                        </form>

                        <div className='pt-4'>
                            <center className='fs-3'>{user.fullName}</center>
                            <center className='text-muted'>{user.email}</center>    
                        </div>
                    </div>

                    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                        {message}
                    </Snackbar>

                    {post.length === 0 ?
                        <div className='d-flex justify-content-center align-items-center' style={{height:"250px"}}>
                            <p className='m-0 p-0 Montserrat fw-bold fs-1 text-muted'>You haven't posted anything, post one <span className='text-primary' style={{cursor:"pointer"}} onClick={goAddJourney}>here</span></p>    
                        </div>
                    :
                        <Row className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-4 mt-4">
                            {post.length !== 0 ? (
                            <>
                                {post.map((item, index) => (
                                    <div key={index} style={{position:"relative"}}>
                                        <Cards item={item} />
                                        <img 
                                            onClick={() => handleRemove(item.id)}
                                            src={Trash}
                                            alt="BookmarkIcon"
                                            width={60} 
                                            style={{
                                                position:"absolute", 
                                                top:10, 
                                                right:35,
                                                padding:10,
                                                cursor:"pointer"
                                            }}
                                            className="rounded-circle bg-light"
                                        />
                                        <img 
                                            onClick={() => {navigate(`/edit-journey/${item.id}`)}}
                                            src={Edit}
                                            alt="EditIcon"
                                            width={60} 
                                            style={{
                                                position:"absolute", 
                                                top:80, 
                                                right:35,
                                                padding:10,
                                                cursor:"pointer"
                                            }}
                                            className="rounded-circle bg-light"
                                        />
                                    </div>
                                ))}
                            </>
                            ) : (
                                <></>
                            )}
                        </Row>
                    }
                </div> 
            :
                <></>
            }
        </div>
    )
}

export default Profile