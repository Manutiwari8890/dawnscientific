import React, {useEffect, useState} from 'react'
import { useParams, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';


function ResetPassword(){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [isLoading, setIsLoading] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState({
        type : false,
        value : "",
    });
    const [token, setToken] = useState();
    const [passTogle, setPassToggle] = useState([false, false]);

    let { key } = useParams();
    useEffect(() => {
        if (key) {
        setToken(key);
        }
    }, [key]);

    const handlesubmit = (e) => {
            e.preventDefault();

            let regobj = {
                token,
                password,
                password_confirmation : confirmPassword,
            };
            setFormErrors(validate(regobj));
                      
            const raw = JSON.stringify(regobj);
            const requestOptions = {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: raw,
            };

            
            if(Object.keys(formErrors).length === 0)
            {
                setIsLoading(true);
                fetch(`${baseUrl}reset-password`, requestOptions)
                .then((response) => {
                    return response.json().then((data) => ({
                        status: response.status,
                        body: data,
                    }))
                })
                .then(({status, body}) => {
                    setMessage({
                        type : body.status,
                        value :  body.message
                    });
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error)
                    setIsLoading(false);
                });
            }
        }
    
        const validate = (val) => {
            const errors = {}
            
            if(!val.password){
            errors.password = "Password is required !"
            }
            if(!val.password_confirmation){
                errors.password_confirmation = "Confirm Password is required !"
            }else if(val.password !== val.password_confirmation){
                errors.password_confirmation = "Confirm Password does not match !"
            }
            
            return errors
        }

    return (
        <div>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>RESET PASSWORD</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="authentication">
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className={`form-wrapper widget ${isLoading ? 'loading-wrapper' : ''}`}>
                            <div className="logo">
                                <img src="assets/images/Website-logo-1.webp" alt="" />
                            </div>
                            {token ? 
                                <form onSubmit={handlesubmit}>
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
                                        <input type={`${passTogle[1] ? "text" : "password"}`} className="form-control" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 1 ? !val : val))
                                        )}>
                                            <i className={`fa togglePassword fa-eye${!passTogle[1] ? "-slash" : ""}`}></i>
                                        </span>
                                        <p className="error">{ formErrors.password_confirmation }</p>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type="submit" className={`btn btn-primary w-100 ${isLoading ? 'loading' : ''}`} aria-label="Submit">{!isLoading ? 
                                            <>
                                                <i className="fa fa-sign-in"></i>
                                                Update
                                            </> : ''}
                                        </button>
                                    </div>
                                    <div className="message" style={{marginTop:"10px"}}>
                                        <p className={`${message.type ? "success" : "error"}`}>{message.value}</p>
                                    </div>
                                </form> :
                                <h2 className='text-center'>Token Expired</h2>
                            }
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ResetPassword