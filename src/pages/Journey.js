import React from "react";
import NavigationBar from '../components/Navbar'

function Journey() {
    return (
        <div>
            <NavigationBar />
            <div className='p-5'>
                <div className="px-5">
                    <div className="section1 d-flex justify-content-between">
                        <p>Title</p>
                        <p>Author</p>
                    </div>
                    <p>PostedAt</p>
                    <p>Body lgsg ambil dari db</p>
                </div>
                
            </div>
        </div>
    )
}

export default Journey