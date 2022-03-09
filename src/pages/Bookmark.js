import React from 'react'

//components
import NavigationBar from '../components/Navbar'
import Cards from '../components/Cards'

//images
import BookmarkImg from '../images/Cards/Bookmark(2).svg'

//styles
import { Row, Col } from 'react-bootstrap'

function Bookmark() {
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
    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold pb-5'>Bookmark</h2>
                
                <Row className="row row-cols-4 mt-4">
                    {dataDummy.length !== 0 ? (
                    <>
                        {dataDummy.map((item, index) => (
                            <div key={index} style={{position:"relative"}}>
                                <Cards item={item} />
                                <img 
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
                            <div className="mt-3">No journey data</div>
                        </div>
                    </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default Bookmark