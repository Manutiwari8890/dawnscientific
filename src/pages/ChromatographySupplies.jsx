import React from 'react'
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function ChromatographySupplies() {
    const [readMore, setReadMore] = useState(false);

    const oRing = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Helmet>
                <title>Application_Chromatography supplies - Dawn Scientific</title>
                <meta
                    name="description"
                    content="Chromatography is an important technique for laboratory science. It can separate, identify, and quantify compounds in complex mixtures."
                />
            </Helmet>
            <div className='wrapper applications applications_inner'>
                <div className='container'>
                    <div className='row'>
                        <div className="widget collapse">
                            <div className="details-wrapper">
                                <div className="col-md-4 img-area">
                                    <div>
                                        <img src="/assets/images/Application-_chromatography-768x768.webp" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Chromatography supplies</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2 className='app_inner_subtitle'>Buy Chromatography Products at Dawn Scientific – High-quality products for All Your Analytical Lab Needs</h2>
                                        <p>Chromatography is an important technique for laboratory science. It can separate, identify, and quantify compounds in complex mixtures. Dawn Scientific provides a complete range of chromatography products to cover laboratories’ varied requirements. Whether you conduct research or regular analysis, the range guarantees the quality and reliability of the products.</p>
                                        <h2>Shop Chromatography Products for Laboratory Applications</h2>
                                        <p>Regarding the chromatography supplies your laboratory requires, Dawn Scientific is the right company for you. We appreciate how precision and efficiency can play in analytical processes, and thus, we carefully select only high-performance products for you. These range from analytical HPLC columns, and syringe filters, to vials-all those consumables required in the execution of a chromatography workflow.<br />
                                            If you need chromatography products for your laboratory, we have them all right here. We cater to a wide range of applications; from pharmaceutical analysis, testing for environmental factors, and checking the food and beverage content, to academic research.</p>
                                        <h2>Huge Selection of Chromatography Supplies</h2>
                                        <p>Our inventory proudly stands as your one-stop shop for all your needs. At our company, our range of chromatography supplies encompasses:<br />
                                            • Analytical Columns HPLC: With a wide range of products in our portfolio, our HPLC columns are designed for high-resolution separations.<br />
                                            • Chromatographic Columns: A versatile collection of products for various chromatographic techniques.<br />
                                            • HPLC Guard Columns: Extend the life of your analytical columns with our wide range of durable and efficient guard columns.<br />
                                            • Reference Standards: Choose from our products to ensure accurate calibration and validation in your analyses.<br />
                                            • Syringe Filters: Dawn Scientific’s products to suit your requirements in sample preparation, to yield cleaner injections and results.<br />
                                            • Syringes &amp; Needles: Our products facilitate accurate sample handling.<br />
                                            • Vials and Tubing: vials and tubing options cater to the sample collection and transfer process in a non-traumatic manner.<br />
                                            • Explore more.</p>
                                        <h2>Why Choose Dawn Scientific for Chromatography Supplies?</h2>
                                        <p>Shopping from Dawn Scientific is more than just buying products; it’s an investment in quality, reliability, and efficiency. Our large inventory is carefully chosen to support the most demanding requirements of a laboratory. We have both small packs for specific projects or buying in bulk to stock up your lab, allowing you to budget and scale flexibly.<br />
                                            Consumables like plasticware, pipette tips, transfer pipettes, weighing dishes, beakers, test tubes, cuvettes, and lab notebooks also come under our product umbrella. These are indispensable if your laboratory is running correctly and efficiently, which happens through these combined with our high chromatography products.</p>
                                        <h2>Shop with us at Dawn Scientific to purchase all your chromatography-related materials</h2>
                                        <p>When you choose to shop chromatography products for your laboratory from Dawn Scientific, you’re choosing a partner dedicated to supporting scientific excellence. We provide more than just products; we deliver solutions that empower laboratories to achieve their goals.<br />
                                            Discover our product line today and find out why more labs worldwide turn to Dawn Scientific for all of their chromatography supplies to routine consumables. From these products, the company ensures your workflow is strengthened and yields the most precise, repeatable results you can achieve.<br />
                                            Buy your chromatography products from us today and take the simple route to obtain good quality supplies from a trusted source. With a focus on quality, value, and customer satisfaction, Dawn Scientific has established itself as your one-stop shop for business success.</p>
                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container app_portfolio_title'>
                    <div className='row'>
                        <h4>Chromatography supplies Product Portfolio</h4>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/hplc-columns" title="Accuris" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="422" height="203" src="/assets/images/Hplc-columns-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Accuris Logo  Dawn Scientific" />
                            </NavLink>
                            <h3>Analytical Columns HPLC</h3>
                            <NavLink to="/product-category/consumables-supplies/hplc-columns" className='apl_link'>16173 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/hplc-columns/chromatographic-column-chromatography" title="Adam Equipment" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Chromatographic_column-removebg-preview-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Adam Equipment  Dawn Scientific" />
                            </NavLink>
                            <h3>Chromatographic Column</h3>
                            <NavLink to="/product-category/consumables-supplies/hplc-columns/chromatographic-column-chromatography" className='apl_link'>4 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/hplc-columns/hplc-guard-column" title="Agilent" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Hplc-column_3-300x236.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Agilent Technology  Dawn Scientific" />
                            </NavLink>
                            <h3>HPLC Guard Column</h3>
                            <NavLink to="/product-category/consumables-supplies/hplc-columns/hplc-guard-column" className='apl_link'>558 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/vials" title="Ahlstrom-Munksjo" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="210" height="100" src="/assets/images/WHEATON_V-vial_h30mm.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Ahlstrommunksjo  Dawn Scientific" />
                            </NavLink>
                            <h3>Vial</h3>
                            <NavLink to="/product-category/consumables-supplies/vials" className='apl_link'>1182 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/plasticware/tubing" title="Alconox" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="1415" height="515" src="/assets/images/Plasticware35-300x236.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Alconox Brand Logo  Precision Lab Cleaning Detergents Supplier at Dawn Scientific" title="Alconox Logo  Trusted Lab Cleaning Detergents  Dawn Scientific" />
                            </NavLink>
                            <h3>Tubing</h3>
                            <NavLink to="/product-category/consumables-supplies/plasticware/tubing" className='apl_link'>1184 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="" onClick={() => scrollToSection(oRing)} title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/O-rings-150x150.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </NavLink>
                            <h3>O-rings</h3>
                            <NavLink to="" onClick={() => scrollToSection(oRing)} className='apl_link'>84 products</NavLink>
                        </div>

                        <div className='apl_col'>
                            <NavLink to="/product-category/lab-reagents/reference-standard" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Reference-standard-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </NavLink>
                            <h3>Reference Standard</h3>
                            <NavLink to="/product-category/lab-reagents/reference-standard" className='apl_link'>455 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/filtration/syringe-filters" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Syringe-Filters-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </NavLink>
                            <h3>Syringe Filters</h3>
                            <NavLink to="/product-category/consumables-supplies/filtration/syringe-filters" className='apl_link'>173 products</NavLink>
                        </div>
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/syringes-needle-consumables-supplies" title="Aldon" className='apl_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Syringes-needle-300x300.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Aldonlogo  Dawn Scientific" />
                            </NavLink>
                            <h3>Syringes & Needle</h3>
                            <NavLink to="/product-category/consumables-supplies/syringes-needle-consumables-supplies" className='apl_link'>6 Products</NavLink>
                        </div>
                    </div>
                    <div className="inner-page-products">
                        <div className="product-wrapper" ref={oRing}>
                            <div className="title list-title">
                                <h2>o-rings</h2>
                            </div>
                            <div className="product-list-content">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h2 className="product_sku">
                                            <span className="badge badge-yellow">710300-0001 NN</span>
                                        </h2>
                                    </div>
                                    <div className="col-md-4">
                                        <h2 className="product_title">
                                            <NavLink to={`/product/nalge-nunc-710300-0001-nn-kit-of-4-o-rings-1-6-id-and-2-gaskets-for-cat-300-4000-250-ml/`}>Kit of 4 O-Rings (1.6" ID) and 2 Gaskets for Cat #300-4000 250 mL, 710300-0001 NN, Nalge Nunc</NavLink>
                                        </h2>
                                        <h2 className="brand_name">
                                            <NavLink to={`/brand/nalge-nunc`}>Nalge Nunc</NavLink>
                                        </h2>
                                    </div>
                                    <div className="col-md-25">
                                        <div className="text-center">
                                            <span className="price">$40.52</span>
                                        </div>
                                    </div>
                                    <div className="col-md-15">
                                        <div className="btn-area">
                                            <NavLink to={`/product/nalge-nunc-710300-0001-nn-kit-of-4-o-rings-1-6-id-and-2-gaskets-for-cat-300-4000-250-ml/`} ><i className="far fa-eye"></i></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-content">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h2 className="product_sku">
                                            <span className="badge badge-yellow">710300-0004 NN</span>
                                        </h2>
                                    </div>
                                    <div className="col-md-4">
                                        <h2 className="product_title">
                                            <NavLink to={`/product/nalge-nunc-710300-0004-nn-kit-of-o-rings-for-reusable-filter-holders-for-300-and-310-series-500-1000-ml/`}>Kit of O-Rings for Reusable Filter Holders: for #300- and #310-series 500, 1000 mL, 710300-0004 NN, Nalge Nunc</NavLink>
                                        </h2>
                                        <h2 className="brand_name">
                                            <NavLink to={`/brand/nalge-nunc`}>Nalge Nunc</NavLink>
                                        </h2>
                                    </div>
                                    <div className="col-md-25">
                                        <div className="text-center">
                                            <span className="price">$31.87</span>
                                        </div>
                                    </div>
                                    <div className="col-md-15">
                                        <div className="btn-area">
                                            <NavLink to={`/product/nalge-nunc-710300-0004-nn-kit-of-o-rings-for-reusable-filter-holders-for-300-and-310-series-500-1000-ml/`} ><i className="far fa-eye"></i></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-content">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h2 className="product_sku">
                                            <span className="badge badge-yellow">713132-0058 NN</span>
                                        </h2>
                                    </div>
                                    <div className="col-md-4">
                                        <h2 className="product_title">
                                            <NavLink to={`/product/nalge-nunc-713132-0058-nn-o-rings-sealing-cap-ds3132-0058-58-mm/`}>O-Rings Sealing Cap DS3132-0058 58 mm, 713132-0058 NN, Nalge Nunc</NavLink>
                                        </h2>
                                        <h2 className="brand_name">
                                            <NavLink to={`/brand/nalge-nunc`}>Nalge Nunc</NavLink>
                                        </h2>
                                    </div>
                                    <div className="col-md-25">
                                        <div className="text-center">
                                            <span className="price">$52.52</span>
                                        </div>
                                    </div>
                                    <div className="col-md-15">
                                        <div className="btn-area">
                                            <NavLink to={`/product/nalge-nunc-713132-0058-nn-o-rings-sealing-cap-ds3132-0058-58-mm/`} ><i className="far fa-eye"></i></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-content">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h2 className="product_sku">
                                            <span className="badge badge-yellow">3915-CVO-CL</span>
                                        </h2>
                                    </div>
                                    <div className="col-md-4">
                                        <h2 className="product_title">
                                            <NavLink to={`/product/corning-glass-3915-cvo-cl-pyrex-replacement-coupler-o-rings-for-accelerated-one-step-extractor-concentrator-system/`}>PYREX Replacement Coupler O-Rings for Accelerated One-Step Extractor-Concentrator System</NavLink>
                                        </h2>
                                        <h2 className="brand_name">
                                            <NavLink to={`/brand/corning-glass`}>Corning Glass</NavLink>
                                        </h2>
                                    </div>
                                    <div className="col-md-25">
                                        <div className="text-center">
                                            <span className="price">$239.52</span>
                                        </div>
                                    </div>
                                    <div className="col-md-15">
                                        <div className="btn-area">
                                            <NavLink to={`/product/corning-glass-3915-cvo-cl-pyrex-replacement-coupler-o-rings-for-accelerated-one-step-extractor-concentrator-system/`} ><i className="far fa-eye"></i></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-content">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h2 className="product_sku">
                                            <span className="badge badge-yellow">713140-00PC NN</span>
                                        </h2>
                                    </div>
                                    <div className="col-md-4">
                                        <h2 className="product_title">
                                            <NavLink to={`/product/nalge-nunc-713140-00pc-nn-replacement-o-rings-blue-pp-silicone/`}>Replacement o-rings, BLUE (PP) silicone, 713140-00PC NN, Nalge Nunc</NavLink>
                                        </h2>
                                        <h2 className="brand_name">
                                            <NavLink to={`/brand/nalge-nunc`}>Nalge Nunc</NavLink>
                                        </h2>
                                    </div>
                                    <div className="col-md-25">
                                        <div className="text-center">
                                            <span className="price">$180.52</span>
                                        </div>
                                    </div>
                                    <div className="col-md-15">
                                        <div className="btn-area">
                                            <NavLink to={`/product/nalge-nunc-713140-00pc-nn-replacement-o-rings-blue-pp-silicone/`} ><i className="far fa-eye"></i></NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-list-content">
                                <div className="row">
                                    <div className="col-md-2">
                                        <h2 className="product_sku">
                                            <span className="badge badge-yellow">713141-PPCO NN</span>
                                        </h2>
                                    </div>
                                    <div className="col-md-4">
                                        <h2 className="product_title">
                                            <NavLink to={`/product/nalge-nunc-713141-ppco-nn-replacement-o-rings-red-ppco-silicone/`}>Replacement o-rings, RED (PPCO) silicone, 713141-PPCO NN, Nalge Nunc</NavLink>
                                        </h2>
                                        <h2 className="brand_name">
                                            <NavLink to={`/brand/nalge-nunc`}>Nalge Nunc</NavLink>
                                        </h2>
                                    </div>
                                    <div className="col-md-25">
                                        <div className="text-center">
                                            <span className="price">$82.52</span>
                                        </div>
                                    </div>
                                    <div className="col-md-15">
                                        <div className="btn-area">
                                            <NavLink to={`/product/nalge-nunc-713141-ppco-nn-replacement-o-rings-red-ppco-silicone/`} ><i className="far fa-eye"></i></NavLink>
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

export default ChromatographySupplies