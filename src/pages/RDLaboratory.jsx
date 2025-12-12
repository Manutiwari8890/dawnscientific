import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function RDLaboratory(){
    
    return (
        <>
            <Helmet>
                <title>R&D laboratory - Dawn Scientific</title>
                <meta
                    name="description"
                    content="A research and development laboratory, commonly known as an R&D lab, is a laboratory that is utilized in various industries. "
                />
            </Helmet>
            <div className='wrapper industry_inner'>
                <section className='ind_section back_gray'>
                    <div className='container'>
                        <div className='row'>
                            <h1>R&D laboratory</h1>
                            <p>A research and development laboratory, commonly known as an R&D lab, is a laboratory that is utilized in various industries. These labs have a strong focus on experimentation and prototyping, aiming to foster innovation and create new inventions within the company. R&D is crucial for companies to maintain a competitive edge, and having a dedicated lab allows them to design new products and enhance existing ones. The popularity of R&D labs has fluctuated over time as different industries have relied on different sources of innovation. Research and development are valuable tools for business growth and improvement, as they involve the creation of new and improved products that contribute to the advancement of human life. The design and development of new products are often essential for a company’s survival in a rapidly changing global industrial landscape. At Dawn Scientific, we are problem solvers and innovators in the fields of research, development, and testing. Our mission is to support millions of people in thriving by ensuring their safety and enabling them to work more efficiently. We offer a wide range of essential chemicals, including inorganic and organic reagents, acids and bases like nitric acid, high purity solvents such as acetone, ethanol, and hydrogen peroxide, as well as glassware, plasticware, chromatography and filtration products, liquid chromatography reagents, gloves, and industry-specific purity standard-compliant products. We prioritize the safe and timely delivery of these products, empowering you to effectively carry out your assignments.</p>
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
                                                <td><NavLink to="/product/acetone-lab/"> CH5002</NavLink></td>
                                                <td><NavLink to="/product/acetone-lab/"> Acetone Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$20.52 - $331.52</td>
                                            </tr>
                                            <tr>  
                                                <td><NavLink to="/product/alcohol-ethanol-pure-200-proof-fcc-grade/"> CH7501</NavLink></td>
                                                <td><NavLink to="/product/alcohol-ethanol-pure-200-proof-fcc-grade/"> Alcohol (Ethanol), Pure, 200 Proof, FCC Grade</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$33.52 - $360.52</td>
                                            </tr>
                                            <tr>  
                                                <td><NavLink to="/product/alcohol-organic-certified-pure-ethyl-alcohol-190-proof-corn-derived-fcc/"> CH7513</NavLink></td>
                                                <td><NavLink to="/product/alcohol-organic-certified-pure-ethyl-alcohol-190-proof-corn-derived-fcc/"> Alcohol Organic Certified Pure Ethyl Alcohol (190 Proof) CORN Derived, FCC</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$134.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/chloroform-lab/"> CH5015</NavLink></td>
                                                <td><NavLink to="/product/chloroform-lab/"> Chloroform Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$41.52 - $690.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/dichloromethane-methylene-chloride-acs/"> CH5024</NavLink></td>
                                                <td><NavLink to="/product/dichloromethane-methylene-chloride-acs/"> Dichloromethane (Methylene Chloride) ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$27.52 - $353.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/dichloromethane-methylene-chloride-lab/"> CH5025</NavLink></td>
                                                <td><NavLink to="/product/dichloromethane-methylene-chloride-lab/"> Dichloromethane (Methylene Chloride) Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$26.52 - $343.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/reagent-alcohol-95/"> CH5036</NavLink></td>
                                                <td><NavLink to="/product/reagent-alcohol-95/"> Ethyl Alcohol 200 PF ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$26.52 - $396.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/heptane-lab/"> CH5043</NavLink></td>
                                                <td><NavLink to="/product/heptane-lab/"> Heptane Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$47.52 - $274.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/hexanes-acs-4/"> CH5046</NavLink></td>
                                                <td><NavLink to="/product/hexanes-acs-4/"> Hexane ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$27.52 - $331.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/hexanes-lab/"> CH5047</NavLink></td>
                                                <td><NavLink to="/product/hexanes-lab/"> Hexane Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$24.52 - $407.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/hydrochloric-acid-37-acs/"> CH8025</NavLink></td>
                                                <td><NavLink to="/product/hydrochloric-acid-37-acs/"> Hydrochloric Acid 37% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 - $300.52</td>
                                            </tr>
                                            <tr>  
                                                <td><NavLink to="/product/hydrogen-peroxide-30-lab/"> CH8064</NavLink></td>
                                                <td><NavLink to="/product/hydrogen-peroxide-30-lab/"> Hydrogen peroxide 30% Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$99.52 - $524.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/hydrogen-peroxide-35/"> PS18057</NavLink></td>
                                                <td><NavLink to="/product/hydrogen-peroxide-35/"> Hydrogen Peroxide 35%</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$126.52 - $194.52</td>
                                            </tr>
                                            <tr>  
                                                <td><NavLink to="/product/isopropyl-alcohol-lab/"> CH5051</NavLink></td>
                                                <td><NavLink to="/product/isopropyl-alcohol-lab/"> Isopropyl Alcohol Lab</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 - $920.52</td>
                                            </tr>
                                            <tr>  
                                                <td><NavLink to="/product/isopropyl-alcohol-usp/"> CH5052</NavLink></td>
                                                <td><NavLink to="/product/isopropyl-alcohol-usp/"> Isopropyl Alcohol USP</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$27.52 - $278.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/methanol-acs-5/"> CH5055</NavLink></td>
                                                <td><NavLink to="/product/methanol-acs-5/"> Methanol ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 - $187.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/n-pentane-2/"> GC9821</NavLink></td>
                                                <td><NavLink to="/product/n-pentane-2/"> n-Pentane GC</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$108.52 - $167.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/nitric-acid-70-acs/"> CH8040</NavLink></td>
                                                <td><NavLink to="/product/nitric-acid-70-acs/"> Nitric Acid 70% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$24.52 - $319.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/sodium-chloride-acs-2/"> CH1528</NavLink></td>
                                                <td><NavLink to="/product/sodium-chloride-acs-2/"> Sodium Chloride ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$14.52 - $358.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/sodium-hypochlorite-12-5/"> PS18142</NavLink></td>
                                                <td><NavLink to="/product/sodium-hypochlorite-12-5/"> Sodium Hypochlorite, 12.5%</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$28.52 - $50.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/sulfuric-acid-acs-6/"> CH8053</NavLink></td>
                                                <td><NavLink to="/product/sulfuric-acid-acs-6/"> Sulfuric Acid ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 - $315.52</td>
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

export default RDLaboratory