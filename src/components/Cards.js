import React from 'react'
import { Link } from "react-router-dom"
import { Card, CardGroup } from 'react-bootstrap'

import sampleImg from '../images/Navbar/adminPic.jpg'
import Bookmark from '../images/Cards/Bookmark(2).svg'
import '../css/Cards.css'

import dateFormat, { masks } from "dateformat";

function Cards( {item} ) {
    var date = dateFormat(item.updatedAt, "dd mmmm yyyy")
    return (
        <div>
            <Link to={`/journey/` + item.id} style={{textDecoration : "none"}}>
            <CardGroup className='mb-5 mx-3'>
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
                            className='OpenSans text-black'
                        >
                            <Card.Title className='fw-bold text-truncate'>{item.title}</Card.Title>
                            <Card.Subtitle className='text-muted mb-2'>
                                {date}, {item.author.fullName}
                            </Card.Subtitle>
                            <Card.Text
                                style={{
                                    color: "#6C6C6C",
                                    fontSize: 14
                                }}
                                className='textTruncate'
                            >{item.desc}</Card.Text>
                        </Card.Body>
                    </Card>
            </CardGroup>
            </Link>
        </div>
    )
}

export default Cards
