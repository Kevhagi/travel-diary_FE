import React, { useContext, useEffect, useState } from 'react'
import Avatar from 'react-avatar';

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import Trash from '../images/Profile/trash.svg'
import Upload from '../images/Profile/upload.svg'

//styles
import { Row, Col, Alert, Button } from 'react-bootstrap'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Profile() {
    const [state, dispatch] = useContext(UserContext);
    const [post, setPost] = useState([])
    const [preview, setPreview] = useState(null)

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

            if (user.image !== null){
                const formData = new FormData()
                formData.set("image", user.image[0], user.image[0].name)
                
                const response = await API.patch(`/profile/${user.id}`, formData, config)
                
                if (response?.status === 200){
                    document.location.reload(true)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(user);

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

    useEffect(() => {
        getProfile()
        getPosts()
    }, [state])

    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold'>Profile</h2>

                <div className='Montserrat py-3'>
                    <form action="" onSubmit={handleSubmit}>
                    <div className='d-flex justify-content-center'>
                        {user.image === null ?
                            <div style={{position:"relative"}}>
                                <Avatar 
                                    name={user.fullName} 
                                    className="rounded-circle border border-1 border-primary" 
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
                                        className='rounded-circle border border-1 border-primary' 
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
                                        className='rounded-circle border border-1 border-primary' 
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
                            <Button 
                                className='px-4' 
                                variant="outline-primary fw-bold"
                                type="submit"
                            >Update Image</Button>
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

                <Row className="row row-cols-4 mt-4">
                    {post.length !== 0 ? (
                    <>
                        {post.map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                <img 
                                    src={Trash}
                                    alt="BookmarkIcon"
                                    width={30} 
                                    style={{
                                        position:"absolute", 
                                        top:10, 
                                        right:35
                                    }}
                                />
                            </div>
                        ))}
                    </>
                    ) : (
                    <Col>
                        <div className="text-center pt-5">
                            <div className="mt-3">No journey data</div>
                        </div>
                    </Col>
                    )}
                </Row>
            </div> 
        </div>
    )
}

export default Profile