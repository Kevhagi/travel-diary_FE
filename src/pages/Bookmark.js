import React, { useContext, useState, useEffect } from 'react'

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import BookmarkImg from '../images/Cards/Bookmark(2).svg'

//styles
import { Row, Col } from 'react-bootstrap'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

function Bookmark() {
    const [state, dispatch] = useContext(UserContext);
    const [bookmark, setBookmark] = useState([])

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
                alert(response.data.message)
            }

        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert(error.response.data.message)
        }
    }

    console.log(bookmark);

    useEffect(() => {
        getBookmarks()
    }, [state])
    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold pb-5'>Bookmark</h2>
                
                <Row className="row row-cols-4 mt-4">
                    {bookmark.length !== 0 ? (
                    <>
                        {bookmark.map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                <img 
                                    onClick={() => handleBookmark(item.journeyID)}
                                    src={BookmarkImg}
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
                            <div className="mt-3">No bookmark data</div>
                        </div>
                    </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default Bookmark