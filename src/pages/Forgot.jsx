import React, {useEffect, useState} from 'react'
import { useParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Turnstile from "react-turnstile";


function Forgot(){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [captchaValue, setCaptchaValue] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState({
        type : false,
        value : "",
    });

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handlesubmit = (e) => {
            e.preventDefault();

            let regobj = {
                email : email, 
                "cf-turnstile-response" : captchaValue,
            };
    
            const formErrors = validate(regobj);
            setFormErrors(formErrors);

            const raw = JSON.stringify(regobj);
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: raw,
                redirect: "follow"
            };

            
            if(Object.keys(formErrors).length === 0)
            {
                setIsLoading(true);
                
                fetch(`${baseUrl}forgot-password`, requestOptions)
                .then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                })
                .then(({status, body}) => {
                    setMessage({
                        type : body.status,
                        value : body.message
                    });
                    setIsLoading(false);
                })
                .catch((error) => console.error(error));

            }
        }
    
        const validate = (val) => {
            const errors = {}
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
            if(!val.email){
                errors.email = "Email is required !"
            }else if(!regex.test(val.email)){
                errors.email = "Email is not valid"
            }
            if(!val["cf-turnstile-response"]){
                  errors.captch = "Please select the captcha"
            }
            return errors
        }

    return (
        <div>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>FORGOT PASSWORD</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="authentication">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                            <div className="logo">
                                <img src="assets/images/Website-logo-1.webp" alt="" />
                            </div>
                            <form onSubmit={handlesubmit}>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                        {formErrors?.email && <p className="error">{formErrors.email}</p>}
                                    </div>
                                    <Turnstile
                                        sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                        onVerify={handleCaptchaChange}
                                    />
                                    <div className="d-flex align-items-center mt-2">
                                        <button type="submit" className={`btn btn-primary w-100 ${ isLoading ? "loading" : "" }`} aria-label="Submit">
                                            {!isLoading && (
                                                <>
                                                    <i className="fa fa-sign-in"></i> Submit
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {message?.value && 
                                        <div className='message' style={{marginTop:"20px"}}>
                                            <p className={message.type ? "success" : "error"}>{message?.value}</p>
                                        </div>
                                    }
                                </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Forgot