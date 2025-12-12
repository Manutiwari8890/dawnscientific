import { Link } from "react-router-dom";

function Error(){
    return (
        <>
            <section className="not-found">
                <div className="container">
                    <div className="row justify-content-center flex-column">
                        <div className="img-area text-center">
                            <img src="/assets/images/404.webp" alt="" />
                        </div>
                        <div className="title text-center">
                            <h2>OOPS ! PAGE NOT FOUND</h2>
                            <Link className="btn btn-primary" to="/">BACK TO HOME</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Error;