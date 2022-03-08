import React from 'react'
import NavigationBar from '../components/Navbar'
import adminPic from '../images/Navbar/adminPic.jpg'

function Profile() {
    return (
        <div>
            <NavigationBar />
            <div className='p-5' style={{backgroundColor:'#EDEDED'}}>
                <h2 className='Montserrat fs-1 fw-bold'>Profile</h2>

                <div className='Montserrat py-3'>
                    <div className='d-flex justify-content-center'>
                        <img 
                            src={adminPic} 
                            width="200" 
                            height="200" 
                            className='rounded-circle border border-1 border-primary' 
                            alt="profilepic" 
                        />
                    </div>

                    <div className='pt-4'>
                        <center className='fs-3'>Name</center>
                        <center className='text-muted'>Email</center>    
                    </div>
                </div>

                <div>
                    <p>Card WIP</p>    
                </div> 
            </div> 
        </div>
    )
}

export default Profile