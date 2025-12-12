import React from 'react'
import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function SamplePreparation(){
    const [readMore, setReadMore] = useState(false);
    
    const cleanUp = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Helmet>
                <title>Application_Sample Preparation - Dawn Scientific</title>
                <meta
                    name="description"
                    content="Sample preparation is a critical step in laboratory analysis, ensuring accurate and reliable results across diverse applications."
                />
            </Helmet>
            <div className='wrapper applications applications_inner'>
                <div className='container'>
                    <div className='row'>
                        <div className="widget collapse">
                            <div className="details-wrapper">
                                <div className="col-md-4 img-area">
                                    <div>
                                        <img src="/assets/images/Sample-preparation-768x768.webp" />
                                    </div>
                                </div>
                                <div className="col-md-6 text">
                                    <h1>Sample Preparation</h1>
                                    <div className={`details ${readMore ? 'active' : ''}`}>
                                        <h2 className='app_inner_subtitle'>Buy Sample Preparation Products at Dawn Scientific - Premium products for Laboratory Use</h2>
                                        <p>Sample preparation is a critical step in laboratory analysis, ensuring accurate and reliable results across diverse applications. At Dawn Scientific, we offer an extensive portfolio of high-quality sample preparation products to meet the needs of scientific researchers, analytical chemists, and laboratory technicians. Whether you’re working on routine analysis or specialized testing, our consumables and supplies streamline processes for consistent outcomes.</p>
                                        <h2>Comprehensive Range of Products for Sample Preparation</h2>
                                        <p>We offer a broad portfolio of sample preparation products designed for speed and accuracy. Our product range extends from filtration, and extraction, to weighing, including:<br/>
                                        1. Filter Papers: Effectively filter with cellulose and glass microfiber filter papers. The superior performance of these products makes them a must in the separation of solids from liquids in many applications.<br/>
                                        2. Extraction Thimbles: Useful in Soxhlet extraction techniques, our extraction thimbles work well to meet various demands in chemical and analytical applications with ease.<br/>
                                        3. Membranes: Membrane filters from Dawn Scientific ensure appropriate separation and can be used to sterilize, retain, and microfilter particles.<br/>
                                        4. Weighing Boats and Dishes: Accurate and convenient, our high-quality weighing boats and dishes are designed to handle both liquids and solids.<br/>
                                        5. Explore more.</p>
                                        <h2>Why Choose Dawn Scientific for Sample Preparation Products?</h2>
                                        <p>Quality, reliability, and affordability have priority at Dawn Scientific. Invest in better solutions that make your life easier and more accurate to focus on every detail of your work once you go shop for sample preparation products for the lab here.<br/>
                                        1. Reliable Quality: Whatever sample preparation product we source must comply with basic industry standards and perform uniformly during consistent use.<br/>
                                        2. Versatility: Whether in research laboratories, quality control environments, or educational facilities, we cater to different laboratory settings.<br/>
                                        3. Easy Access: Access to the procurement of sample preparation products in your laboratory has never been so easy. Dawn Scientific comes forth with a user-friendly online platform for seamless browsing, choosing, and ordering.<br/>
                                        4. Competitive Pricing: With lab budget constraints in mind, our operations do not compromise on quality; instead, they offer economically reasonable products that serve efficiently.</p>
                                        <h2>Applications of Sample Preparation Products</h2>
                                        <p>Sample preparation products play an integral role in many scientific fields, from environmental testing to pharmaceuticals, food and beverage analysis, and material science. From filter papers and membranes to weighing solutions, our tools are crucial in producing valid and reliable data in chromatography, spectrometry, and gravimetric analysis.<br/>
                                        For laboratories requiring precision and convenience, Dawn Scientific is the place where one can shop for sample preparation products for the laboratory. With an extensive range, you will surely find what you need for efficient sample processing.</p>
                                        <h2>Improve Laboratory Productivity with Dawn Scientific</h2>
                                        <p>Choosing the right consumables is the secret to lab efficiency. By choosing sample preparation products from Dawn Scientific, you equip your lab with tools designed to save time and improve results. From our diverse inventory to exceptional customer service, we are a partner you can trust in scientific excellence.<br/>
                                        By purchasing sample preparation products for the laboratory from Dawn Scientific, you benefit from:<br/>
                                        • A wide selection of laboratory-tested items.<br/>
                                        • Expert support to help you choose the right products.<br/>
                                        • Convenient delivery options tailored to your needs.</p>
                                        <h2>Shop with Confidence</h2>
                                        <p>Dawn Scientific makes it easy to source lab consumables. Browse our online store for a complete range of sample preparation products, including filter papers, extraction thimbles, membranes, and weighing boats. With every product, you have confidence in using trusted tools for critical applications.<br/>
                                        Optimize your lab processes and enhance the precision of your experiments. Shop sample preparation products for the laboratory at Dawn Scientific today and take your research to the next level!</p>
                                    </div>
                                    <button className="btn-collapse site-title" onClick={() => setReadMore(!readMore)} aria-label="Toggle Read More">Read {readMore ? 'Less' : 'More'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container app_portfolio_title'>
                    <div className='row'>
                        <h4>Consumables & supplies Product Portfolio</h4>
                    </div>
                </div>
                <div className='container applications_brands applications_brands_inner'>
                    <div className='row'>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/filtration/cellulose" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/filterpaper1-300x236.webp"/>
                            </NavLink>
                            <h3>Cellulose Filter Paper</h3>
                            <NavLink to="/product-category/consumables-supplies/filtration/cellulose" className='apl_link'>116 products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/filtration/extraction-thimble" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/filterpaper2-300x236.webp"/>
                            </NavLink>
                            <h3>Extraction Thimble</h3>
                            <NavLink to="/product-category/consumables-supplies/filtration/extraction-thimble" className='apl_link'>109 products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/filtration/glass-microfiber" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/filterpaper4-300x236.webp"/>
                            </NavLink>
                            <h3>Glass Microfiber</h3>
                            <NavLink to="/product-category/consumables-supplies/filtration/glass-microfiber" className='apl_link'>294 products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/spatula-loop/spatula" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Consumables_34-300x236.webp"/>
                            </NavLink>
                            <h3>Other Spatula</h3>
                            <NavLink to="/product-category/consumables-supplies/spatula-loop/spatula" className='apl_link'>320 products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="" onClick={() => scrollToSection(cleanUp)} title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Clean-up-kit-150x150.webp"/>
                            </NavLink>
                            <h3>Clean-up kit</h3>
                            <NavLink to="" onClick={() => scrollToSection(cleanUp)} className='apl_link'>661 products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/filtration/capsule-filters" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/Capsule-Filters-300x300.webp"/>
                            </NavLink>
                            <h3>Capsule Filters</h3>
                            <NavLink to="/product-category/consumables-supplies/filtration/capsule-filters" className='apl_link'>49 products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/filtration/membrane" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/filterpaper7-300x236.webp"/>
                            </NavLink>
                            <h3>Membrane</h3>
                            <NavLink to="/product-category/consumables-supplies/filtration/membrane" className='apl_link'>4 Products</NavLink>
                        </div>												
                        <div className='apl_col'>
                            <NavLink to="/product-category/consumables-supplies/weighing-dishes" title="Accuris" className='apl_fill'>
                                <img src="/assets/images/DawnIcons25_WeighingBoats-300x300.webp"/>
                            </NavLink>
                            <h3>Weighing Boats & Dish</h3>
                            <NavLink to="/product-category/consumables-supplies/weighing-dishes" className='apl_link'>266 products</NavLink>
                        </div>
                    </div>
                    <div className="row">
                        <div className="inner-page-products">
                            <div className="product-wrapper" ref={cleanUp}>
                                <div className="title list-title">
                                    <h2>Clean-up Kit</h2>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">MAG-DYECL-250-CL</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <NavLink to={`/product/axygen-axyprep-mag-dyeclean-up-kit/`}>Axygen AxyPrep Mag DyeClean-Up Kit</NavLink>
                                            </h2>
                                            <h2 className="brand_name">
                                                <NavLink to={`/brand/corning-axygen`}>Corning Axygen</NavLink>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$7120.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <NavLink to={`/product/axygen-axyprep-mag-dyeclean-up-kit/`} ><i className="far fa-eye"></i></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">MAG-DYECL-50-CL</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <NavLink to={`/product/axygen-axyprep-mag-dyeclean-up-kit-50ml/`}>Axygen AxyPrep™ Mag DyeClean-Up Kit - 50mL</NavLink>
                                            </h2>
                                            <h2 className="brand_name">
                                                <NavLink to={`/brand/corning-axygen`}>Corning Axygen</NavLink>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$1703.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <NavLink to={`/product/axygen-axyprep-mag-dyeclean-up-kit-50ml/`} ><i className="far fa-eye"></i></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">MAG-PCR-CL-50-CL</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <NavLink to={`/product/axygen-axyprep-mag-pcr-clean-up-kit-50ml/`}>Axygen AxyPrep™Mag PCR Clean-Up Kit - 50mL</NavLink>
                                            </h2>
                                            <h2 className="brand_name">
                                                <NavLink to={`/brand/corning-axygen`}>Corning Axygen</NavLink>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$853.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <NavLink to={`/product/axygen-axyprep-mag-pcr-clean-up-kit-50ml/`} ><i className="far fa-eye"></i></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-list-content">
                                    <div className="row">
                                        <div className="col-md-2">
                                            <h2 className="product_sku">
                                                <span className="badge badge-yellow">MAG-PCR-CL-5-CL</span>
                                            </h2>
                                        </div>
                                        <div className="col-md-4">
                                            <h2 className="product_title">
                                                <NavLink to={`/product/axygen-axyprep-mag-pcr-clean-up-kit-5ml/`}>Axygen AxyPrep™Mag PCR Clean-Up Kit - 5mL</NavLink>
                                            </h2>
                                            <h2 className="brand_name">
                                                <NavLink to={`/brand/corning-axygen`}>Corning Axygen</NavLink>
                                            </h2>
                                        </div>
                                        <div className="col-md-25">
                                            <div className="text-center">
                                                <span className="price">$188.52</span>
                                            </div>
                                        </div>
                                        <div className="col-md-15">
                                            <div className="btn-area">
                                                <NavLink to={`/product/axygen-axyprep-mag-pcr-clean-up-kit-5ml/`} ><i className="far fa-eye"></i></NavLink>
                                            </div>
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

export default SamplePreparation