import React from 'react'
import { Helmet } from 'react-helmet'

function JoinUs() {
    return (
        <>
            <Helmet>
                <title>Join Us - Dawn Scientific</title>
                <meta
                    name="description"
                    content="Join Us UPLOAD YOUR RESUME Your Name (required) Your Email (required) Your Phone (required) Attachment (only PDF)*"
                />
            </Helmet>
            <div className='wrapper'>
                <div className='container'>
                    <div className='joinus_box'>
                        <div className='joinus_left back_yellow_dark'>
                            <img src='assets/images/join-us.webp' />
                        </div>
                        <div className='joinus_right'>
                            <div className='dawn_form back_gray'>
                                <form>
                                    <h3>Upload Your Resume</h3>
                                    <div className="form-group">
                                        <label>Your Name (required)</label>
                                        <input type="text" className="form-control" placeholder="Your Name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Your Email (required)</label>
                                        <input type="email" className="form-control" placeholder="Your Email" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Your Phone (required)</label>
                                        <input type="tel" className="form-control" placeholder="Your Phone" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Attachment</label>
                                        <input type="file" className="form-control" placeholder="Quantity" required />
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button type="submit" className="btn btn-primary" aria-label="Submit">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinUs