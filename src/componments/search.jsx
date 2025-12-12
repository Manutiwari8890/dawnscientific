import React, { useState, useContext, useEffect} from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function Search({ isActive, onClose }) {

    const navigate = useNavigate();
    const location = useLocation();

    const [searchText, setSearchText] = useState("");
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setSearchText("");
        onClose();
    }, [location.pathname])

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/search?s=${searchText}`, { state: { value: searchText } });
        setSearchText("");
        onClose();
    }

    const handleSuggestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${baseUrl}suggestions?search=${searchText}`, {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Suggestions Failse")
            }

            const result = await response.json();
            setCategory(result.data.categories);
            setProducts(result.data.products);
            setBrands(result.data.brands);
            setLoading(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className={`search-popup ${isActive ? 'active' : ''}`}>
                <div className="search-wrapper">
                    <button className="close-search" onClick={onClose} aria-label="close search">
                        <i className="fa fa-times"></i>
                    </button>
                    <div className="serach-form">
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="search" aria-label="Search Products" placeholder="Search Here..." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyUp={() => handleSuggestions()} />
                            <button type="submit" arai-label="Search"><i className="fa fa-search"></i></button>
                        </form>
                        <div className={`search-result-wrapper ${loading ? "search-loading" : ""}`}>
                            <div className={`search-result ${searchText ? "active" : ""}`}>
                                <div className="row">
                                    <div className="col-md-35">
                                        <h4>Category</h4>
                                        <Swiper
                                            modules={[Navigation, Autoplay]}
                                            spaceBetween={20}
                                            slidesPerView={1}
                                            navigation
                                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                                            loop={true}
                                            pagination={false}
                                            breakpoints={{
                                                480: { slidesPerView: 1 },
                                                768: { slidesPerView: 1 },
                                                1024: { slidesPerView: 1 },
                                            }}
                                        >
                                            {category && 
                                                (category.map((cat) => (
                                                    <SwiperSlide key={cat?.id}>
                                                        <div className="category-item">
                                                            <div className="img-container">
                                                                <img src={cat?.image_url ? cat.image_url : "/assets/images/Placeholder_logo.webp"} alt="" loading="lazy" />
                                                                <div className="category-action-wrap">
                                                                    <div className="category-action">
                                                                        <NavLink to={`/product-category/${cat.slug}`}><i className="far fa-eye"></i></NavLink>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="content">
                                                                <h3><NavLink to={`/product-category/${cat.slug}`}>{cat.name}</NavLink></h3>
                                                                <p>{cat?.p_count} Products</p>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )))
                                                
                                            }
                                            
                                        </Swiper>
                                        <br/><br/>
                                        <h4>Brands</h4>
                                        <Swiper
                                            modules={[Navigation, Autoplay]}
                                            spaceBetween={20}
                                            slidesPerView={1}
                                            navigation
                                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                                            loop={true}
                                            pagination={false}
                                            breakpoints={{
                                                480: { slidesPerView: 1 },
                                                768: { slidesPerView: 1 },
                                                1024: { slidesPerView: 1 },
                                            }}
                                        >
                                            {brands && 
                                                (brands.map((brand) => (
                                                    <SwiperSlide key={brand?.id}>
                                                        <NavLink to={`/product-category/all-brand/${brand?.slug}`} className="brands-wrapper">
                                                            <div className="img-area">
                                                                <img src={brand?.image_url} alt="" />
                                                            </div>
                                                        </NavLink>
                                                    </SwiperSlide>
                                                )))
                                                
                                            }
                                            
                                        </Swiper>
                                    </div>
                                    <div className="col-md-65">
                                        <h4>Products</h4>
                                        <div className="product-wrapper">
                                                {products.map(pro => (
                                                        <div className="product-list-content" key={pro?.id}>
                                                            <div className="row">
                                                                <div className="col-md-25">
                                                                    <h2 className="product_sku">
                                                                        <span className="badge badge-yellow">{pro?.sku}</span>
                                                                    </h2>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h2 className="product_title">
                                                                        <NavLink to={`/product/${pro?.slug}`}> {pro?.name}</NavLink>
                                                                    </h2>
                                                                </div>
                                                                <div className="col-md-2">
                                                                        <span className="price">${pro?.price}</span>
                                                                </div>
                                                                <div className="col-md-15">
                                                                    <div className="btn-area">
                                                                        <NavLink to={`/product/${pro?.slug}`} ><i className="far fa-eye"></i></NavLink>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                
                                                ))}
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search