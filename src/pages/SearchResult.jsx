import { useState, useEffect, useContext } from 'react';
import { useLocation, useSearchParams, NavLink, Link, useNavigate  } from 'react-router-dom';
import { useLoader } from "../context/LoaderContext";
import { AuthContext } from '../context/AuthContext';
import { WishListContext } from "../context/WishListContext"; 

function SearchResult()
{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("token");

    const { startLoading, stopLoading } = useLoader();
    const { isLoggedIn } = useContext(AuthContext);
    const { toggleWishlist, wishlistLoadingIds, wishList, fetchWishList } = useContext(WishListContext);
    
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const searchValue = searchParams.get('s');
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const value = searchValue || location?.state?.s || ''; 
    const [products, setProducts] = useState([]);

    useEffect(() => {
        startLoading();
        const num = searchParams.get("page");
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${baseUrl}products-search?name=${value}${num ? `&page=${num}` : ""}`, {
                    headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProducts(data.data);
                setMeta(data.meta)
                stopLoading();
            } catch (err) {
                console.error(err.message);
            }
        };
    
        if (value) { 
            fetchProduct();
        }
    }, [value, searchParams]); 
    
    function checkWishlist(id){
        return wishList.some(item => item.id === id);
    }

    const handlePage = (page) => {
        navigate(`/search?s=${searchValue}&page=${page}`)
        setPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>Search Results For : “ {value} ”</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="search-products widget">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="product-wrapper">
                                {products.map(pro => (
                                    <div className="product-list-content" key={pro?.id}>
                                        <div className="row">
                                            {/* <div className="col-md-1">
                                                <div className="img-area">
                                                    <img src={pro?.image_url} alt={pro?.name} loading="lazy" />
                                                </div>
                                            </div> */}
                                            <div className="col-md-2">
                                                <h2 className="product_sku">
                                                    <span className="badge badge-yellow">{pro?.sku}</span>
                                                </h2>
                                            </div>
                                            <div className="col-md-4">
                                                <h2 className="product_title">
                                                    <NavLink to={`/product/${pro?.slug}`}> {pro?.name}</NavLink>
                                                </h2>
                                                {pro?.brands.length > 0 &&
                                                    <h2 className="brand_name">
                                                        <NavLink to={`/brand/${pro?.brands[0].slug}`}>{pro?.brands[0].name}</NavLink>
                                                    </h2>
                                                }
                                            </div>
                                            <div className="col-md-25 text-center">
                                                <Link to={`/product/${pro?.slug}`}>
                                                    {(pro?.variations.length > 1) ?
                                                        <>
                                                            {(isLoggedIn && pro?.variations[0].price != pro?.variations[pro?.variations.length - 1].price) ?
                                                                <>
                                                                    {(pro?.variations[pro?.variations.length - 1].discounted_price > 0 && pro?.variations[pro?.variations.length - 1]?.stock > 0) ?
                                                                        <>
                                                                            <del>${pro?.variations.map(v => Number(v["sell_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${pro?.variations.map(v => Number(v["price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</del>
                                                                            <p className="price">${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - ${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}</p>
                                                                        </> : <p class="price">Inquiry Now</p>
                                                                    }

                                                                </> :
                                                                <>
                                                                    <p>
                                                                        <span className="price">
                                                                            {(pro?.variations[pro?.variations.length - 1].discounted_price > 0 && pro?.variations[pro?.variations.length - 1]?.stock > 0) ?
                                                                                `$${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.min(pre, next), Infinity)} - $${pro?.variations.map(v => Number(v["discounted_price"])).filter(price => price > 0).reduce((pre, next) => Math.max(pre, next), -Infinity)}` : 'Inquiry Now'
                                                                            }
                                                                        </span>
                                                                    </p>

                                                                </>
                                                            }
                                                        </> :
                                                        <>
                                                            {(isLoggedIn && pro?.price != pro?.discounted_price) ?
                                                                <>
                                                                    <del>${pro?.price}</del>
                                                                    <span className="price"> ${pro?.discounted_price}</span>
                                                                </> :
                                                                <span className="price">{pro?.price > 0 ? '$' + pro?.price : 'Inquiry Now'}</span>
                                                            }
                                                        </>
                                                    }
                                                </Link>
                                            </div>
                                            <div className="col-md-15">
                                                <div className="btn-area">
                                                    <NavLink to={`/product/${pro?.slug}`} ><i className="far fa-eye"></i></NavLink>
                                                    <button
                                                        onClick={() => toggleWishlist(pro?.id)}
                                                        className={`${checkWishlist(pro?.id) ? "active" : ""}`}
                                                        disabled={wishlistLoadingIds.includes(pro?.id)}
                                                        aria-label="Add To Wishlist">
                                                        {wishlistLoadingIds.includes(pro?.id) ? (
                                                            <i className="fa fa-spinner fa-spin"></i>
                                                        ) : (
                                                            <i className={`fa${checkWishlist(pro?.id) ? "s" : "r"} fa-heart`}></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="pagination">
                            {/* Previous button */}
                            <button
                                disabled={meta?.current_page < 2}
                                onClick={() => handlePage(meta?.current_page - 1)}
                                aria-label="Previous"
                            >
                                Previous
                            </button>

                            {(() => {
                                const totalPages = Number(meta?.last_page) || 0;
                                const currentPage = Number(meta?.current_page) || 1;
                                const windowSize = 10;

                                // calculate start & end
                                let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
                                let end = start + windowSize - 1;

                                if (end > totalPages) {
                                    end = totalPages;
                                    start = Math.max(1, end - windowSize + 1);
                                }

                                return [...Array(end - start + 1)].map((_, i) => {
                                    const page = start + i;
                                    return (
                                        <button
                                            key={page}
                                            className={currentPage === page ? "active" : ""}
                                            onClick={() => handlePage(page)}
                                            aria-label={`Page ${page}`}
                                        >
                                            {page}
                                        </button>
                                    );
                                });
                            })()}

                            {/* Next button */}
                            <button
                                disabled={meta?.current_page >= meta?.last_page}
                                onClick={() => handlePage(meta?.current_page + 1)}
                                aria-label="Next"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default SearchResult;