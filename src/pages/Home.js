import React, { useEffect, useState } from 'react'

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import Bookmark from '../images/Cards/Bookmark(2).svg'
import Bookmarked from '../images/Cards/Bookmarked.svg'

//styles
import { Button, Row, Col } from 'react-bootstrap'

//API
import { API } from '../config/api'

function Home() {
    const [post, setPost] = useState([])

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

    const checkBookmark = async () => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    console.log(post);

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
                    />
                    <Button className='px-4 input-group-text' variant="primary fw-bold" id="searchbar">Search</Button>  
                </div>

                <Row className="row row-cols-4 mt-4">
                    {post.length !== 0 ? (
                    <>
                        {post.map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                <img 
                                    onClick={() => handleBookmark(item.id)}
                                    src={Bookmark}
                                    alt="BookmarkIcon"
                                    width={30} 
                                    style={{
                                        position:"absolute", 
                                        top:10, 
                                        right:35,
                                        cursor:"pointer"
                                    }}
                                />
                            </div>
                        ))}
                    </>
                    ) : (
                        <div className="text-center">
                            <p className="mt-3">No journey data</p>
                        </div>
                    )}
                </Row>

            </div>
        </div>
    )
}

export default Home