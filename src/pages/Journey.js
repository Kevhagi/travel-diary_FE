import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from '../components/Navbar'

//API
import { API } from '../config/api'

import dateFormat, { masks } from "dateformat";

import DOMPurify from 'dompurify';

function Journey() {
    let { id } = useParams()
    const [journey, setJourney] = useState('')

    const getJourney = async() => {
        try {
            const response = await API.get(`/journey/${id}`)
            setJourney(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    let sanitized = DOMPurify.sanitize(journey.desc)

    useEffect(() => {
        getJourney()
    }, [])

    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                {journey !== '' ?
                <div className="px-5">
                    <div className="section1">
                        <div>
                            <p className="fw-bold" style={{fontSize:48}}>{journey.title}</p>    
                        </div>
                        <div>
                            <p className="fw-normal fs-5 my-3">{journey.author.fullName}</p>    
                        </div>
                    </div>
                    <p className="text-primary">{dateFormat(journey.updatedAt, "dd mmmm yyyy")}</p>
                    <div className="my-5 d-flex justify-content-center">
                        <img 
                            src={journey.image} 
                            alt="postImage" 
                            style={{width:"60%"}}    
                        />    
                    </div>
                    
                    <div dangerouslySetInnerHTML={{__html: sanitized}}>
                    </div>
                </div>
                :
                    <></>
                }
            </div>
        </div>
    )
}

export default Journey