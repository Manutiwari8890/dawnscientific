import React, {useEffect, useState, useContext} from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useLoader } from "../context/LoaderContext";
import AccountSidebar from '../componments/AccountSidebar';


function Company()
{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const token = user?.access_token;
    const [role, setRole] = useState("");
    const { startLoading, stopLoading } = useLoader();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [users, setUsers] = useState([]);

    const [textId, setTextId] = useState("");
    const [website, setWebsite] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [appLoading, setAppLoading] = useState(false);
    const [message, setMessage] = useState({
        type : "",
        value : "",
    });

    const [company, setCompany] = useState({
        name : "",
        tax_id : "",
        status : "",
        updated_at : "",
        website : ""
    });

    const getOptions = {
        method: "GET",
        headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
    };

    useEffect(() => {
                startLoading()
                fetch(`${baseUrl}user`, getOptions)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setRole(result.data.role || "")
                    if(result.data.company){
                        setCompany(prev => ({
                            ...prev,
                            name : result.data.company.company,
                            tax_id: result.data.company.tax_id,
                            status: result.data.company.status,
                            updated_at: result.data.company.updated_at,
                            website: result.data.company.website
                        }));
                    }
                    
                    stopLoading();
                })
                .catch(error => {
                    console.error('Error fetching User data:', error);
                });
            }, 
        []);   
        
        // useEffect(() => {
            
        //     const fetchCompany = async ()=>{
        //         try{
        //             const response = await fetch(`${baseUrl}company`, {
        //                 method: "GET",
        //                 headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
        //             });
        //             if(!response.ok){
        //                 throw new Error("Company Fetch Failed");
        //             }

        //             const result = await response.json();
        //             console.log(result)
        //             setCompany(prev => ({
        //                 ...prev,
        //                 name : result.data.company_name,
        //                 tax_id: result.data.tax_id,
        //                 status: result.data.status,
        //                 updated_at: result.data.updated_at,
        //                 website: result.data.website
        //             }));
        //         }catch(err){
        //             console.log(err)
        //         }
        //     }
        //         fetchCompany();
        //     }, []);   

        
        const applyCompany = async (e) => {
            e.preventDefault();
            setAppLoading(true);
            const comOptions = {
                method: "POST",
                headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                body : JSON.stringify({
                    company_name : companyName,
                    tax_id : textId,
                    website : website,
                })
            };
            try{
                const response = await fetch(`${baseUrl}company`, comOptions);
                if(!response.ok){
                    throw new Error("Company Create Failed");
                }

                const result = await response.json();
                setMessage({
                    type : result.status,
                    value : result.message
                })
            }catch(err){
                console.error(err)
            }finally{
                setAppLoading(false);
            }
        }

    const handleUser = async (e) => {
        e.preventDefault();
        let errors = validate({name, email})
        setFormErrors(errors);
        setAppLoading(true);    
        
        if(Object.keys(errors).length === 0)
        {
            try{
                const response = await fetch(`${baseUrl}company/user`, {
                    method: "POST",
                    headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                    body : JSON.stringify({
                        name : name,
                        email : email,
                    })
                })
                if(!response.ok){
                    throw new Error("Fecthed Failed User Resgister");
                }

                const result = await response.json();
                setMessage({
                    type : result.status,
                    value : result.message
                })

            }catch(err){
                console.error(err)
            }finally{
                setAppLoading(false);
            }
        }else{
            setAppLoading(false);
        }
    }   
    
    
    useEffect(() => {
        const getUsers = async () => {
            startLoading()
            try{
                const response = await fetch(`${baseUrl}company/users`, {
                    method : 'GET',
                    headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error("Get Users Failed")
                }

                const result = await response.json();
                setUsers(result.data)
                console.log(result)
            }catch(err){
                console.log(err)
            }finally{
                stopLoading(); 
            }
        }
        
        getUsers();
    }, [])

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
        
        return errors
    }


    return (
        <>
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
                            {!company?.tax_id ? 
                                <>
                                <div className="widget">
                                    <h4>Apply For Corporate Account</h4>
                                    <div className={`form-wrapper ${appLoading ? "loading-wrapper" : ""}`}>
                                        <form onSubmit={applyCompany}>
                                            <div className="row">
                                                <div className="col-md-5 m_5_100">
                                                    <div className="form-group">
                                                        <label>Company Name</label>
                                                        <input type="text" className="form-control" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 m_5_100">
                                                    <div className="form-group">
                                                        <label>Tax ID</label>
                                                        <input type="text" className="form-control" placeholder="Tax ID" value={textId || ""} onChange={(e) => setTextId(e.target.value)} required={true} />
                                                    </div>
                                                </div>
                                                <div className="col-md-5 m_5_100">
                                                    <div className="form-group">
                                                        <label>Website URL</label>
                                                        <input type="url" className="form-control" placeholder="Website URL" value={website || ""} onChange={(e) => setWebsite(e.target.value)} required={true} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="message">
                                                <p className={message.type ? "success" : "error"}>{message.value}</p>
                                            </div>
                                            
                                            <div className="btn-area">
                                                <button className={`btn btn-primary ${appLoading ? "loading" : ""}`} aria-label="Submit">{!appLoading ? "Submit" : ""}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                </> :
                                <>
                                    <div className="widget">
                                        <h4>Company Details</h4>
                                        <div className="form-wrapper">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Company Name</label>
                                                            <input type="text" className="form-control" placeholder="Company Name" value={company?.name} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Tax ID</label>
                                                            <input type="text" className="form-control" placeholder="Tax ID" value={company?.tax_id} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Website URL</label>
                                                            <input type="url" className="form-control" placeholder="Website URL" value={company?.website} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label>Updated At</label>
                                                            <input type="text" className="form-control" placeholder="Updated At" value={new Date(company?.updated_at).toLocaleString("en-IN", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                second: "2-digit"
                                                            })} readOnly={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 m_5_100">
                                                        <div className="form-group">
                                                            <label className="w-100">Status</label>
                                                            <div className="status mt-2">
                                                                {company?.status && 
                                                                    (company?.status == 'pending' ? 
                                                                        <span className="badge badge-primary">Pending</span> :
                                                                        company?.status == 'Approved' ? 
                                                                        <span className="badge badge-success">Approved</span> :
                                                                        <span className="badge badge-success">Unapproved</span>
                                                                    )
                                                                }
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>    
                                        <h4>User Registration</h4>
                                        <div className={`form-wrapper ${appLoading ? "loading-wrapper" : ""}`}>
                                            <form onSubmit={handleUser}>
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label>Name</label>
                                                            <input type="text" className="form-control" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                                            <p className="error">{ formErrors.name }</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label>Email Address</label>
                                                            <input type="email" className="form-control" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                                            <p className="error">{ formErrors.email }</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="message">
                                                    <p className={message.type ? "success" : "error"}>{message.value}</p>
                                                </div>
                                                
                                                <div className="btn-area">
                                                    <button className={`btn btn-primary ${appLoading ? "loading" : ""}`} aria-label="Submit">{!appLoading ? "Submit" : ""}</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="widget">
                                        <h4>Access</h4>
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label>Select User</label>
                                                <select className="form-control">
                                                    <option value="">Select User</option>
                                                    {users.length>0 &&
                                                        users?.map((user) => (
                                                            <option value={user?.id} key={user?.id}>{user?.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-group">
                                                <label>Max Length</label>
                                                <input type="number" step="0.1" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="form-check toggle">
                                                <label htmlFor="residential">
                                                    <div className="checkbox toggle"></div>
                                                    <input type="checkbox" id="residential" className="form-check-input toggle" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>    
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Company;