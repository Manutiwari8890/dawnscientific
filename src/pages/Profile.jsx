import React, {useEffect, useState, useContext} from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useLoader } from "../context/LoaderContext";
import AccountSidebar from '../componments/AccountSidebar';


function Profile()
{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const token = user?.access_token;
    const[isLoading, setIsLoading] = useState(false);
    const { startLoading, stopLoading } = useLoader();
    const [passTogle, setPassToggle] = useState([false, false, false]);


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [dname, setDname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [passMessage, setPassMessage] = useState("");
    const [messageType, setMessageType] = useState(false);
    const [current_password, setCurrentPass] = useState("");
    const [new_password, setNewPass] = useState("");
    const [con_new_password, setConNewPass] = useState("");


    const requestOptions = {
        method: "PUT",
        headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
        body : JSON.stringify({
            name : fname,
            last_name : lname,
            display_name : dname,
            email : email
        })
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`${baseUrl}user`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                setMessage(result.message)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    

    const getOptions = {
        method: "GET",
        headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
    };

    useEffect(() => {
        startLoading();
                fetch(`${baseUrl}user`, getOptions)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setFname(result.data.name || "")
                    setLname(result.data.last_name || "")
                    setDname(result.data.display_name || "")
                    setEmail(result.data.email || "")
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                });
            }, 
        []);    


    const passOptions = {
        method: "PUT",
        headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
        body : JSON.stringify({
            current_password : current_password,
            new_password : new_password,
            new_password_confirmation : con_new_password,
        })
    };
    const handlePassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${baseUrl}user/change-password`, passOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => { 
                    setMessageType((result.status) ? true : false)
                    setPassMessage(
                        Array.isArray(result.message?.new_password) && result.message.new_password.length > 0
                        ? result.message.new_password[0]
                        : result.message
                    );
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                });
    }

    return (
        <div className='alert_mgs_fix'>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>My Account</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="account-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-25">
                            <AccountSidebar />
                        </div>
                        <div className="col-md-75">
                            <div className="widget">
                                <h4>Profile Info</h4>
                                
                                <form onSubmit={handleUpdate}>
                                    <div className="row">
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input type="text" className="form-control" placeholder="First Name" value={fname} onChange={(e) => setFname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input type="text" className="form-control" placeholder="Last Name" value={lname} onChange={(e) => setLname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input type="text" className="form-control" placeholder="Company Name" value={dname} onChange={(e) => setDname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 m_5_100">
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input type="email" className="form-control" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="message">
                                        <p className="success">{message}</p>
                                    </div>
                                    <button type="submit" className="btn btn-primary" aria-label="Submit"><i className="fa fa-user"></i> Save Changes</button>
                                </form>
                            </div>
                            <div className={`widget ${isLoading ? "loading-wrapper" : ""}`}>
                                <h4>Change Password</h4>
                                <form onSubmit={handlePassword}>
                                    <div className="form-group">
                                        <label>Old Password</label>
                                        <input type={`${passTogle[0] ? "text" : "password"}`} className="form-control" placeholder="Old Password" value={current_password} onChange={(e) => setCurrentPass(e.target.value)} required />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 0 ? !val : val))
                                        )}>
                                            <i className={`fa togglePassword fa-eye${!passTogle[0] ? "-slash" : ""}`}></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type={`${passTogle[1] ? "text" : "password"}`} className="form-control" placeholder="New Password" value={new_password} onChange={(e) => setNewPass(e.target.value)} required />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 1 ? !val : val))
                                        )}>
                                            <i className={`fa togglePassword fa-eye${!passTogle[1] ? "-slash" : ""}`}></i>
                                        </span>
                                    </div>
                                    <div className="form-group">
                                        <label>Re-type Password</label>
                                        <input type={`${passTogle[2] ? "text" : "password"}`} className="form-control" placeholder="Re-Type Password" value={con_new_password} onChange={(e) => setConNewPass(e.target.value)} required />
                                        <span className="input-group-text" onClick={() => setPassToggle((prev) =>
                                            prev.map((val, index) => (index === 2 ? !val : val))
                                        )}>
                                            <i className={`fa togglePassword fa-eye${!passTogle[2] ? "-slash" : ""}`}></i>
                                        </span>
                                    </div>
                                    <div className="message">
                                       {passMessage &&  <p className={messageType ? "success" : "error"}>{passMessage}</p>}
                                    </div>
                                    <div className="btn-area mt-4">
                                        <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`} aria-label="Submit">
                                            {!isLoading && (
                                                    <>
                                                        <i className="fa fa-key"></i> Change Password
                                                    </>
                                                )}
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Profile;