import React from 'react'
import { Navbar, Container, Button, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Icon from '../images/Navbar/Icon.svg'
import Icon2 from '../images/Navbar/Icon(2).svg'
import Profile from '../images/Navbar/Profile.svg'
import NewJourney from '../images/Navbar/NewJourney.svg'
import Bookmark from '../images/Navbar/Bookmark.svg'
import Logout from '../images/Navbar/Logout.svg'
import adminPic from '../images/Navbar/adminPic.jpg'
import '../css/Navbar.css'
import 'bootstrap/js/dist/dropdown'

function NavigationBar() {
const isLogin = false

let navigate = useNavigate()

const goHome = () => {
    navigate("/")
}
    return(
        <div className='Navbar'>
            {isLogin ? 
                (
                    <Navbar className='navbarLogin'>
                        <Container className='d-flex justify-content-between'>
                            <Navbar.Brand onClick={goHome} style={{cursor:"pointer"}}>
                                <img src={Icon2} alt="" /> 
                            </Navbar.Brand>
                            <Stack direction='horizontal' className='dropdown'>
                                <button class="btn shadow-none pe-0" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={adminPic} width="50" height="50" className='rounded-circle border border-1 border-primary' alt="profilepic" />
                                </button>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li className='d-flex align-items-center'>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={Profile} width="30" height="30" alt="profile" />
                                            </div>
                                            <div className='ms-2 dropdownLabel'>
                                            Profile
                                            </div>
                                        </button>
                                    </li>
                                    <li className='d-flex align-items-center'>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={NewJourney} width="30" height="30" alt="profile" />
                                            </div>
                                            <div className='ms-2 dropdownLabel'>
                                           New Journey
                                            </div>
                                        </button>
                                    </li>
                                    <li className='d-flex align-items-center'>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={Bookmark} width="30" height="30" alt="profile" />
                                            </div>
                                            <div className='ms-2 dropdownLabel'>
                                            Bookmark
                                            </div>
                                        </button>
                                    </li>
                                    <li className='d-flex border-2 border-secondary border-top'>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={Logout} width="30" height="30" alt="logout" />
                                            </div>
                                            <div className='ms-2 dropdownLabel'>
                                            Logout
                                            </div>
                                        </button>
                                    </li> 
                                </ul>
                            </Stack>
                        </Container>
                    </Navbar>
                ) 
            : 
                (
                  <div className='jumbotron'>
                    <div className='d-flex justify-content-between'>
                        <div onClick={goHome} style={{cursor:"pointer"}}>
                            <img src={Icon} alt="" />    
                        </div>
                        <Stack direction="horizontal" gap={3}>
                            <Button className='px-4' variant="outline-light fw-bold">Login</Button>
                            <Button className='px-4' variant="primary fw-bold">Register</Button>
                        </Stack>
                    </div>
                    <div className='d-flex flex-column content text-white'>
                        <p className='title fs-1 mb-0'>The Journey <br /> you ever dreamed of.</p>
                        <p className='subtitle fs-4 mb-0'>We made a tool so you can easily keep & share your travel memories. <br />But there is a lot more</p>
                    </div>
                </div>  
                ) 
            } 
        </div>
    )
}

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

export default NavigationBar