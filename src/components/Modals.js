import React, { useContext, useState } from 'react'

//styles
import { Modal, InputGroup, FormControl, Button, Alert } from 'react-bootstrap'
import '../css/Modals.css'

//API
import { API } from '../config/api'

//UseContext
import { UserContext } from '../context/userContext'

export function LoginModal(props) {
    const [state, dispatch] = useContext(UserContext);
    const [message, setMessage] = useState(null)

    const [form, setForm] = useState({
        email : '',
        password : ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers : {
                    'Access-Control-Allow-Origin': '*',
                    "Content-type" : "application/json"
                }
            }

            //XML to String
            const body = JSON.stringify(form)

            //Use API
            const response = await API.post("/login", body, config)

            if (response.status == 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload : response.data.data
                })
                const alert = (
                    <Alert variant='success' className='py-1 px-1'>
                        Login success!
                    </Alert>
                )
                setMessage(alert)
                document.location.reload(true)
            }

        } catch (error) {
            console.log(error);

            let errorMessage = error.response.data.error.message
            errorMessage = errorMessage.replace('"email"', 'Email')
            errorMessage = errorMessage.replace('"password"', 'Password')

            const alert = (
                <Alert variant='danger' className='py-1 px-1'>
                    {errorMessage}
                </Alert>
            )
            setMessage(alert)
        }
    }

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
                        <div className='px-4'>
                            {message && message}    
                        </div>
                        <form className='px-4' onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <label htmlFor="Email" className='ps-2 fs-4 fw-bold'>Email</label>
                                <InputGroup>
                                    <FormControl 
                                        type="email"
                                        id="Email"
                                        name="email"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                        onChange={handleChange}
                                    />
                                </InputGroup>    
                            </div>
                            
                            <div className='mb-4'>
                                <label htmlFor="Password" className='ps-2 fs-4 fw-bold'>Password</label>
                                <InputGroup>
                                    <FormControl
                                        type="password"
                                        id="Password"
                                        name="password"
                                        style={{backgroundColor:"rgba(210, 210, 210, 0.25)"}}
                                        onChange={handleChange}
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