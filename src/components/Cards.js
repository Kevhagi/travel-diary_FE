import React from 'react'
import { Link } from "react-router-dom"
import { Card, CardGroup } from 'react-bootstrap'

import '../css/Cards.css'

import dateFormat, { masks } from "dateformat";

import DOMPurify from 'dompurify';

function Cards( {item} ) {
    var date = dateFormat(item.updatedAt, "dd mmmm yyyy")
    let sanitized = DOMPurify.sanitize(item.desc)

    for (let i = 0; i <= 6; i++) {
        sanitized = sanitized.replace(`<h${i}>`, "<p>")
        sanitized = sanitized.replace(`</h${i}>`, "</p>")
    }
    
    return (
        <div>
            {item.journeyID ?
            (
                <Link to={`/journey/` + item.journeyID} style={{textDecoration : "none"}}>
                    <CardGroup className='mb-5 mx-3'>
                        <Card className='shadow'>
                            <Card.Img 
                                variant="top" 
                                src={item.image} 
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
                                        fontSize: 14,
                                    }}
                                    className='textTruncate'
                                    dangerouslySetInnerHTML={{__html: sanitized}}
                                ></Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Link>
            )
            :
            (
                <Link to={`/journey/` + item.id} style={{textDecoration : "none"}}>
                    <CardGroup className='mb-5 mx-3'>
                        <Card className='shadow'>
                            <Card.Img 
                                variant="top" 
                                src={item.image} 
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
                                        fontSize: 14,
                                    }}
                                    className='textTruncate'
                                    dangerouslySetInnerHTML={{__html: sanitized}}
                                ></Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Link>
            )
            }
        </div>
    )
}

export default Cards
