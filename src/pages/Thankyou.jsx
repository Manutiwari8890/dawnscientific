import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';

function Thankyou(){
    
    const location = useLocation();
    const data = location.state?.data;

    return (
        <div>
            <section className="thankyou page-title">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="thankyou-wrapper widget">
                            <div className="icon">
                                <i className="fa fa-check"></i>
                            </div>
                            <div className="title">
                                <h2>Thank You</h2>
                                <p></p>
                            </div>
                            <div className="btn-area">
                                <NavLink to="/product-category" className="btn btn-secondary">Go Back Shopping <i className="fa fa-arrow-right"></i></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Thankyou