import React from 'react'
import NavigationBar from '../components/Navbar'
import { Button, Row, Col } from 'react-bootstrap'
import Cards from '../components/Cards'

import Bookmark from '../images/Cards/Bookmark(2).svg'

function Home() {
    const dataDummy = [
        {
            title : "Title 1",
            text : "Text 1"
        },
        {
            title : "Title 2",
            text : "Text 2"
        },
        {
            title : "Title 3 aaaaaaaaaaaaaaaaaaaa",
            text : "Text 3 lorem ipsum dolor sit amet ameji yahagi scarlet daiwa teio aiyaya changechang mao zedong ching cheng hanji paul in th e dungeon nigger"
        },
        {
            title : "Title 4",
            text : "Text 4"
        },
        {
            title : "Title 5",
            text : "Text 5"
        },
        {
            title : "Title 6",
            text : "Text 6"
        },
        {
            title : "Title 7",
            text : "Text 7"
        }
    ]
    return (
        <div>
            <NavigationBar />
            <div className='p-5' style={{backgroundColor:'#EDEDED'}}>
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
                    {dataDummy.length !== 0 ? (
                    <>
                        {dataDummy.map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                <img 
                                    src={Bookmark} 
                                    width={30} 
                                    style={{
                                        position:"absolute", 
                                        top:10, 
                                        right:20
                                    }}
                                />
                            </div>
                        ))}
                    </>
                    ) : (
                    <Col>
                        <div className="text-center pt-5">
                        <div className="mt-3">No data product</div>
                        </div>
                    </Col>
                    )}
                </Row>

            </div>
        </div>
    )
}

export default Home