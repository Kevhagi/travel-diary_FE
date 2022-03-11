import React, { useContext, useEffect, useState } from 'react'

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import adminPic from '../images/Navbar/adminPic.jpg'
import Bookmark from '../images/Cards/Bookmark(2).svg'

//styles
import { Row, Col } from 'react-bootstrap'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Profile() {
    const dataDummy = [
        {
            id : 1,
            title : "Title 1",
            text : "Text 1"
        },
        {
            id : 2,
            title : "Title 2",
            text : "Text 2"
        },
        {
            id : 3,
            title : "Title 3 aaaaaaaaaaaaaaaaaaaa",
            text : "Text 3 lorem ipsum dolor sit amet ameji yahagi scarlet daiwa teio aiyaya changechang mao zedong ching cheng hanji paul in th e dungeon nigger"
        },
        {
            id : 4,
            title : "Title 4",
            text : "Text 4"
        }
    ]

    const [state, dispatch] = useContext(UserContext);

    const [user, setUser] = useState({
        fullName : '',
        email : '',
        id : ''
    })

    const getProfile = async() => {
        try {
            const response = await API.get(`/profile/${state.user.id}`)
            setUser(response.data)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, [state])

    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold'>Profile</h2>

                <div className='Montserrat py-3'>
                    <div className='d-flex justify-content-center'>
                        <img 
                            src={adminPic} 
                            width="200" 
                            height="200" 
                            className='rounded-circle border border-1 border-primary' 
                            alt="profilepic" 
                        />
                    </div>

                    <div className='pt-4'>
                        <center className='fs-3'>{user.fullName}</center>
                        <center className='text-muted'>{user.email}</center>    
                    </div>
                </div>

                <Row className="row row-cols-4 mt-4">
                    {dataDummy.length !== 0 ? (
                    <>
                        {dataDummy.map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                <img 
                                    src={Bookmark}
                                    alt="BookmarkIcon"
                                    width={30} 
                                    style={{
                                        position:"absolute", 
                                        top:10, 
                                        right:40,
                                        cursor:"pointer"
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