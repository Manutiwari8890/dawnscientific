import React from 'react'
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Biotechnology(){
    
    return (
        <>
            <Helmet>
                <title>Biotechnology - Dawn Scientific</title>
                <meta
                    name="description"
                    content="In simple terms, biotechnology is a technology that is based on biology and uses biomolecular processes to improve and create new technologies."
                />
            </Helmet>
            <div className='wrapper industry_inner'>
                <section className='ind_section back_gray'>
                    <div className='container'>
                        <div className='row'>
                            <h1>Biotechnology</h1>
                            <p>In simple terms, biotechnology is a technology that is based on biology and uses biomolecular processes to improve and create new technologies. It applies the life sciences to chemical synthesis. In this unit, we will explore how biotechnology plays an increasingly important role in directly producing specialty chemicals through fermentation, such as citric acid, lactic acid, propane-1,3-diol, and certain amino acids. At Dawn Scientific, we offer a variety of Biotech Chemical Products in different forms, grades, and quantities. You can choose from our diverse selection, which includes Diversified Biotech container seals, tough-spots, Biotech gel-handler, and more. We have chemicals like Acetone, Chloroform, Ethanol, Ethyl acetate, Iso propanol 91%, Phosphoric acid 85%, and Sodium Hypochlorite TS. These chemical products are versatile, waterproof, and resistant to both chemicals and temperature. By selecting any of our Biotech Chemical products, you can enhance the accuracy of your data.</p>
                        </div>
                    </div>
                </section>

                <section className='ind_section pb_0'>
                    <div className='container'>
                        <div className='row'>
                            <h2>List of Chemicals</h2>
                            <div className='ind_table'>
                                <div className='table_responsice w_100'>
                                    <table className='table' cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>
                                                <td><NavLink to="/product/acetone-10/"> CH5001</NavLink></td>
                                                <td><NavLink to="/product/acetone-10/"> Acetone ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$24.52 - $262.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/chloroform-acs-4/"> CH5013</NavLink></td>
                                                <td><NavLink to="/product/chloroform-acs-4/"> Chloroform ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$46.52 - $749.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/ethyl-acetate-acs/"> CH5034</NavLink></td>
                                                <td><NavLink to="/product/ethyl-acetate-acs/"> Ethyl Acetate ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$47.52 - $364.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/91-isopropanol/"> CH5101</NavLink></td>
                                                <td><NavLink to="/product/91-isopropanol/"> Isopropyl alcohol 91% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$32.52 - $150.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/phosphoric-acid-85-acs/"> CH8048</NavLink></td>
                                                <td><NavLink to="/product/phosphoric-acid-85-acs/"> Phosphoric Acid 85% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 - $629.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/sodium-hypochlorite-ts/"> TS14260</NavLink></td>
                                                <td><NavLink to="/product/sodium-hypochlorite-ts/"> Sodium Hypochlorite TS</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$26.52 - $43.52</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='ind_section'>
                    <div className='container'>
                        <div className='row'>
                            <h2>Related applications</h2>
                            <div className='ind_rel_app'>
                                <div className='ind_rel_app_bx'>
                                    <img src='/assets/images/air-pollution-80x80.webp' />
                                    <h3>Air Quality Analysis</h3>
                                </div>
                                <div className='ind_rel_app_bx'>
                                    <img src='/assets/images/water-80x80.webp' />
                                    <h3>Water Analysis</h3>
                                </div>
                                <div className='ind_rel_app_bx'>
                                    <img src='/assets/images/plant-1-80x80.webp' />
                                    <h3>Soil Analysis</h3>
                                </div>
                                <div className='ind_rel_app_bx'>
                                    <img src='/assets/images/water-pollution-80x80.webp' />
                                    <h3>Environmental Contaminant Analysis</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Biotechnology