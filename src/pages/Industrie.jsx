import React from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet'


function Industrie() {
    return (
        <>
            <Helmet>
                <title>Industries - Dawn Scientific</title>
                <meta
                    name="description"
                    content="A country’s economy relies on various types of industries. These industries encompass businesses and factories that transform raw materials into goods or provide useful services."
                />
            </Helmet>
            <div className='wrapper'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Industries</h1>
                        <p>A country’s economy relies on various types of industries. These industries encompass businesses and factories that transform raw materials into goods or provide useful services. They produce and distribute the goods and services needed by society. There are three main types of industries: primary, secondary, and tertiary. The primary industry heavily relies on natural resources and raw materials, including agriculture, mining, and fishing. The secondary industry includes manufacturing industries like automobiles, aircraft, electronics, and housewares. The tertiary industry consists of administrative services, transportation, real estate activities, personal services, health, education, and social work. Dawn Scientific offers a range of chemicals for different industrial applications. Here are some examples of various industries included in dawn scientific: Analytical chemistry, Biotechnology, Botanical, Cannabis oil extraction, Educational, Environmental chemistry, Food and beverages, Microbiology, Petroleum, Pharmacy and R&D Laboratory. We supply these different types of products from different industries to give accurate and reliable results.</p>
                    </div>
                </div>
                <div className='container industries_brands pages'>
                    <div className='row'>
                        <div className='ind_col'>
                            <NavLink to="/analytical-lab" title="Accuris" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="422" height="203" src="/assets/images/Analytical-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Accuris Logo  Dawn Scientific" />
                            </NavLink>
                            <h3>Analytical Chemistry</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/biotechnology" title="Adam Equipment" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Biotechnology.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Adam Equipment  Dawn Scientific" />
                            </NavLink>
                            <h3>Biotechnology</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/botanical" title="Agilent" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Botanical-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Agilent Technology  Dawn Scientific" />
                            </NavLink>
                            <h3>Botanical</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/cannabis-oil-extraction" title="Ahlstrom-Munksjo" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="210" height="100" src="/assets/images/Cannabis-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" title="Ahlstrommunksjo  Dawn Scientific" />
                            </NavLink>
                            <h3>Cannabis Oil Extraction</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/educational" title="Alconox" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="1415" height="515" src="/assets/images/Educational.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="Alconox Brand Logo  Precision Lab Cleaning Detergents Supplier at Dawn Scientific" title="Alconox Logo  Trusted Lab Cleaning Detergents  Dawn Scientific" />
                            </NavLink>
                            <h3>Educational</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/environmental-chemistry" title="Aldon" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="421" height="202" src="/assets/images/Enviremental-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>Environmental Chemistry</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/food-beverage-testing" title="Amcor" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="451" height="151" src="/assets/images/Food-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>Food and Beverage</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/microbiology-lab" title="Amcor" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="451" height="151" src="/assets/images/Microbiological-lab-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>Microbiology Lab</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/petroleum" title="Amcor" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="451" height="151" src="/assets/images/Petrolium-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>Petroleum</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/pharmaceutical" title="Amcor" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="451" height="151" src="/assets/images/Pharmacy-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>Pharmaceutical</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/rd-laboratory" title="Amcor" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="451" height="151" src="/assets/images/R-d-lab-400x250.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>R&D laboratory</h3>
                        </div>
                        <div className='ind_col'>
                            <NavLink to="/product-category/consumables-supplies/chemistry/" title="Amcor" className='ind_fill'>
                                <img loading="lazy" decoding="async" width="451" height="151" src="/assets/images/School-college.webp" className="attachment-full size-full wd-lazy-fade wd-loaded" alt="" />
                            </NavLink>
                            <h3>School & Colleges</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Industrie