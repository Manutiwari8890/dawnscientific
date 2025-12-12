import React, { useState, useEffect, useContext } from 'react'
import Category from './Category';
import { useParams, Link, useLocation } from 'react-router-dom';
import { WishListContext } from '../context/WishListContext';
import Select from 'react-select'
import { useLoader } from "../context/LoaderContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";


function Home() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { startLoading, stopLoading } = useLoader();

    const [isLoading, setIsLoading] = useState(false);

    const [fcategories, setFcategory] = useState([]);
    const [fcatSlug, setFcatSlug] = useState("");
    const [fsubCategories, setFsubCategory] = useState([]);
    const [fsubCatSlug, setFsubCatSlug] = useState("");
    const [fproducts, setFproducts] = useState([]);
    const [fslug, setFslug] = useState("");
    const fbuttonLink = fslug ? `/product/${fslug}` : (fsubCatSlug ? `/product-category/${fcatSlug}/${fsubCatSlug}` : (fcatSlug ? `/product-category/${fcatSlug}` : ''));
    const [topBrands, setTopBrands] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [brands, setBrands] = useState([]);

    const [frontProducts, setFrontProducts] = useState([]);


    const [activeTab, setActiveTab] = useState("");
    const activeTabData = topBrands[0]?.children_recursive?.find(
        tab => tab.id === activeTab
    );
    const itemsToRender = activeTabData?.children_recursive || topBrands[0]?.children_recursive || [];
    useEffect(() => {
        const fetchAll = async () => {
            startLoading();
            try {
                const [
                    catRes,
                    brandRes,
                    homeRes,
                    blogRes
                ] = await Promise.all([
                    fetch(`${baseUrl}categories`),
                    fetch(`${baseUrl}brands?per_page=150`),
                    fetch(`${baseUrl}get-home-category`),
                    fetch(`${baseUrl}latest-blogs`)
                ]);

                const categories = await catRes.json();
                const brands = await brandRes.json();
                const homeProducts = await homeRes.json();
                const blogData = await blogRes.json();

                const brandData = [...categories.data]
                    .filter(item => item.name.toLowerCase() === "brands")
                    .map(b => ({
                        ...b,
                        children_recursive: [...b.children_recursive].sort((a, b) => {
                            const desiredOrderSlugs = [
                                "lichrom",
                                "chemier",
                                "cusp-reagents",
                                "tristains",
                                "bluster",
                                "eks",
                                "kappaa",
                                "dsi-brand"
                            ];
                            return desiredOrderSlugs.indexOf(a.slug) - desiredOrderSlugs.indexOf(b.slug);
                        })
                    }));

                setTopBrands(brandData);
                setFcategory(categories.data);
                setBrands(brands.data);
                setFrontProducts(homeProducts.data);
                setBlogs(blogData.data);

            } catch (err) {
                console.error(err);
            } finally {
                stopLoading();
            }
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (!fcatSlug) return;
        const fetchSubCategory = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${baseUrl}categories/${fcatSlug}`);
                const data = await response.json();
                setFsubCategory(data.data.children_recursive);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSubCategory();
    }, [fcatSlug]);

    useEffect(() => {
        const category = fsubCatSlug || fcatSlug;
        if (!category) return;
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${baseUrl}products?category=${category}`);
                const data = await response.json();
                setFproducts(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [fcatSlug, fsubCatSlug]);


    const categoryOptions = [
        { value: "", label: "All Category" },
        ...(fcategories || []).map(category => ({
            value: category.slug,
            label: category.name,
        }))
    ];
    const subCategoryOptions = [
        { value: "", label: "All Sub Category" },
        ...(fsubCategories || []).map(sub => ({ value: sub.slug, label: sub.name })),
    ];

    const productOptions = [
        { value: "", label: "All Products" },
        ...(fproducts || []).map(prod => ({ value: prod.slug, label: prod.name })),
    ];


    return (
        <>
            <Helmet>
                <title>Lab Consumables, Chemicals &amp; Equipment from Dawn Scientific</title>
                <meta
                    name="description"
                    content="Buy high-quality laboratory equipment, chemicals, and supplies online at Dawn Scientific. Fast delivery, safe payment, and expert support."
                />
            </Helmet>
            <section className="banner">
                <div className="container">
                    <div className="hero-banner">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="hero-content">
                                    <h6>dawn scientific</h6>
                                    <h1>Your Trusted <span className="yellow">Scientific Partner</span> for Over 40 Years </h1>
                                    <div className="hero-btn">
                                        <Link to="/product-category" className="btn btn-primary" aria-label="Dawn Products">Shop Now 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor" /></svg>                                        
                                        </Link>
                                        <Link to="/about" className="btn btn-secondary" aria-label="About Dawn Scientific">Learn More 
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z" fill="currentColor" /></svg>                                        
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="hero-image">

                                    <Swiper
                                        modules={[Navigation, Autoplay]}
                                        spaceBetween={20}
                                        slidesPerView={1}
                                        navigation={false}
                                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                                        loop={true}
                                        pagination={false}
                                        breakpoints={{
                                            480: { slidesPerView: 1 },
                                            768: { slidesPerView: 1 },
                                            1024: { slidesPerView: 1 },
                                        }} >
                                        <SwiperSlide>
                                            <Link to="">
                                                <img src="/assets/images/dawn_img1.webp" alt="Home Banner" loading="eager" fetchPriority="high" />
                                            </Link>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Link>
                                                <img src="/assets/images/newlook_icons.webp" alt="Launch New" loading="eager" fetchPriority="high" />
                                            </Link>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Link>
                                                <img src="/assets/images/dawn_img2.webp" alt="Home Banner" loading="eager" fetchPriority="high" />
                                            </Link>
                                        </SwiperSlide>
                                    </Swiper>
                                    <div className="delivery-container">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="512" height="512" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve"><g><path d="m476.158 231.363-13.259-53.035c3.625-.77 6.345-3.986 6.345-7.839v-8.551c0-18.566-15.105-33.67-33.67-33.67h-60.392V110.63c0-9.136-7.432-16.568-16.568-16.568H50.772c-9.136 0-16.568 7.432-16.568 16.568V256a8.017 8.017 0 0 0 16.034 0V110.63c0-.295.239-.534.534-.534h307.841c.295 0 .534.239.534.534v145.372a8.017 8.017 0 0 0 16.034 0v-9.088h94.569l.021.002.022-.001c11.637.008 21.518 7.646 24.912 18.171h-24.928a8.017 8.017 0 0 0-8.017 8.017v17.102c0 13.851 11.268 25.119 25.119 25.119h9.086v35.273h-20.962c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205h-3.86v-60.393a8.017 8.017 0 0 0-16.034 0v60.391H192.817c-6.886-19.883-25.787-34.205-47.982-34.205s-41.097 14.322-47.982 34.205H50.772a.534.534 0 0 1-.534-.534v-17.637h34.739a8.017 8.017 0 0 0 0-16.034H8.017a8.017 8.017 0 0 0 0 16.034h26.188v17.637c0 9.136 7.432 16.568 16.568 16.568h43.304c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772s50.772-22.776 50.772-50.772c0-.18-.012-.356-.014-.534h180.67c-.002.178-.014.355-.014.534 0 27.996 22.777 50.772 50.772 50.772 27.995 0 50.772-22.776 50.772-50.772 0-.18-.012-.356-.014-.534h26.203a8.017 8.017 0 0 0 8.017-8.017v-85.511c.001-21.112-15.576-38.653-35.841-41.738zm-100.976-87.062h60.392c9.725 0 17.637 7.912 17.637 17.637v.534h-78.029v-18.171zm0 86.58v-52.376h71.235l13.094 52.376h-84.329zM144.835 401.904c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.583 34.739 34.739s-15.584 34.739-34.739 34.739zm282.188 0c-19.155 0-34.739-15.583-34.739-34.739s15.584-34.739 34.739-34.739c19.155 0 34.739 15.583 34.739 34.739s-15.584 34.739-34.739 34.739zm68.944-102.614h-9.086c-5.01 0-9.086-4.076-9.086-9.086v-9.086h18.171v18.172z" fill="#fff" opacity="1" data-original="#fff" /><path d="M144.835 350.597c-9.136 0-16.568 7.432-16.568 16.568 0 9.136 7.432 16.568 16.568 16.568 9.136 0 16.568-7.432 16.568-16.568 0-9.136-7.432-16.568-16.568-16.568zM427.023 350.597c-9.136 0-16.568 7.432-16.568 16.568 0 9.136 7.432 16.568 16.568 16.568 9.136 0 16.568-7.432 16.568-16.568 0-9.136-7.432-16.568-16.568-16.568zM332.96 316.393H213.244a8.017 8.017 0 0 0 0 16.034H332.96a8.017 8.017 0 0 0 0-16.034zM127.733 282.188H25.119a8.017 8.017 0 0 0 0 16.034h102.614a8.017 8.017 0 0 0 0-16.034zM278.771 173.37a8.017 8.017 0 0 0-11.337.001l-71.292 71.291-37.087-37.087a8.016 8.016 0 0 0-11.337 0 8.016 8.016 0 0 0 0 11.337l42.756 42.756c1.565 1.566 3.617 2.348 5.668 2.348s4.104-.782 5.668-2.348l76.96-76.96a8.018 8.018 0 0 0 .001-11.338z" fill="#fff" opacity="1" data-original="#fff" /></g></svg>
                                        </div>
                                        <h3>Premium Quality ACS Grade Chemicals</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`search-wrapper ${isLoading ? "loading-wrapper" : ""}`}>
                            <div className="search-form">
                                <form action="">
                                    <h3>Search Product</h3>
                                    <div className="home_search_product">
                                        <Select
                                            options={categoryOptions}
                                            name="category"
                                            value={categoryOptions.find(option => option.value === fcatSlug)}
                                            onChange={(selectedOption) => setFcatSlug(selectedOption.value)}
                                        />
                                        <Select
                                            options={subCategoryOptions}
                                            name="sub-category"
                                            value={subCategoryOptions.find(option => option.value === fsubCatSlug)}
                                            onChange={(selectedOption) => setFsubCatSlug(selectedOption.value)}
                                        />

                                        <Select
                                            options={productOptions}
                                            name="products"
                                            value={productOptions.find(option => option.value === fslug)}
                                            onChange={(selectedOption) => setFslug(selectedOption.value)}
                                        />
                                        <Link to={fbuttonLink} className={`btn btn-primary ${isLoading ? "loading" : ""}`} aria-label="View Products">{!isLoading ? "View" : ""}</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="top-category">
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h2>Top Category</h2>
                            <Link to="/product-category" className="title-link" aria-label="Dawn Product Categories">View More <i className="fas fa-angle-double-right"></i></Link>
                        </div>
                        <div className="category-wrap">
                            <div className="category-item">
                                <Link to="/suppliers" aria-label="Brands">
                                    <div className="icon-border">
                                        <div className="icon">
                                            <svg className="svg_icon" width="32" height="32" fill="red">
                                                <use xlinkHref={`/sprite.svg#brand`} />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Brands</h3>
                                        <p>90 +</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="category-item">
                                <Link to={`/product-category/consumables-supplies`} aria-label="Consumables & Supply">
                                    <div className="icon-border">
                                        <div className="icon">
                                            <svg className="svg_icon" width="32" height="32" fill="red">
                                                <use xlinkHref={`/sprite.svg#chemical`} />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Consumables & Supply</h3>
                                        <p>50,000+ Products</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="category-item">
                                <Link to={`/product-category/equipments`} aria-label="Lab Equipment">
                                    <div className="icon-border">
                                        <div className="icon">
                                            <svg className="svg_icon" width="32" height="32" fill="red">
                                                <use xlinkHref={`/sprite.svg#supply`} />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Lab Equipment</h3>
                                        <p>8000+ Products</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="category-item">
                                <Link to={`/product-category/lab-reagents`} aria-label="Lab Reagents">
                                    <div className="icon-border">
                                        <div className="icon">
                                            <svg className="svg_icon" width="32" height="32" fill="red">
                                                <use xlinkHref={`/sprite.svg#lab`} />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <h3>Lab Reagents</h3>
                                        <p>29,000+ Products</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="card-banner">
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h2>Popular Brands</h2>
                            <Link to="/suppliers" className="title-link" aria-label="Dawn Scientific Suppliers">View More <i className="fas fa-angle-double-right"></i></Link>
                        </div>
                        <div className="col-md-10">
                            <div className="tabs-head">
                                <button className={`btn-tabs ${activeTab === "" ? "active" : ""}`} onClick={() => setActiveTab("")} aria-label="All">All</button>
                                {topBrands[0]?.children_recursive?.map(tab => (
                                    (tab.children_recursive.length > 0 &&
                                        <button className={`btn-tabs ${activeTab === tab.id ? "active" : ""}`} key={tab.id} onClick={() => setActiveTab(tab.id)} aria-label={tab?.name}>{tab.name}</button>
                                    )
                                ))}
                            </div>
                        </div>
                        <AnimatePresence>
                            {itemsToRender?.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="col-md-25"
                                >
                                    <Link className={`tab-card ${item.parent_id == 940 ? "brands_logo" : ""}`} to={`/product-category/brands/${item.slug}`} aria-label={item?.name}>
                                        <div className="img-area">
                                            <img src={`${item?.image_url}`} alt={item.name} loading="lazy" />
                                        </div>
                                        <div className="desc">
                                            <h2>{item?.name}</h2>
                                            <div className="btn-area">
                                                <span className="btn btn-small" aria-label="Brands">Buy Now</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <section className="popular-brands">
                <div className="container">
                    <div className="row">
                        <div className="title">
                            <h2>Shop by suppliers</h2>
                            <Link to="/suppliers" className="title-link" aria-label="Dawn scientific suppliers">All Brands <i className="fas fa-angle-double-right"></i></Link>
                        </div>
                        <div className="slider-wrapper">
                            <div className="slider-track">
                                {brands.length > 0 &&
                                    brands?.map(brand => (
                                        <Link className="slide" to={`/brand/${brand?.slug}`} aria-label={brand?.name} key={brand?.id}>
                                            <img src={brand?.image_url} alt={brand?.name} loading="lazy" />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="category-section pt-5">
                <div className="container">
                    <div className="title">
                        <h2><Link to="/product-category/lab-reagents">Buy High Quality Lab Chemicals</Link></h2>
                        <p>Purchase high-quality lab chemicals to ensure purity, reliability, and suitability for your experiments.</p>
                    </div>
                    <div className="row">
                        {frontProducts['home2'] && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={false}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {frontProducts['home2']?.map((pro) => (
                                    <SwiperSlide key={pro.id}>
                                        <Link to={`/product-category/${pro.slug}`} aria-label={pro?.name} className="category-item">
                                            <div className="img-container">
                                                <img src={pro.image_url ? pro.image_url : "/assets/images/Placeholder_logo.webp"} alt="" loading="lazy" />
                                                <div className="category-action-wrap">
                                                    <div className="category-action">
                                                        <span><i className="far fa-eye"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <h2 aria-label={pro?.name}>{pro.name}</h2>
                                                <p>{pro?.p_count} Products</p>
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
            <section className="category-section pt-5">
                <div className="container">
                    <div className="title">
                        <h2><Link to="/product-category/consumables-supplies">Buy Laboratory Consumables</Link></h2>
                        <p>Shop a wide range of laboratory consumables from various brands, often with competitive pricing.</p>
                    </div>
                    <div className="row">
                        {frontProducts['home1'] && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={false}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {frontProducts['home1']?.map((pro) => (
                                    (pro?.p_count &&
                                        <SwiperSlide key={pro.id}>
                                            <Link to={`/product-category/${pro.slug}`} aria-label={pro?.name} className="category-item">                                                <div className="img-container">
                                                <img src={pro.image_url ? pro.image_url : "/assets/images/Placeholder_logo.webp"} alt="" loading="lazy" />
                                                <div className="category-action-wrap">
                                                    <div className="category-action">
                                                        <span><i className="far fa-eye"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                                <div className="content">
                                                    <h2 aria-label={pro?.name}>{pro.name}</h2>
                                                    <p>{pro?.p_count} Products</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                ))}
                            </Swiper>
                        )
                        }

                    </div>
                </div>
            </section>

            <section className="category-section pt-5">
                <div className="container">
                    <div className="title">
                        <h2><Link to='/product-category/equipments'>Buy Laboratory Equipment</Link></h2>
                        <p>Offers a wide range of laboratory equipment and instruments with best price.</p>
                    </div>
                    <div className="row">
                        {frontProducts['home3'] && (
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 2500, disableOnInteraction: false }}
                                loop={true}
                                pagination={false}
                                breakpoints={{
                                    480: { slidesPerView: 2 },
                                    768: { slidesPerView: 3 },
                                    1024: { slidesPerView: 5 },
                                }}
                            >
                                {frontProducts['home3']?.map((pro) => (
                                    (pro?.p_count &&
                                        <SwiperSlide key={pro.id}>
                                            <Link to={`/product-category/${pro.slug}`} className="category-item" aria-label={pro?.name}>
                                                <div className="img-container">
                                                    <img src={pro.image_url ? pro.image_url : "/assets/images/Placeholder_logo.webp"} alt="" loading="lazy" />
                                                    <div className="category-action-wrap">
                                                        <div className="category-action">
                                                            <span><i className="far fa-eye"></i></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    <h2 aria-label={pro?.name}>{pro.name}</h2>
                                                    <p>{pro?.p_count} Products</p>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )
                                ))}
                            </Swiper>
                        )
                        }
                    </div>
                </div>
            </section>

            <section className="feature-area">
                <div className="container">
                    <div className="feature-wrapper">
                        <div className="row">
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <i className="fa fa-truck"></i>
                                    </div>
                                    <div className="content">
                                        <h2>Fast Delivery</h2>
                                        <p>Minimum Days</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <i className="fa fa-file-alt"></i>
                                    </div>
                                    <div className="content">
                                        <h2>ISO Certified</h2>
                                        <p>Best Quality Products</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <i className="fa fa-wallet"></i>
                                    </div>
                                    <div className="content">
                                        <h2>Safe Payment</h2>
                                        <p>100% Secure Payment</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-25">
                                <div className="feature-item">
                                    <div className="icon">
                                        <i className="fa fa-headset"></i>
                                    </div>
                                    <div className="content">
                                        <h2>24/7 Support</h2>
                                        <p>Feel Free To Call Us</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info">
                <div className="container">
                    <div className="title text-center">
                        <h2>Products useful in <span className="colorful">general Laboratory</span> Applications</h2>
                        <h3>We provide products that cater to a wide variety of Applications. Please select one of the Applications below to learn more.</h3>
                    </div>
                    <div className="row">
                        <Swiper
                            style={{ paddingTop: "40px", paddingBottom: "40px" }}
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={20}
                            slidesPerView={1}
                            navigation
                            autoplay={{ delay: 2500, disableOnInteraction: false }}
                            loop={true}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                480: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Analytical-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Analytical Chemistry</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Studies & uses instruments and methods to separate, identify, and quantify matter</p>
                                        </div>
                                    </div>
                                    <Link to="/analytical-lab" className="btn btn-primary" aria-label="Analytical Chemistry">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Enviremental-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Environmental Chemistry</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Study of all the chemical species present in the soil, water, and air environments</p>
                                        </div>
                                    </div>
                                    <Link to="/environmental-chemistry" className="btn btn-primary" aria-label="Environmental Chemistry">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Microbiological-lab-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Microbiology Lab</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Study of identification of microorganisms including bacteria, fungi, yeasts</p>
                                        </div>
                                    </div>
                                    <Link to="/microbiology-lab" className="btn btn-primary" aria-label="Microbiology Lab">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Cannabis-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Cannabis oil extraction</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Use chemicals, such as carbon dioxide or ethanol, to separate CBD from the plant</p>
                                        </div>
                                    </div>
                                    <Link to="/cannabis-oil-extraction" className="btn btn-primary" aria-label="Cannabis oil extraction">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Food-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Food & Beverage Testing</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Chemical substances can play an important role in food production & preservation</p>
                                        </div>
                                    </div>
                                    <Link to="/food-beverage-testing" className="btn btn-primary" aria-label="Food & Beverage Testing">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Botanical-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Botanical</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Used to make essential oils, botanical preparations, and botanical drugs</p>
                                        </div>
                                    </div>
                                    <Link to="/botanical" className="btn btn-primary" aria-label="Botanical">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/R-d-lab-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>R & D laboratory</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Shop a wide range of high-quality lab equipment</p>
                                        </div>
                                    </div>
                                    <Link to="/rd-laboratory" className="btn btn-primary" aria-label="R & D laboratory">Read More</Link>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Petrolium-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Petroleum</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Petrochemicals are the chemical products obtained from petroleum by refining</p>
                                        </div>
                                    </div>
                                    <Link to="/petroleum" className="btn btn-primary" aria-label="Petroleum">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Educational.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Educational</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Shop a wide range of high-quality lab equipment</p>
                                        </div>
                                    </div>
                                    <Link to="/educational" className="btn btn-primary" aria-label="Educational">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/Biotechnology.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Biotechnology</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Shop a wide range of high-quality lab equipment</p>
                                        </div>
                                    </div>
                                    <Link to="/biotechnology" className="btn btn-primary" aria-label="Biotechnology">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="assets/images/Pharmacy-400x250.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>Pharmaceutical</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Pharmaceutical chemists development of modified peptides and proteins</p>
                                        </div>
                                    </div>
                                    <Link to="/pharmaceutical" className="btn btn-primary" aria-label="Pharmaceutical">Read More</Link>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="info-card">
                                    <div className="detail">
                                        <div className="img-container">
                                            <div className='img_wrp'>
                                                <img src="/assets/images/School-college.webp" alt="" loading="lazy" />
                                            </div>
                                            <h3>School & Colleges</h3>
                                        </div>
                                        <div className="desc">
                                            <p>Show a wide range of high-quality lab equipment</p>
                                        </div>
                                    </div>
                                    <Link to="/product-category/consumables-supplies/chemistry/" className="btn btn-primary" aria-label="School & Colleges">Read More</Link>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </section>
            <section className="knowledge">
                <div className="container">
                    <div className="title">
                        <h2>Knowledge Center</h2>
                    </div>
                    <div className="row">
                        {blogs &&
                            blogs.slice(0, 5)?.map(blog => (
                                <div className="col-md-2" key={blog?.id}>
                                    <div className="article">
                                        <div className="img-container">
                                            <img src={blog?.image_url} alt="" loading="lazy" />
                                        </div>
                                        <div className="title">
                                            <h3>{blog?.title}</h3>
                                        </div>
                                        <div className="btn-area">
                                            <Link to={`/blog/detail/${blog?.slug}`} className="btn btn-secondary w-100" aria-label={blog?.title}>Read More <i className="fa fa-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="row justify-content-center mt-2">
                        <Link to="/blog" className="btn btn-primary" aria-label="Blog">View More</Link>
                    </div>
                </div>
            </section>
            <section className="choose-us">
                <div className="container">
                    <div className="row row-gap-20">
                        <div className="col-md-33">
                            <div className="img-area">
                                <img src="assets/images/test-solution.webp" alt="" loading="lazy" />
                            </div>
                        </div>
                        <div className="col-md-33">
                            <div className="title">
                                <h2>Why Choose Dawn Scientific?</h2>
                                <h4>We Provide Premium Quality Product For You</h4>
                            </div>
                        </div>

                        <div className="col-md-33">
                            <div className="desc">
                                <p>For over 40 years, Dawn Scientific has been dedicated to delivering high-quality laboratory products and services across various scientific sectors. As a 100% Woman-Owned Company, certified by the Women’s Business Enterprise National Council (WBENC) and ISO 9001:2015, we have built a reputation as one of the most trusted partners in the scientific community.</p>
                            </div>
                        </div>

                        <div className="col-md-33">
                            <div className="card">
                                <div className="icon">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#quality" />
                                    </svg>
                                </div>
                                <div className="info">
                                    <h3>Uncompromised Quality</h3>
                                    <p>We deliver laboratory chemicals and consumables that meet the highest industry standards, ensuring precision and reliability in your experiments and processes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-33">
                            <div className="card">
                                <div className="icon">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#cost" />
                                    </svg>
                                </div>
                                <div className="info">
                                    <h3>Cost-Effective Options</h3>
                                    <p>Save time and money with competitive pricing, bulk packaging options, and scalable solutions designed to suit labs of all sizes.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-33">
                            <div className="card">
                                <div className="icon">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#paper" />
                                    </svg>
                                </div>
                                <div className="info">
                                    <h3>Sustainability Practices</h3>
                                    <p>We are committed to eco-friendly practices, offering products and packaging that reduce environmental impact.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home