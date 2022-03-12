import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from '../components/Navbar'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

import dateFormat, { masks } from "dateformat";

function Journey() {
    let { id } = useParams()
    const [journey, setJourney] = useState('')
    const [state, dispatch] = useContext(UserContext);

    const getJourney = async() => {
        try {
            const response = await API.get(`/journey/${id}`)
            setJourney(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    console.log(journey);

    useEffect(() => {
        getJourney()
    }, [state])

    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                {journey !== '' ?
                <div className="px-5">
                    <div className="section1 d-flex justify-content-between">
                        <p className="fw-bold" style={{fontSize:48}}>{journey.title}</p>
                        <p className="fw-normal fs-1">{journey.author.fullName}</p>
                    </div>
                    <p className="fs-4 text-primary">{dateFormat(journey.updatedAt, "dd mmmm yyyy")}</p>
                    <div className="my-5 d-flex justify-content-center">
                        <img 
                            src={journey.image} 
                            alt="postImage" 
                            style={{width:"60%"}}    
                        />    
                    </div>
                    
                    <p>{journey.desc}</p>
                </div>
                :
                    <div>kosong</div>
                }
            </div>
        </div>
    )
}

export default Journey