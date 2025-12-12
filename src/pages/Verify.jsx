import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';

function Verify()
{
    const { startLoading, stopLoading } = useLoader();
    
    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get('uid');
    const hash = searchParams.get('hash');

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const [message, setMessage] = useState({
        type : true,
        value : "",
    })

    useEffect(() => {
        startLoading();
        const verfiyEmail = async ()=>{
            try{
                const response = await fetch(`${baseUrl}email/verify/${uid}/${hash}`);

                if(!response.ok){
                    throw new Error("Verification Failed");
                }
                const result = await response.json();
                    setMessage({
                        type : result.status,
                        value : result.message
                    })
            }catch(err){
                console.error(err)
            }finally{
                stopLoading();
            }
        }

        if(uid && hash){
            verfiyEmail();
        }
    }, [])
    return (
        <>
            <section className="thankyou page-title">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="thankyou-wrapper widget">
                            <div className="icon">
                                <i className={`fa fa-${message?.type ? "check" : "close"}`}></i>
                            </div>
                            <div className="title">
                                {message?.type ? 
                                    <h2>{message.value}</h2> :      
                                    <div className="message">
                                        <h2 className="error">{message.value}</h2>
                                    </div>                         
                                }
                            </div>
                            <div className="btn-area">
                                {message?.type ? 
                                <NavLink to="/product-category" className="btn btn-secondary">Go To Shopping <i className="fa fa-arrow-right"></i></NavLink> :
                                <NavLink to="/register" className="btn btn-secondary">Register</NavLink>                             
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Verify;