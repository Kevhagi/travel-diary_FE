import React from 'react'

//styles
import { Modal, InputGroup, FormControl, Button } from 'react-bootstrap'
import '../css/Modals.css'

export function LoginModal(props) {
    return(
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='px-0 background OpenSans'>
                <div className='px-5'>
                    <center className='py-4 fs-2 fw-bold'>Login</center>

                    <div className='d-flex flex-column'>
                        <form className='px-4'>
                            <div className='mb-4'>
                                <label htmlFor="Email" className='ps-2 fs-4 fw-bold'>Email</label>
                                <InputGroup>
                                    <FormControl 
                                        id="Email"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                    />
                                </InputGroup>    
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="Password" className='ps-2 fs-4 fw-bold'>Password</label>
                                <InputGroup>
                                    <FormControl
                                        id="Password"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                    />
                                </InputGroup>    
                            </div>
                            
                            <div className='mb-4'>
                                <Button className='fs-5' variant="primary fw-bold" type="submit" style={{width:"100%"}}>Login</Button>    
                            </div>

                            <center>Don't have an account? Click <span 
                                className='fw-bold' 
                                style={{cursor:"pointer"}}
                                onClick={props.switchToRegister}
                                >Here</span>
                            </center>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export function RegisterModal(props) {
    return(
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='px-0 OpenSans'>
                <div className='px-5'>
                    <center className='py-4 fs-2 fw-bold'>Register</center>

                    <div className='d-flex flex-column'>
                        <form className='px-4'>
                            <div className='mb-4'>
                                <label htmlFor="FullName" className='ps-2 fs-4 fw-bold'>Full Name</label>
                                <InputGroup>
                                    <FormControl 
                                        id='FullName'
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                    />
                                </InputGroup>    
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="Email" className='ps-2 fs-4 fw-bold'>Email</label>
                                <InputGroup>
                                    <FormControl 
                                        id="Email"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                    />
                                </InputGroup>    
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="Password" className='ps-2 fs-4 fw-bold'>Password</label>
                                <InputGroup>
                                    <FormControl 
                                        id="Password"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                    />
                                </InputGroup>    
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="Phone" className='ps-2 fs-4 fw-bold'>Phone</label>
                                <InputGroup>
                                    <FormControl 
                                        id="Phone"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                    />
                                </InputGroup>    
                            </div>
                            
                            <div className='mb-4'>
                                <Button className='fs-5' variant="primary fw-bold" type="submit" style={{width:"100%"}}>Register</Button>
                            </div>

                            <center>Already have an account? Click <span 
                                className='fw-bold' 
                                style={{cursor:"pointer"}}
                                onClick={props.switchToLogin}
                                >Here</span>
                            </center>
                        </form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}