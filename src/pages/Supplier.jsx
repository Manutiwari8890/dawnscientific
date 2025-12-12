import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useLoader } from '../context/LoaderContext';
import { Helmet } from 'react-helmet';

function Supplier() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const [brands, setBrands] = useState([]);
    const { startLoading, stopLoading } = useLoader();

    useEffect(() => {
        startLoading();
        const fetchBrands = async () => {
            try {
                const response = await fetch(`${baseUrl}brands?per_page=150`);

                if (!response.ok) {
                    throw new Error("Suppliers Fetch Failes");
                }

                const result = await response.json();
                setBrands(result.data)
                console.log(result)
            } catch (err) {
                console.log(err)
            } finally {
                stopLoading();
            }
        }

        fetchBrands();
    }, [])

    return (
        <>
            <Helmet>
                <title>Suppliers - Dawn Scientific</title>
                <meta
                    name="description"
                    content="Dawn Scientific specialized in distribution of premium Chemicals and consumables products sourced from reputable manufacturers and distributors worldwide. "
                />
            </Helmet>
            <div className='wrapper'>
                <div className='container'>
                    <div className='inner_banner'>
                        <h1>Suppliers</h1>
                        <p>Dawn Scientific specialized in distribution of premium Chemicals and consumables products sourced from reputable manufacturers and distributors worldwide. Dawn Scientific offers a comprehensive range of offerings to meet various laboratory needs from suppliers like Celltreat, Globe scientific, Cytiva and many more for consumables and LabChem, Ricca Chemicals, Millipore Sigma, Honeywell and more. Overall, Dawn Scientific prioritizes customer satisfaction and aims to be a reliable source for laboratory supplies. Buy Laboratory Consumables and Chemicals from Dawn Scientific.
                            Please check back often continuously, for new manufacturers and suppliers on our website dawnscientific.com.</p>
                    </div>
                </div>
                <div className='container suppliers_brands'>
                    <div className='row'>
                        {brands &&
                            brands?.map((brand) => (
                                <div className='sp_col' key={brand?.id}>
                                    <NavLink to={`/brand/${brand?.slug}`} title={brand?.name} className='sp_fill'>
                                        <img loading="lazy" decoding="async" width="422" height="203" src={brand?.image_url} className="attachment-full size-full wd-lazy-fade wd-loaded" alt={brand?.name} title={brand?.name} />
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default Supplier