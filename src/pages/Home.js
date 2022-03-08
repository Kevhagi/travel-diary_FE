import React from 'react'
import NavigationBar from '../components/Navbar'
import { Button } from 'react-bootstrap'

function Home() {
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

                <p>Card WIP</p>

            </div>
        </div>
    )
}

export default Home