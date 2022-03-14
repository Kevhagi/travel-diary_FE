import React, { useContext, useState, useEffect } from 'react'

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import Bookmarked from '../images/Cards/Bookmarked.svg'

//styles
import { Row, Col } from 'react-bootstrap'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Bookmark() {
    const [state, dispatch] = useContext(UserContext);
    const [bookmark, setBookmark] = useState([])
    const [message, setMessage] = useState(null)

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

    const getBookmarks = async() => {
        try {
            const response = await API.get(`/bookmarks/${state.user.id}`)
            setBookmark(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleBookmark = async (journeyID) => {
        try {
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
                if (response.data.message === `"${response.data.title}" added to your bookmark.`){
                    const messageAlert = (
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            {response.data.message}
                        </Alert>
                    )
                    setMessage(messageAlert)
                } else if (response.data.message === `"${response.data.title}" deleted from your bookmark.`){
                    const messageAlert = (
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            {response.data.message}
                        </Alert>
                    )
                    setMessage(messageAlert)
                }
                handleClick()
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

    useEffect(() => {
        getBookmarks()
    }, [state])
    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold pb-5'>Bookmark</h2>

                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    {message}
                </Snackbar>
                
                {bookmark.length === 0 ?
                    <div className='d-flex justify-content-center align-items-center' style={{height:"500px"}}>
                        <p className='m-0 p-0 Montserrat fw-bold fs-1 text-muted'>You don't have any bookmark</p>    
                    </div>
                :
                    <Row className="row row-cols-4 mt-4">
                        {bookmark.length !== 0 ? (
                        <>
                            {bookmark.map((item, index) => (
                                <div key={index} style={{position:"relative"}}>
                                    <Cards item={item} />
                                    <img 
                                        onClick={() => handleBookmark(item.journeyID)}
                                        src={Bookmarked}
                                        alt="BookmarkIcon"
                                        width={60} 
                                        style={{
                                            position:"absolute", 
                                            top:10, 
                                            right:40,
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
        </div>
    )
}

export default Bookmark