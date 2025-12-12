import React, {useEffect, useState, useContext, useRef} from 'react'
import { useParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Turnstile from "react-turnstile";

function Login(){
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const navigate = useNavigate();
        const { user, logout, isLoggedIn, login } = useContext(AuthContext);
        const guest_token = localStorage.getItem("guest_key_token");
        const [passTogle, setPassToggle] = useState(false);
        const [captchaValue, setCaptchaValue] = useState(null);
        const turnstileRef = useRef(null);
        
        useEffect(() => {
        if (isLoggedIn) {
            navigate('/'); 
        }
        }, []);    

        const handleCaptchaChange = (value) => {
            setCaptchaValue(value);
        };
        const handlePCaptchaChange = (value) => {
            setPcaptcha(value);
        };

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [message, setMessage] = useState({
            type : false,
            value : ""
        });
        
        const[formErrors, setFormErrors] = useState({});
        const[isLoading, setIsLoading] = useState(false);
        
        const [hasProblem, setHasProblem] = useState(false);
        const [pname, setPname] = useState("");
        const [pemail, setPemail] = useState("");
        const [pphone, setPphone] = useState("");
        const [promessage, setPromessage] = useState("");
        const [pcaptcha, setPcaptcha] = useState(null);
        const [captchaError, setCaptchaError] = useState("");
        const [pLoading, setPloading] = useState(false);
        const [pMessage, setPMessage] = useState({
            type : false,
            value : ""
        });


        const handlesubmit = (e) => {
            e.preventDefault();
            setIsLoading(true);
            let regobj = {
                email, 
                password,
                guest_token : guest_token,
                "cf-turnstile-response" : captchaValue,
            };
    
            const errors = validate(regobj);
            setFormErrors(errors);

            const raw = JSON.stringify(regobj);
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: raw,
                redirect: "follow"
            };

            if(Object.keys(errors).length === 0)
            {
                login(requestOptions, true).then((res) => {
                if (res) {
                    let msg= "";
                        if (typeof res.message === "string") {
                            msg = res.message;
                        } 
                        else if (typeof res.message === "object" && res.message !== null) {
                            const firstErrorKey = Object.keys(res.message)[0];
                            if (firstErrorKey) {
                                msg = res.message[firstErrorKey][0];
                            }
                        }
                    setMessage({
                        type : res.status,
                        value : msg,
                    })
                    setIsLoading(false);
                        window.turnstile.reset();
                        setCaptchaValue("");
                        console.log('hello')
                              
                }
            });

            }else{
                setIsLoading(false);
            }
    
        }
        
        const handleProblemSubmit = async (e) => {
            e.preventDefault();
            let regobj = {
                name : pname, 
                email : pemail,
                phone  : pphone,
                message  : promessage,
                "cf-turnstile-response" : pcaptcha,
            };
    

            const raw = JSON.stringify(regobj);
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: raw,
            };
            
             if(pcaptcha)
             {
                setPloading(true);
                try{
                    const response = await fetch(`${baseUrl}login-enquiry`, requestOptions);
                    if(!response.ok){
                        throw new Error("Failed !")
                    }
                    const result = await response.json()
                    setPMessage({
                        type : result.status,
                        value : result.message
                    })
                }catch(err){
                    console.log(err)
                }finally{
                    setPloading(false);
                }  
             }else{
                setCaptchaError("Please select the captcha");
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
            if(!val.password){
                errors.password = "Password is required !"
            }
             if(!val["cf-turnstile-response"]){
                   errors.captcha = "Please select the captcha"
             }
            return errors
        }
        
    return (
        <>            
            <section className="page-title auth_page">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>LOGIN</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="authentication">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                            <form onSubmit={handlesubmit}>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email}  />
                                        <p className="error">{ formErrors.email }</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type={`${passTogle ? "text" : "password"}`} className="form-control" placeholder="Your Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                        <span className="input-group-text" onClick={() => setPassToggle(!passTogle)}>
                                            <i className={`fa togglePassword fa-eye${!passTogle ? "-slash" : ""}`}></i>
                                        </span>
                                        <p className="error">{ formErrors.password }</p>
                                    </div>
                                    <Turnstile
                                        ref={turnstileRef}
                                        sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                        onVerify={handleCaptchaChange}
                                    />
                                    <p className="error">{ formErrors.captcha }</p>
                                    <div className="d-flex justify-content-space-between mb-2">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="remember" />
                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                        <NavLink to="/forgot-password" className="forgot-pass">Forgot Password?</NavLink>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type="submit" className={`btn btn-primary w-100 ${isLoading ? "loading" : ""} `} aria-label="Submit">
                                            {!isLoading && (
                                                <>
                                                    <i className="fa fa-sign-in"></i> Login
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {message.value && 
                                        <div className='message' style={{marginTop: "20px"}}>
                                            <p className={message.type ? "success" : "error"}>{message.value}</p>
                                        </div>
                                    }
                                </form>
                                <div className="authentication-footer">
                                    <span className="social-divider">or</span>
                                    <p>Don't have an account? <Link to="/register">Register.</Link></p>
                                </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className=" text-center error-title mb-2"> If you are already having an account with us, Please reset your password.
                        <br />Are you facing any difficulty while login or Signup ? Please fill below form</h2>
                        <div className="text-center">
                            <button className="m-auto btn btn-secondary mb-2" onClick={() => setHasProblem(!hasProblem)}>{hasProblem ? "X" : "Open Form"}</button>
                        </div>
                        {hasProblem &&
                            <div className={`form-wrapper m-auto widget animate-fade ${pLoading ? "loading-wrapper" : ""}`}>
                                <form onSubmit={handleProblemSubmit}>
                                    <div className="form-group">
                                        <label>Name <span className="error">*</span></label>
                                        <input type="text" placeholder="Your Name" className="form-control" value={pname} onChange={(e) => setPname(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email <span className="error">*</span></label>
                                        <input type="email" placeholder="Your Email" className="form-control" value={pemail} onChange={(e) => setPemail(e.target.value)} required={true}  />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone <span className="error">*</span></label>
                                        <input type="tel" placeholder="Your Phone Number" className="form-control" value={pphone} onChange={(e) => setPphone(e.target.value)} required={true} />
                                    </div>
                                    <div className="form-group">
                                        <label>Please Describe Your Issue <span className="error">*</span></label>
                                        <textarea placeholder="Enter Issue" onChange={(e) => setPromessage(e.target.value)} required={true}>{promessage}</textarea>
                                    </div>
                                    <Turnstile
                                        sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                        onVerify={handlePCaptchaChange}
                                    />
                                    {captchaError && <p className="error">{ captchaError }</p>}
                                    <button className={`btn btn-secondary w-100 mt-2 ${pLoading ? "loading" : ""}`}>{pLoading ? "" : "Submit"}</button>
                                    {pMessage.value && 
                                        <div className='message' style={{marginTop: "20px"}}>
                                            <p className={pMessage.type ? "success" : "error"}>{pMessage.value}</p>
                                        </div>
                                    }
                                </form>
                            </div>
                        }
                        
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login