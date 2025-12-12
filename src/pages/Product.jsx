import React, { useContext, useEffect, useState, useRef } from 'react'
import { useParams, useLocation, NavLink, Link, useNavigate } from 'react-router-dom';
import Quantity from '../componments/Quantity';
import { CartContext } from '../context/cart';
import { AuthContext } from '../context/AuthContext';
import ZoomImage from './ZoomImage';
import { WishListContext } from '../context/WishListContext';
import { useLoader } from "../context/LoaderContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Helmet } from "react-helmet";
import Turnstile from "react-turnstile";


function Product({ onToggleCart }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [popStatus, setPopStatus] = useState(false);

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { toggleWishlist, getWishList, wishlistLoadingIds, fetchWishList, wishList } = useContext(WishListContext);
    const { startLoading, stopLoading } = useLoader();
    const [loadingButton, setLoadingButton] = useState(null);

    const [encodedUrl, setEncodedUrl] = useState("");
    const [encodedTitle, setEncodedTitle] = useState("");
    const [encodedImage, setEncodedImage] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [captchaMessage, setCaptchaMessage] = useState("");

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    let { slug } = useParams()
    const { user, logout, isLoggedIn } = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [quantity, setQuantity] = useState({});
    const [equantity, setEquantity] = useState("");
    const [lowest, setLowest] = useState([0, 0]);
    const handleQuantityChange = (Id, value) => {
        setQuantity((prev) => ({
            ...prev,
            [Id]: value >= 1 ? value : 0,
        }));
    };

    const [productTab, setProductTab] = useState(1);

    const { cartItems, addToCart, recentlyViewed } = useContext(CartContext)
    
    const [ratingMes, setRatingMes] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [revLoad, setRevLoad] = useState(false);
    const [rmessage, setRmessage] = useState({
        type: false,
        value: "",
    });

    const [reviews, setReviews] = useState([]);
    const [bigImg, setBigImg] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [bfname, setBfname] = useState("");
    const [blname, setBlname] = useState("");
    const [bemail, setBemail] = useState("");
    const [bnumber, setBnumber] = useState("");
    const [bcompany, setBcompany] = useState("");
    const [blocation, setBlocation] = useState("");
    const [bmessage, setBmessage] = useState("");
    const [bulkMessage, setBulkmessage] = useState("");

    function normalizeSlug(slug) {
        let encoded = encodeURIComponent(slug);
        encoded = encoded.replace(/%2D/g, "-");
        return encoded.toLowerCase();
    }

    useEffect(() => {
        startLoading();
        const getDetails = async () => {
            try {
                const res = await fetch(`${baseUrl}products/${normalizeSlug(slug)}`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    throw new Error("Review Fetch Failed");
                }

                const result = await res.json();
                if (result.status) {
                    await fetchWishList();
                    setData(result.data)
                    
                    recentlyViewed(result.data)
                    if(result.data.variations){
                        const minSell = result?.data?.variations 
                        .map(v => Number(v["sell_price"])) .filter(price => price > 0) 
                        .reduce((pre, next) => Math.min(pre, next), Infinity); 

                        const minDiscount = result?.data?.variations 
                        .map(v => Number(v["discounted_price"])) .filter(price => price > 0) 
                        .reduce((pre, next) => Math.min(pre, next), Infinity); 

                        setLowest([minSell, minDiscount])
                    }
                    setEncodedTitle(result.data.name)
                    setEncodedUrl(`https://dawn-project.vercel.app/product/${result.data.name}`)
                    setEncodedImage(result.data.image_url);
                }else{
                    navigate('/404')
                }

            } catch (err) {
                console.error(err)
            } finally {
                stopLoading(false)
            }
        }
        getDetails();
    },
        [slug]);

    useEffect(() => {
        const getReview = async () => {
            try {
                const res = await fetch(`${baseUrl}products/${data?.id}/reviews?per_page=5`);
                if (!res.ok) {
                    throw new Error("Review Fetch Failed");
                }
                const result = await res.json();
                if (result.status) {
                    setReviews(result.data)
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (data?.id) {
            getReview();
        }

    }, [rmessage, data]);

    const handleAddToCart = async (id, qty, variation_id = null) => {
        const currentKey = id || variation_id; // store locally
        setLoadingButton(currentKey);
        const product = { ...data, quantity: qty, variation_id };
        const res = await addToCart(product);

        if (res) {
            if (onToggleCart) {
                onToggleCart(); // open the sidebar
            }
            setLoadingButton(null);
        }
    };


    const handleBulk = (e) => {
        e.preventDefault();
        let regobj = {
            product_id: data.id,
            first_name: bfname,
            last_name: blname,
            contact_no: bnumber,
            email: bemail,
            company: bcompany,
            location: blocation,
            message: bmessage,
            quantity : equantity,
            "cf-turnstile-response" : captchaValue
        };

        if(captchaValue){
            setIsLoading(true);
            fetch(`${baseUrl}bulk-inquiry`, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((response) => {
                return response.json().then((data) => ({
                    status: response.status,
                    body: data,
                }))
            }).then(({ status, body }) => {
                setBulkmessage(body.message);
                setBfname("");
                setBlname("");
                setBemail("");
                setBnumber("");
                setBcompany("");
                setBlocation("");
                setBmessage("");
                setEquantity("");
                setIsLoading(false);
            }).catch((err) => {
                setBulkmessage("Validation error: " + err.message);
            })
        }else{
            setCaptchaMessage("Please select the captcha")
        }
        
    }
    const checkWishlist = (id) => {
        return wishList.some(item => item.id === id);
    }


    const handleRating = async (e) => {
        e.preventDefault();
        if (!ratingMes) {
            setRmessage({
                type: false,
                value: "Message Required !"
            })
            return;
        }

        setRevLoad(true);
        const ratData = {
            product_id: data?.id,
            rating: rating,
            description: ratingMes
        }
        try {
            const response = await fetch(`${baseUrl}reviews`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(ratData)
            });
            if (!response.ok) {
                throw new Error("Rating Fetched Failed");
            }
            const result = await response.json();
            setRmessage({
                type: result.status,
                value: result.message
            })

        } catch (err) {
            console.error(err)
        } finally {
            setRevLoad(false);
        }

    }

    const handlePhone = (e) => {
        let value = e.target.value;
        value = value.replace(/[^\d+]/g, "");
        if (value.length > 15) {
            value = value.slice(0, 15);
        }
        setBnumber(value)
    }

    return (
        <>
            {data?.meta_title ?

                <Helmet>
                    <title>{data?.meta_title || data?.name} </title>
                    <meta
                        name="description"
                        content={data?.meta_description || `${data?.name} available now.`}
                    />
                    <meta
                        name="keywords"
                        content={data?.meta_keyword || data?.name.split(" ").join(", ")}
                    />
                </Helmet> :
                <Helmet>
                    <title>{`${data?.name} | Dawn Scientific`} </title>
                    <meta name="description" content={data?.short_description || `Buy ${data?.name} at best price`} />
                    <meta name="keywords" content={`${data?.name}, ${data?.sku}, Dawn Scientific`} />
                    <meta property="og:title" content={data?.name} />
                    <meta property="og:description" content={data?.short_description || data?.name} />
                    <meta property="og:type" content="product" />
                    <meta property="og:url" content={`https://dawnscientific.com/product/${data?.slug}`} />
                    <meta property="og:image" content={data?.image_url} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content={data?.name} />
                    <meta name="twitter:description" content={data?.short_description || data?.name} />
                    <meta name="twitter:image" content={data?.image_url} />
                    <link rel="canonical" href={`https://dawnscientific.com/product/${data?.slug}`} />
                </Helmet>
            }
            <div className={`enquiry-modal modal ${popStatus ? 'active' : ''}`} id="demo-modal"
                onClick={(e) => {
                    if (e.target.classList.contains("enquiry-modal")) {
                        const wrapper = document.querySelector(".enquiry-modal .form-wrapper");
                        wrapper.classList.add("animate-bounce");
                        wrapper.addEventListener("animationend", () => {
                        wrapper.classList.remove("animate-bounce");
                        }, { once: true });
                    }
                    }}
            >
                <div className={`form-wrapper widget ${isLoading ? "loading-wrapper" : ""}`}>
                    <div className="logo">
                        <img alt="" src="/assets/images/Website-logo-1.webp" loading="lazy" />
                    </div>
                    <form onSubmit={handleBulk}>
                        <div className="row">
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" placeholder="Enter your first name" value={bfname} onChange={(e) => setBfname(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" placeholder="Enter your last name" value={blname} onChange={(e) => setBlname(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-33">
                                <div className="form-group">
                                    <label>Contact Number</label>
                                    <input type="tel" className="form-control" max="15" placeholder="Enter your contact number" value={bnumber} onChange={(e) => handlePhone(e)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Enter your email" value={bemail} onChange={(e) => setBemail(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Company</label>
                                    <input type="text" className="form-control" placeholder="Enter your company name" value={bcompany} onChange={(e) => setBcompany(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" placeholder="Location" value={blocation} onChange={(e) => setBlocation(e.target.value)} required />
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea placeholder="Message . . ." onChange={(e) => setBmessage(e.target.value)} value={bmessage} required></textarea>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="number" min="1" placeholder="Quantity" value={equantity} onChange={(e) => setEquantity(e.target.value)}  required />
                                </div>
                            </div>
                            <Turnstile
                                sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                onVerify={handleCaptchaChange}
                            />
                        </div>
                        {captchaMessage && <p className="error">{captchaMessage}</p>}
                        {bulkMessage && <p className="success">{bulkMessage}</p>}
                        <button className={`btn btn-primary w-100 mt-2 ${isLoading ? "loading" : ""}`} aria-label="Submit">{!isLoading ? "Submit" : ""}</button>
                    </form>
                </div>
                <button type="button" className="modal__close" onClick={() => {
                    setPopStatus(false)
                    document.documentElement.style.overflow = "auto";
                }} aria-label="Close Modal">&times;</button>
            </div>
            
            <section className="single-main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="product-image-wrapper">
                                <div className="product-image-slider">
                                    {data?.image_url ?
                                        <ZoomImage
                                            src={bigImg || data?.image_url}
                                        /> :
                                        <ZoomImage
                                            src={bigImg || data?.brands[0].image_url}
                                        />
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="short-description">
                                <div className="sku"><b>{data?.sku}</b></div>
                                <div className="title">
                                    <div className="title_p">
                                        <h1>{data?.name}</h1>
                                            <div className="price">
                                                {(data?.variations.length > 1) ?
                                                    <>
                                                        {isLoggedIn ?
                                                            <>
                                                                <div>
                                                                    <del>${lowest[0]} - ${data?.variations[data?.variations.length - 1].price}</del>
                                                                </div>
                                                                <div>
                                                                    <span className="price">${lowest[1]} - ${data?.variations[data?.variations.length - 1].discounted_price}</span>
                                                                </div>

                                                            </> :
                                                            <>
                                                                <p>
                                                                    <span className="price">${lowest[0]} - ${data?.variations[data?.variations.length - 1].price}</span>
                                                                </p>

                                                            </>
                                                        }
                                                    </> :
                                                    <>
                                                        {(Number(data?.price)>0) ?
                                                            (
                                                                isLoggedIn ?
                                                                <>
                                                                    <del>${data?.price}</del>
                                                                    <span className="price">${data?.discounted_price}</span>
                                                                </> :
                                                                <span className="price">${data?.price}</span>
                                                            ) : 
                                                            ''
                                                        }
                                                    </>
                                                }
                                            </div>

                                    </div>

                                    {data?.brands &&
                                        <div className="brands">
                                            {data?.brands.map((brand) => (
                                                <NavLink to={`/brand/${brand.slug}`} className="brand-img" key={brand.id}><img src={brand.image_url} loading="lazy" /></NavLink>
                                            ))}
                                        </div>
                                    }
                                </div>

                                <p dangerouslySetInnerHTML={{ __html: data?.short_description }}></p>
                                {data?.variations.length < 1 && data?.price > 0 &&
                                    <div className="shop-single-sortinfo">
                                        <ul>
                                            <li>
                                                <Quantity quantity={quantity[data?.id] || 1} setQuantity={(val) => handleQuantityChange(data?.id, val)} label={true} />
                                            </li>
                                        </ul>
                                    </div>
                                }

                                {data?.variations.length < 1 &&
                                    <div className="btn-area">
                                        {data?.price > 0 ?
                                            <>
                                                <button className="btn btn-primary" onClick={() => handleAddToCart(data?.id, quantity[data?.id] || 0)} aria-label="Add To Cart">{
                                                    loadingButton === data?.id ?
                                                        <>
                                                            <i className="fa fa-spinner fa-spin"></i>
                                                        </>
                                                        :
                                                        <>
                                                            <i className="fa fa-shopping-bag"></i> Add To Cart
                                                        </>
                                                }
                                                </button>
                                                <button
                                                    onClick={() => toggleWishlist(data?.id)}
                                                    className={`${checkWishlist(data?.id) ? "active" : ""} btn btn-wishlist`}
                                                    disabled={wishlistLoadingIds.includes(data?.id)}
                                                    aria-label="Toggle Wishlist"
                                                >
                                                    {wishlistLoadingIds.includes(data?.id) ? (
                                                        <i className="fa fa-spinner fa-spin"></i>
                                                    ) : (
                                                        <i className={`fa${checkWishlist(data?.id) ? "s" : "r"} fa-heart`}></i>
                                                    )}
                                                </button>
                                            </> :
                                            <button className="btn btn-primary" onClick={() => {
                                                document.documentElement.style.overflow = "hidden";
                                                setPopStatus(true)
                                            }} aria-label="Inquiry">Inquiry Now</button>

                                        }
                                    </div>
                                }

                                {data?.variations.length > 0 &&
                                    <div className="vartion-products">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Catalogue</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.variations.map((variation) => (
                                                        <tr key={variation.id}>
                                                            <td>{variation.sku}</td>
                                                            <td>{variation.size}</td>
                                                            <td>
                                                                <span className="price">
                                                                    {variation?.price > 0 ?
                                                                        ((isLoggedIn && variation.price!=variation.discounted_price) ?
                                                                            <>
                                                                                <del>${variation.price}</del>&nbsp;
                                                                                <span className="price">${variation.discounted_price}</span>
                                                                            </> :
                                                                            `$${variation.price}`
                                                                        ) :
                                                                        '-'
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td>
                                                                {((Number(variation?.price) > 0) && (Number(variation?.stock) > 0)) ?
                                                                    <Quantity quantity={quantity[variation.id] || 1} setQuantity={(val) => handleQuantityChange(variation.id, val)} /> :
                                                                    '-' 
                                                                }
                                                            </td>
                                                            <td>
                                                                {(Number(variation?.price) > 0 && Number(variation?.stock) > 0) ?
                                                                    <>
                                                                        <button className="btn btn-primary" onClick={() => handleAddToCart(null, quantity[variation?.id], variation.id)} aria-label="Add To Cart">{
                                                                                loadingButton === variation?.id ?
                                                                                    <i className="fa fa-spinner fa-spin"></i>
                                                                                    :
                                                                                    <>
                                                                                        <i className="fa fa-shopping-bag"></i> Add To Cart
                                                                                    </>
                                                                            }
                                                                        </button>
                                                                    </> :
                                                                    <button className="btn btn-primary" onClick={() => setPopStatus(true)} aria-label="Inquiry">Inquiry Now</button>
                                                                }

                                                            </td>
                                                        </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <div className="extra-info">
                                    <div className="share">
                                        Share :
                                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="share"><i className="fab fa-facebook-f"></i></a>
                                        <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share"><i className="fa-brands fa-x-twitter"></i></a>
                                        <a href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share"><i className="fab fa-pinterest"></i></a>
                                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="share"><i className="fab fa-linkedin-in"></i></a>
                                    </div>
                                    <div className="shop-single-sortinfo">
                                        <ul>
                                            <li>Category: 
                                                {data?.categories.map((cat, index) => (
                                                    <NavLink to={`/product-category/${cat?.slug}`} key={cat.id}>{cat.name}{(data.categories.length > index + 1) ? ' , ' : ''}</NavLink>
                                                ))}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="single-product-details">
                <div className="container">
                    <div className="row">
                        <div className="tabs-wrapper">
                            <nav>
                                <div className="nav-tabs">
                                    <button className={`nav-link ${(productTab == 1) ? 'active' : ''}`} onClick={() => setProductTab(1)} aria-label="Description">Description</button>
                                    <button className={`nav-link ${(productTab == 2) ? 'active' : ''}`} onClick={() => setProductTab(2)} aria-label="Additional Info">Additional Info</button>
                                    <button className={`nav-link ${(productTab == 3) ? 'active' : ''}`} onClick={() => setProductTab(3)} aria-label="Reviews">Reviews</button>
                                    <button className={`nav-link ${(productTab == 4) ? 'active' : ''}`} onClick={() => setProductTab(4)} aria-label="Bulk Inquiry">Bulk Inquiry</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className={`tab-pane fade ${(productTab == 1) ? 'active' : ''}`} role="tabpanel" aria-labelledby="nav-tab1">
                                    <div className="shop-single-desc">
                                        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${(productTab == 2) ? 'active' : ''}`} role="tabpanel" aria-labelledby="nav-tab2">
                                    <div className="shop-single-additional">
                                        <div dangerouslySetInnerHTML={{ __html: data?.additional_info }} />
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${(productTab == 3) ? 'active' : ''}`} role="tabpanel" aria-labelledby="nav-tab3">
                                    <div className="shop-review">
                                        <div className="review-comments">
                                            <div className="col-md-5">
                                                <h5>Reviews ({reviews?.length})</h5>
                                                {reviews?.length > 0 && (
                                                    reviews?.map((rev) => (
                                                        <div className="single-review" key={rev?.id}>
                                                            <div className="user-details">
                                                                <div className="img-area">
                                                                    <img src="/assets/images/user.webp" alt="User" loading="lazy" />
                                                                </div>
                                                                <h4>{rev.user.name}</h4>
                                                            </div>
                                                            <div className="rating">
                                                                <p>{rev.description}</p>
                                                                <div className="d-flex">
                                                                    {[...Array(rev.rating)].map((_, i) => (
                                                                        <span className="rating-star" key={i}><i className="fa fa-star"></i></span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                )
                                                }
                                            </div>


                                            <div className="form-wrapper">
                                                <div className="col-md-5">
                                                    {isLoggedIn ?
                                                        <form onSubmit={handleRating}>
                                                            <div className={`form-group ${revLoad ? "loading-wrapper" : ""}`}>
                                                                <textarea placeholder="Review . . ." onChange={(e) => setRatingMes(e.target.value)} value={ratingMes}>{ratingMes}</textarea>
                                                            </div>
                                                            <div className="d-flex mb-2">
                                                                {[...Array(5)].map((star, index) => {
                                                                    const value = index + 1;
                                                                    return (
                                                                        <button
                                                                            key={value}
                                                                            type="button"
                                                                            onClick={() => setRating(value)}
                                                                            onMouseEnter={() => setHover(value)}
                                                                            onMouseLeave={() => setHover(0)}
                                                                            className={`rating-btn ${value <= (hover || rating) ? "active" : ""
                                                                                }`}
                                                                            aria-label={value}
                                                                        >
                                                                            <i className="fa fa-star"></i>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                            {rmessage.value &&
                                                                <p className={`${rmessage.type ? "success" : "error"}`}>{rmessage.value}</p>
                                                            }
                                                            <button className={`btn btn-primary ${revLoad ? "loading" : ""}`} aria-label="Submit">{revLoad ? "" : "Submit"}</button>
                                                        </form> :
                                                        <p>Please <NavLink to="/login">Login</NavLink></p>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`tab-pane fade ${(productTab == 4) ? 'active' : ''}`}>
                                    <div className={`col-md-8 dawn_form ${isLoading ? "loading-wrapper" : ""}`}>
                                        <form onSubmit={handleBulk}>
                                            <div className="row">
                                                <div className="form-group col_6">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" placeholder="Enter your first name" value={bfname} onChange={(e) => setBfname(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" placeholder="Enter your last name" value={blname} onChange={(e) => setBlname(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Contact Number</label>
                                                    <input type="tel" max="15" className="form-control" placeholder="Enter your contact number" value={bnumber} onChange={(e) => handlePhone(e)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Email</label>
                                                    <input type="email" className="form-control" placeholder="Enter your email" value={bemail} onChange={(e) => setBemail(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Company</label>
                                                    <input type="text" className="form-control" placeholder="Enter your company name" value={bcompany} onChange={(e) => setBcompany(e.target.value)} required />
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Location</label>
                                                    <input type="text" className="form-control" placeholder="Location" value={blocation} onChange={(e) => setBlocation(e.target.value)} required />
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Quantity</label>
                                                        <input type="number" min="1" placeholder="Quantity" value={equantity} onChange={(e) => setEquantity(e.target.value)}  required />
                                                    </div>
                                                </div>
                                                <div className="form-group col_6">
                                                    <label>Message</label>
                                                    <textarea placeholder="Message . . ." onChange={(e) => setBmessage(e.target.value)} value={bmessage} required></textarea>
                                                </div>
                                                <Turnstile
                                                    sitekey="0x4AAAAAAB6ROztNKa7zfprV"
                                                    onVerify={handleCaptchaChange}
                                                />
                                            </div>
                                            {captchaMessage && <p className="error">{captchaMessage}</p>}
                                            {bulkMessage && <p className="success">{bulkMessage}</p>}
                                            <button className={`btn btn-primary mt-2 ${isLoading ? "loading" : ""}`} aria-label="Submit">{!isLoading ? "Submit" : ""}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="related">
                <div className="container">
                    <div className="title">
                        <h2>Related Products</h2>
                    </div>
                    <div className="row widget">
                        {data?.relatedProducts && (
                            <Swiper
                                modules={[Navigation, Autoplay, Pagination]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={{ clickable: true }}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: (data?.relatedProducts.length > 4 ? 4 : data?.relatedProducts.length) },
                                }}
                            >
                                {data.relatedProducts.map((pro) => (
                                    <SwiperSlide key={pro.id}>
                                        <Link to={`/product/${pro?.slug}`} aria-label={pro?.name} className="category-item">
                                            <div className="img-container">
                                                <img src={pro.image_url} alt="" loading="lazy" />
                                                <div className="category-action-wrap">
                                                    <div className="category-action">
                                                        <span><i className="far fa-eye"></i></span>
                                                        <button
                                                            onClick={() => toggleWishlist(pro?.id)}
                                                            className={`${checkWishlist(pro?.id) ? "active" : ""}`}
                                                            disabled={wishlistLoadingIds.includes(pro?.id)}
                                                            aria-label="Wishlist"
                                                        >
                                                            {wishlistLoadingIds.includes(pro.id) ? (
                                                                <i className="fa fa-spinner fa-spin"></i>
                                                            ) : (
                                                                <i className={`fa${checkWishlist(pro?.id) ? "s" : "r"} fa-heart`}></i>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h2 aria-label={pro?.name}>{pro.name}</h2>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Product