import React from 'react'
import NavigationBar from '../components/Navbar'
import { Button } from 'react-bootstrap'
import '../css/Home.css'

function Home() {
    return (
        <div>
            <NavigationBar />
            <div className='homeBody p-5'>
                <h2 className='title fs-1'>Journey</h2>

                <div className='searchbar input-group px-5 py-3'>
                    <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Find Journey" 
                        aria-label="Recipient's username" 
                        aria-describedby="searchbar" 
                    />
                    <Button className='px-4 input-group-text' variant="primary fw-bold" id="searchbar">Search</Button>  
                </div>
                                
                <p>Cards</p>
            </div>
        </div>
    )
}

export default Home