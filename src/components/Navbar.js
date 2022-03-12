import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

//Images
import Icon from '../images/Navbar/Icon.svg'
import Icon2 from '../images/Navbar/Icon(2).svg'
import Profile from '../images/Navbar/Profile.svg'
import NewJourney from '../images/Navbar/NewJourney.svg'
import Bookmark from '../images/Navbar/Bookmark.svg'
import Logout from '../images/Navbar/Logout.svg'
import adminPic from '../images/Navbar/adminPic.jpg'

//Bootstrap
import { Navbar, Container, Button, Stack } from 'react-bootstrap'
import '../css/Navbar.css'
import 'bootstrap/js/dist/dropdown'

//Modals
import { LoginModal, RegisterModal } from '../components/Modals'

//UseContext
import { UserContext } from '../context/userContext'

function NavigationBar() {
    const [state, dispatch] = useContext(UserContext);

    //Navigations
    let navigate = useNavigate()

    const goHome = () => {
        navigate("/")
    }

    const goProfile = () => {
        navigate("/profile")
    }

    const goBookmark = () => {
        navigate("/bookmark")
    }

    const goAddJourney = () => {
        navigate("/add-journey")
    }

    const logout = () => {
        dispatch({
          type: "LOGOUT"
        });
        navigate("/")
        document.location.reload(true)
    }

    //Modal Login
    const [showLogin, setShowLogin] = useState(false);
    const handleLogin = () => setShowLogin(true)

    //Modal Register
    const [showRegister, setShowRegister] = useState(false);
    const handleRegister = () => setShowRegister(true)

    //Handle switch modal
    function handleSwitchLogin(){
        setShowLogin(false)
        setShowRegister(true)
    }
    function handleSwitchRegister(){
        setShowLogin(true)
        setShowRegister(false)
    }
    
    return(
        <div className='Navbar'>
            {state.isLogin ? 
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
                                    <li className='d-flex align-items-center' onClick={goProfile}>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={Profile} width="30" height="30" alt="profile" />
                                            </div>
                                            <div className='ms-2 OpenSans fw-bold'>
                                            Profile
                                            </div>
                                        </button>
                                    </li>
                                    <li className='d-flex align-items-center' onClick={goAddJourney}>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={NewJourney} width="30" height="30" alt="profile" />
                                            </div>
                                            <div className='ms-2 OpenSans fw-bold'>
                                           New Journey
                                            </div>
                                        </button>
                                    </li>
                                    <li className='d-flex align-items-center' onClick={goBookmark}>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={Bookmark} width="30" height="30" alt="profile" />
                                            </div>
                                            <div className='ms-2 OpenSans fw-bold'>
                                            Bookmark
                                            </div>
                                        </button>
                                    </li>
                                    <li className='d-flex border-2 border-secondary border-top' onClick={logout}>
                                        <button class="btn shadow-none px-3 pe-2 py-4 d-flex align-items-center">
                                            <div>
                                            <img src={Logout} width="30" height="30" alt="logout" />
                                            </div>
                                            <div className='ms-2 OpenSans fw-bold'>
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
                            <Button 
                                className='px-4' 
                                variant="outline-light fw-bold"
                                onClick={() => {handleLogin()}}
                            >Login</Button>
                            <Button 
                                className='px-4' 
                                variant="primary fw-bold"
                                onClick={() => {handleRegister()}}
                            >Register</Button>
                        </Stack>
                    </div>
                    <div className='d-flex flex-column content text-white Montserrat'>
                        <p className='fs-1 fw-bold mb-0'>The Journey <br /> you ever dreamed of.</p>
                        <p className='fs-4 fw-lighter mb-0'>We made a tool so you can easily keep & share your travel memories. <br />But there is a lot more</p>
                    </div>
                </div>  
                ) 
            }
            <LoginModal 
                show={showLogin}
                onHide={() => setShowLogin(false)}
                switchToRegister={handleSwitchLogin}
            />
            <RegisterModal 
                show={showRegister}
                onHide={() => setShowRegister(false)}
                switchToLogin={handleSwitchRegister}
            />
        </div>
    )
}

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

export default NavigationBar