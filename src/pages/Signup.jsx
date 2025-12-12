import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Turnstile from "react-turnstile";

function Signup(){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [captchaValue, setCaptchaValue] = useState(null);

    const navigate = useNavigate();
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    
    useEffect(() => {
    if (isLoggedIn) {
        navigate('/'); 
    }
    }, []);

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [message, setMessage] = useState({
        type : false,
        value : ""
    });
    const [disable, setDisable] = useState(false);
    const [passTogle, setPassToggle] = useState([false, false]);

    const[formErrors, setFormErrors] = useState({});

    const handlesubmit = (e) => {
        
        setIsLoading(true);

        e.preventDefault();
        let regobj = {
            name, 
            email, 
            password, 
            password_confirmation: confirmPassword,
            "cf-turnstile-response" : captchaValue,
        };

        let errors = validate(regobj)
        setFormErrors(errors);
            
        if(Object.keys(errors).length === 0)
        {
            fetch(`${baseUrl}register`, {
                    method:"POST",
                    headers:{'content-type' : 'application/json'},
                    body:JSON.stringify(regobj)
                }).then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                }).then(({ status, body })=>{
                    let msg= "";
                        if (typeof body.message === "string") {
                            msg = body.message;
                        } 
                        else if (typeof body.message === "object" && body.message !== null) {
                            const firstErrorKey = Object.keys(body.message)[0];
                            if (firstErrorKey) {
                                msg = body.message[firstErrorKey][0];
                            }
                        }
                    setMessage({
                        type : body.status,
                        value : msg,
                    })
                    setIsLoading(false);
                    if(body.status)
                    {
                        setDisable(true) 
                    }
                }).catch((err)=>{
                    setIsLoading(false);
                    setMessage("Validation error: " + err.message);
                })
        }else{
                setIsLoading(false);
        }
    }
    
    const validate = (val) => {
        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
        if(!val.name){
            errors.name = "Name is required !"
        }
        if(!val.email){
            errors.email = "Email is required !"
        }else if(!regex.test(val.email)){
            errors.email = "Email is not valid"
        }
        if(!val.password){
            errors.password = "Password is required !"
        }else if(val.password.length<8){
            errors.password = "The password field must be at least 8 characters"
        }
        if(!val.password_confirmation){
            errors.password_confirmation = "Confirm Password is required !"
        }else if(val.password !== val.password_confirmation){
            errors.password_confirmation = `Confirm Password does not match !`
        }
        
        if(!val["cf-turnstile-response"]){
            errors.captcha = "Please select the captcha"
        }

        return errors
    }

    return (
        <div className="alert_mgs_fix">
            <section className="page-title auth_page">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>REGISTER</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="authentication">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                            <div className="logo">
                                <img src="/assets/images/Website-logo-1.webp" alt="" />
                            </div>
                            <form onSubmit={handlesubmit}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                        <p className="error">{ formErrors.name }</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                        <p className="error">{ formErrors.email }</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type={`${passTogle[0] ? "text" : "password"}`} className="form-control" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 0 ? !val : val))
                                        )}>
                                            <i className={`fa togglePassword fa-eye${!passTogle[0] ? "-slash" : ""}`}></i>
                                        </span>
                                        <p className="error">{ formErrors.password }</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password</label>
                                        <input type={`${passTogle[1] ? "text" : "password"}`} className="form-control" placeholder="Confirm Password" onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword} />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 1 ? !val : val))
                                        )}>
                                            <i className={`fa togglePassword fa-eye${!passTogle[1] ? "-slash" : ""}`}></i>
                                        </span>
                                        <p className="error">{ formErrors.password_confirmation }</p>
                                    </div>
                                    <Turnstile
                                        sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                        onVerify={handleCaptchaChange}
                                    />
                                    <p className="error">{ formErrors.captcha }</p>
                                    <div className="d-flex align-items-center mt-2">
                                        <button type="submit" className={`btn btn-primary w-100 ${isLoading ? 'loading' : ''}`} disabled={disable} aria-label="Submit">
                                            {!isLoading && 
                                                <>
                                                    <i className="fa fa-sign-in"></i> Register
                                                </>
                                            }
                                        </button>
                                    </div>
                                    {message?.value && 
                                        <div className='message' style={{marginTop:"20px"}}>
                                            <p className={message.type ? "success" : "error"}>{message?.value}</p>
                                        </div>
                                    }
                                </form>
                                <div className="authentication-footer">
                                    <span className="social-divider">or</span>
                                    <p>Already have an account? <NavLink to="/login">Login.</NavLink></p>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup