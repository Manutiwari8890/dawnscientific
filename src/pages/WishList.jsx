import { NavLink } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext';
import { WishListContext } from '../context/WishListContext';
import { useLoader } from "../context/LoaderContext";
import AccountSidebar from "../componments/AccountSidebar";

function WishList() {
    const { logout } = useContext(AuthContext);
    const { wishList, toggleWishlist, wishlistLoadingIds, fetchWishList } = useContext(WishListContext);
    const { startLoading, stopLoading } = useLoader();

    function checkWishlist(id) {
        return wishList.some(item => item.id === id);
    }

    useEffect(() => {
        const loadWishlist = async () => {
            startLoading();
            await fetchWishList(); // fills context state
            stopLoading();
        };
        loadWishlist();
    }, []);

    return (
        <>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>My WishList</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="account-wrapper">
                <div className="container">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-md-25">
                            <AccountSidebar />
                        </div>

                        {/* Wishlist Content */}
                        <div className="col-md-75">
                            <div className="widget">
                                <h4>My Wishlist</h4>
                                <div className="row">
                                    {wishList?.length > 0 ? (
                                        <div className="product-wrapper wishlist">
                                            {wishList.map(pro => (
                                                
                                                <div className="product-list-content" key={pro.id}>
                                                    <div className="row">
                                                        <div className="col-md-1">
                                                            <div className="img-area">
                                                                <img src={pro?.image_url} alt={pro?.name} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-15">
                                                            <h2 className="product_sku">
                                                                <span className="badge badge-yellow">{pro?.sku}</span>
                                                            </h2>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <h2 className="product_title">
                                                                <NavLink to={`/product/${pro?.slug}`}> {pro?.name}</NavLink>
                                                            </h2>
                                                        </div>
                                                        <div className="col-md-15">
                                                            <span className="price">$ {pro?.price}</span>
                                                        </div>
                                                        {pro?.brands &&
                                                            <div className="col-md-15">
                                                                <h2 className="brand_name">
                                                                    <NavLink to={`/product-category/all-brands/${pro.brands[0].slug}`}>
                                                                        {pro.brands[0].name}
                                                                    </NavLink>
                                                                </h2>
                                                            </div>
                                                        }

                                                        <div className="col-md-15">
                                                            <div className="btn-area">
                                                                <NavLink to={`/product/${pro?.slug}`} ><i className="far fa-eye"></i></NavLink>
                                                                <button
                                                                    onClick={() => toggleWishlist(pro.id)}
                                                                    className={`${checkWishlist(pro.id) ? "active" : ""}`}
                                                                    disabled={wishlistLoadingIds.includes(pro.id)}
                                                                    aria-label="Wishlist"
                                                                >
                                                                    {wishlistLoadingIds.includes(pro.id) ? (
                                                                        <i className="fa fa-spinner fa-spin"></i>
                                                                    ) : (
                                                                        <i className={`fa${checkWishlist(pro.id) ? "s" : "r"} fa-heart`}></i>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="empty-wrapper">
                                            <i className="far fa-heart"></i>
                                            <h2>WishList is Empty</h2>
                                            <NavLink to="/product-category" className="btn btn-primary">Return To Shop</NavLink>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WishList;
