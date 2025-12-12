import React from 'react'
import { Helmet } from 'react-helmet'

function GetQuote() {
    return (
        <>
            <Helmet>
                <title>Get quote - Dawn Scientific</title>
                <meta
                    name="description"
                    content="Request for Quotation Please provide us with your current chemical needs and let our team do the work on getting you the best prices on all your chemical needs. Catalog# Product* Size* (Pack Size) Quantity* Your Name Your Email Phone Number Company Your Message"
                />
            </Helmet>
            <div className='wrapper'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Request for Quotation</h1>
                        <p>Please provide us with your current chemical needs and let our team do the work on getting you the best prices on all your chemical needs.</p>
                    </div>
                    <div className='dawn_form back_gray'>
                        <form>
                            <div className='row'>
                                <div className="form-group col_3">
                                    <label>Catalog#</label>
                                    <input type="text" className="form-control" placeholder="Catalog" />
                                </div>
                                <div className="form-group col_3">
                                    <label>Product*</label>
                                    <input type="text" className="form-control" placeholder="Product" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Size* (Pack Size)</label>
                                    <input type="text" className="form-control" placeholder="Size" required />
                                </div>
                                <div className="form-group col_3">
                                    <label>Quantity*</label>
                                    <input type="text" className="form-control" placeholder="Quantity" required />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <input type="text" className="form-control" placeholder="" />
                                </div>
                                <div className="form-group col_3">
                                    <label>Your Name</label>
                                    <input type="text" className="form-control" placeholder="Your Name" />
                                </div>
                                <div className="form-group col_3">
                                    <label>Your Email</label>
                                    <input type="email" className="form-control" placeholder="Your Email" />
                                </div>
                                <div className="form-group col_3">
                                    <label>Phone Number</label>
                                    <input type="tel" className="form-control" placeholder="Phone Number" />
                                </div>
                                <div className="form-group col_3">
                                    <label>Company</label>
                                    <input type="text" className="form-control" placeholder="Company" />
                                </div>
                                <div className="form-group col_12">
                                    <label>Your Message</label>
                                    <textarea className="form-control" placeholder="Your Message" />
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <button type="submit" className="btn btn-primary" aria-label="Submit">Get Quote</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default GetQuote