import React from "react";

//components
import NavigationBar from '../components/Navbar'

//froala
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import FroalaEditorComponent from 'react-froala-wysiwyg';

//styles
import { Button } from 'react-bootstrap'

function AddJourney() {
    return(
        <div>
            <NavigationBar />
            <div className='p-5'>
                <h2 className='Montserrat fs-1 fw-bold mb-5'>New Journey</h2>

                <div className="px-5">
                    <h5 className="fw-bold">Title</h5>
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className="mb-4 rounded"
                        style={{
                            border:"1px solid #A6A6A6",
                            width: "100%"
                        }}
                    />
                    
                    <FroalaEditorComponent tag='textarea'/>

                    <div className="d-flex justify-content-end">
                        <Button className='px-4 mt-4' variant="primary fw-bold">Register</Button>    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AddJourney