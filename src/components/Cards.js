import React from 'react'
import { Link } from "react-router-dom"
import { Card, CardGroup } from 'react-bootstrap'

import sampleImg from '../images/Navbar/adminPic.jpg'
import '../css/Cards.css'

function Cards( {item} ) {
    return (
        <div>
            <CardGroup className='mb-5'>

                    <Card className='shadow'>
                        <Card.Img 
                            variant="top" 
                            src={sampleImg} 
                            width={300}
                            height={180}
                        />
                        <Card.Body
                            style={{
                                height:150,
                                maxHeight:150,
                            }}
                            className='OpenSans'
                        >
                            <Card.Title className='fw-bold text-truncate'>{item.title}</Card.Title>
                            <Card.Subtitle className='text-muted mb-2'>Dummy subtitle</Card.Subtitle>
                            <Card.Text
                                style={{
                                    color: "#6C6C6C",
                                    fontSize: 14
                                }}
                                className='textTruncate'
                            >{item.text}</Card.Text>
                        </Card.Body>
                    </Card>

            </CardGroup>
        </div>
    )
}

export default Cards
