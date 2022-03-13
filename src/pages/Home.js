import React, { useEffect, useState, useContext } from 'react'

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'
import { LoginModal } from '../components/Modals'

//images
import Bookmark from '../images/Cards/Bookmark(2).svg'
import Bookmarked from '../images/Cards/Bookmarked.svg'

//styles
import { Row, Alert } from 'react-bootstrap'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Home() {
    const [post, setPost] = useState([])
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState(null)
    const [state, dispatch] = useContext(UserContext);

    //Modal Login
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const handleLogin = () => setShowLogin(true)
    function handleSwitchLogin(){
        setShowLogin(false)
        setShowRegister(true)
    }

    const allPost = async () => {
        try {
            const response = await API.get('/journeys')
            setPost(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleBookmark = async (journeyID) => {
        try {
            if (state.isLogin) {
                const config = {
                    headers : {
                    "Content-type" : "application/json"
                    }
                }

                var id = {
                    idJourney : journeyID
                }

                const body = JSON.stringify(id)

                const response = await API.post("/bookmark", body, config)

                if (response?.status === 200) {
                    const messageAlert = (
                        <Alert variant='success' className='py-1 px-1'>
                            {response.data.message}
                        </Alert>
                    )
                    setMessage(messageAlert)
                }    
            } else if (!state.isLogin) {
                handleLogin()
            }
        } catch (error) {
            console.log(error);
            const messageAlert = (
                <Alert variant='danger' className='py-1 px-1'>
                    {error.response.data.message}
                </Alert>
            )
            setMessage(messageAlert)
        }
    }

    useEffect(() => {
        allPost()
    }, [])

    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold'>Journey</h2>

                <div className='OpenSans input-group px-5 py-3'>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Find Journey" 
                        aria-label="Recipient's username" 
                        aria-describedby="searchbar"
                        onChange={(e) => {setSearch(e.target.value)}}
                    />
                </div>

                {message && message}

                <Row className="row row-cols-4 mt-4">
                    {post.length !== 0 ? (
                    <>
                        {post.filter((item, index) => {
                            if (search === '') {
                                return item
                            } else if (
                                item.title.toLowerCase().includes(search.toLowerCase()) || 
                                item.desc.toLowerCase().includes(search.toLowerCase()) ||
                                item.author.fullName.toLowerCase().includes(search.toLowerCase())
                            ) {
                                return item
                            }
                        }).map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                    <img 
                                        onClick={() => handleBookmark(item.id)}
                                        src={Bookmark}
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
                            </div>
                        ))}
                    </>
                    ) : (
                        <></>
                    )}
                </Row>
            </div>
            <LoginModal 
                show={showLogin}
                onHide={() => setShowLogin(false)}
                switchToRegister={handleSwitchLogin}
            />
        </div>
    )
}

export default Home