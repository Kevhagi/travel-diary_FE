import React, { useContext, useEffect, useState } from 'react'
import Avatar from 'react-avatar';

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import adminPic from '../images/Navbar/adminPic.jpg'
import Trash from '../images/Profile/trash.svg'

//styles
import { Row, Col } from 'react-bootstrap'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Profile() {
    const [state, dispatch] = useContext(UserContext);
    const [post, setPost] = useState([])

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
            console.log(error.response);
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

    console.log(post);

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
                    <div className='d-flex justify-content-center'>
                        {user.image === null ?
                            <Avatar name={user.fullName} className="rounded-circle border border-1 border-primary" size="200"/>
                        :
                            <img 
                                src={user.image} 
                                width="200" 
                                height="200" 
                                className='rounded-circle border border-1 border-primary' 
                                alt="profilepic" 
                            />
                        }
                    </div>

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