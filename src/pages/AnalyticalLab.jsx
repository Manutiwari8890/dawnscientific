import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function AnalyticalLab(){
    const [readMore, setReadMore] = useState(false);
    
    return (
        <>
            <Helmet>
                <title>Analytical Lab - Dawn Scientific</title>
                <meta
                    name="description"
                    content="Analytical chemistry: Analytical chemistry is a specialized branch of chemistry that concentrates on the examination and assessment of different substances. "
                />
            </Helmet>
            <div className='wrapper industry_inner'>
                <section className='ind_section back_gray'>
                    <div className='container'>
                        <div className='row'>
                            <h1>ANALYTICAL CHEMISTRY</h1>
                            <p>Analytical chemistry: Analytical chemistry is a specialized branch of chemistry that concentrates on the examination and assessment of different substances. Its main goal is to separate, identify, and measure matter using both traditional and modern scientific techniques. Classical and advanced instrumental methods are employed in this field. Analytical chemistry has wide-ranging applications in industries such as pharmaceuticals, food production, chemicals, agriculture, and scientific laboratories. Within this field, there are four significant areas that are highly important in various scientific disciplines: spectroscopy, acid-base methods, potentiometry, and chromatography. Numerous analytical instruments are used, including mass spectrometers, chromatographs (such as GC and HPLC), titrators, spectrometers (such as AAS, X-ray, and fluorescence), particle size analyzers, rheometers, elemental analyzers (such as salt analyzers and CHN analyzers), thermal analyzers, and more. The main focus of analytical chemistry is to address qualitative and quantitative problems. It plays a crucial role in our everyday lives, contributing to drug manufacturing, medical diagnostics, forensic investigations, soil testing for mineral and nutrient concentrations, and environmental monitoring. Additionally, analytical chemistry plays an essential role in various research endeavors. There is numerous of chemicals, reagents, Standard Solutions, Volumetric Solutions, Buffers, Test Solutions, Solvents, Acids & bases are required in routine work for the analysis. Shop now all your requirements for your laboratory from Dawn Scientific at very competitive rates.</p>
                            <hr></hr>
                            <h2>List of Chemicals</h2>
                            <p>ChemieR is innovative & unique product range in laboratory chemicals which includes organic reagents, inorganic reagents, & solvents, acid & Base products.</p>
                            <div className='ind_table'>
                                <div className='table_responsice'>
                                    <table className='table' cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-glacial-fcc/">CH8003</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-glacial-fcc/">Acetic Acid. Glacial, FCC</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 – $321.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetone-10/">CH5001</NavLink></td>
                                                <td><NavLink to="/product/acetone-10/">Acetone ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink>				</td>
                                                <td>$24.52 – $262.52 </td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetonitrile-10/"> CH5003</NavLink></td>
                                                <td><NavLink to="/product/acetonitrile-10/"> Acetonitrile ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$38.52 – $353.52 </td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/chloroform-acs-4/"> CH5013</NavLink></td>
                                                <td><NavLink to="/product/chloroform-acs-4/"> Chloroform ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$46.52 – $749.52 </td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/decane-3/"> CH5020</NavLink></td>
                                                <td><NavLink to="/product/decane-3/"> Decane ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$75.52 – $447.52</td>
                                            </tr>  
                                            <tr>
                                                <td><NavLink to="/product/dichloromethane-methylene-chloride-acs/">CH5024</NavLink></td>
                                                <td><NavLink to="/product/dichloromethane-methylene-chloride-acs/">Dichloromethane (Methylene Chloride) ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$27.52 – $353.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/formic-acid-88-acs/"> CH8017</NavLink></td>
                                                <td><NavLink to="/product/formic-acid-88-acs/">Formic Acid 88% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 – $308.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/hydrochloric-acid-37-acs/"> CH8025</NavLink></td>
                                                <td><NavLink to="/product/hydrochloric-acid-37-acs/">Hydrochloric Acid 37% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 – $300.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/nitric-acid-70-acs/"> CH8040</NavLink></td>
                                                <td><NavLink to="/product/nitric-acid-70-acs/"> Nitric Acid 70% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$24.52 – $319.52 </td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/phosphoric-acid-85-acs/">CH8048</NavLink></td>
                                                <td><NavLink to="/product/phosphoric-acid-85-acs/">Phosphoric Acid 85% ACS</NavLink></td>
                                                <td><NavLink to="/brand/chemier/">ChemieR</NavLink></td>
                                                <td>$21.52 – $629.52</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='ind_img'>
                                    <img src='/assets/images/Group-image-1-768x685.webp' alt="Chemier" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='ind_section'>
                    <div className='container'>
                        <div className='row'>
                            <p>Test solutions are a solution of reagents in such solvents and of such definite concentrations, abbreviated “TS”. Dawn Scientific’s cUSP Test Solution is prepared to the specifications of the USP Pharmacopeial Convention.</p>
                            <h2>List of Chemicals</h2>
                            <div className='ind_table'>
                                <div className='table_responsice'>
                                    <table className='table' cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>
                                                <td><NavLink to="/product/acetate-buffer-ts/"> TS14001</NavLink></td>
                                                <td><NavLink to="/product/acetate-buffer-ts/"> Acetate Buffer TS</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$37.52 – $98.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-0-100n-n-10/"> VS17001</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-0-100n-n-10/"> Acetic Acid 0.100N (N/10)</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$25.52 – $42.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-1-00n-n-1/"> VS17002</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-1-00n-n-1/"> Acetic Acid 1N (N/1)</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$24.52 – $40.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-2-v-v/"> APS15000</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-2-v-v/"> Acetic Acid 2% V/V</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$27.52 – $41.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-6n/"> VS17003</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-6n/"> Acetic Acid 6N</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$25.52 – $36.52 </td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-glacial-ts/"> TS14002</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-glacial-ts/"> Acetic Acid, Glacial, TS</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$37.52 – $148.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetic-acid-strong-ts/"> TS14003</NavLink></td>
                                                <td><NavLink to="/product/acetic-acid-strong-ts/"> Acetic Acid, strong, TS</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$50.52 – $111.52 </td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acid-alcohol-5-v-v-3/"> APS15009</NavLink></td>
                                                <td><NavLink to="/product/acid-alcohol-5-v-v-3/"> Acid-Alcohol 5% V/V</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$28.52 – $42.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/boric-acid-2-w-v-3/"> APS15010</NavLink></td>
                                                <td><NavLink to="/product/boric-acid-2-w-v-3/"> Boric Acid 2% W/V</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$26.52 – $39.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/buffer-solution-ph-11-0-4/"> B16017</NavLink></td>
                                                <td><NavLink to="/product/buffer-solution-ph-11-0-4/"> Buffer Solution pH 11.0</NavLink></td>
                                                <td><NavLink to="/brand/cusp/">cUSP</NavLink></td>
                                                <td>$24.52 – $41.52</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='ind_img'>
                                    <img src='/assets/images/Analytical-chemistry-group-02-1-768x469.webp' alt="Analytical-chemistry" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className='ind_section back_yellow'>
                    <div className='container'>
                        <div className='row'>
                            <p>Dawn Scientific introducing Superior Quality products “Lichrom” for Liquid Chromatography. LiChrom series products are ideal all type of Liquid Chromatography.</p>
                            <h2>List of Chemicals</h2>
                            <div className='ind_table'>
                                <div className='table_responsice'>
                                    <table className='table' cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>
                                                <td><NavLink to="/product/1-butanesulfonic-acid-sodium-salt-anhydrous/"> IP9901</NavLink></td>
                                                <td><NavLink to="/product/1-butanesulfonic-acid-sodium-salt-anhydrous/"> 1-Butanesulfonic acid sodium salt (Anhydrous) HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$129.52 – $353.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/1-decanesulfonic-acid-sodium-salt-anhydrous/"> IP9903</NavLink></td>
                                                <td><NavLink to="/product/1-decanesulfonic-acid-sodium-salt-anhydrous/"> 1-Decanesulfonic acid sodium salt (Anhydrous) HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$144.52 – $396.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/1-heptane-sulfonic-acid-sodium-salt-monohydrate/"> IP9906</NavLink></td>
                                                <td><NavLink to="/product/1-heptane-sulfonic-acid-sodium-salt-monohydrate/"> 1-Heptane sulfonic acid sodium salt (Monohydrate) HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$117.52 – $343.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/1-hexadecane-sulfonic-acid-sodium-salt-anhydrous/"> IP9907</NavLink></td>
                                                <td><NavLink to="/product/1-hexadecane-sulfonic-acid-sodium-salt-anhydrous/"> 1-Hexadecane sulfonic acid sodium salt (Anhydrous) HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$54.52 – $378.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/1-hexane-sulfonic-acid-sodium-salt-anhydrous/"> IP9908</NavLink></td>
                                                <td><NavLink to="/product/1-hexane-sulfonic-acid-sodium-salt-anhydrous/"> 1-Hexane sulfonic acid sodium salt (Anhydrous) HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$117.52 – $331.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/ammonium-acetate-2/"> LC9951</NavLink></td>
                                                <td><NavLink to="/product/ammonium-acetate-2/"> Ammonium acetate HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$140.52 – $257.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/ammonium-phosphate-dibasic/"> LC9952</NavLink></td>
                                                <td><NavLink to="/product/ammonium-phosphate-dibasic/"> Ammonium phosphate dibasic HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$127.52 – $215.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/potassium-phosphate-monobasic-2/"> LC9954</NavLink></td>
                                                <td><NavLink to="/product/potassium-phosphate-monobasic-2/"> Potassium phosphate monobasic HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$102.52 – $172.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/sodium-acetate-anhydrous-2/"> LC9955</NavLink></td>
                                                <td><NavLink to="/product/sodium-acetate-anhydrous-2/"> Sodium acetate anhydrous HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$187.52 – $320.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/sodium-phosphate-dibasic-2/"> LC9953</NavLink></td>
                                                <td><NavLink to="/product/sodium-phosphate-dibasic-2/"> Sodium phosphate dibasic HPLC</NavLink></td>
                                                <td><NavLink to="/brand/lichrom/">LiChrom</NavLink></td>
                                                <td>$106.52 – $182.52</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='ind_img'>
                                    <img src='/assets/images/Lichrom-group-image-768x637.webp' alt="Lichrom" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='ind_section'>
                    <div className='container'>
                        <div className='row'>
                            <h2>List of Chemicals</h2>
                            <p>Processes to high purity for accurate & repeatable determination of trace levels of Class 1, Class 2 & Class 3 residual solvents in Pharma-ceuticals. Processed for low water content to facilitate the extraction.</p>
                            <div className='ind_table'>
                                <div className='table_responsice'>
                                    <table className='table' cellPadding={0} cellSpacing={0}>
                                        <tbody>
                                            <tr>	
                                                <td><NavLink to="/product/14-dioxane-2/"> GC9801</NavLink></td>
                                                <td><NavLink to="/product/14-dioxane-2/"> 1,4-Dioxane GC</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$108.52 – $166.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetone-7/"> GC9802</NavLink></td>
                                                <td><NavLink to="/product/acetone-7/"> Acetone GC</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$45.52 – $70.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/acetonitrile-8/"> GC9803</NavLink></td>
                                                <td><NavLink to="/product/acetonitrile-8/"> Acetonitrile GC</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$63.52 – $98.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/benzene-2/"> GC9804</NavLink></td>
                                                <td><NavLink to="/product/benzene-2/"> Benzene GC</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$68.52 – $120.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/benzyl-alcohol-2/"> GC9805</NavLink></td>
                                                <td><NavLink to="/product/benzyl-alcohol-2/"> Benzyl alcohol GC</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$115.52 – $177.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/benzyl-alcohol-5/"> GC-HS9831</NavLink></td>
                                                <td><NavLink to="/product/benzyl-alcohol-5/"> Benzyl Alcohol GC-HS</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$115.52 – $180.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/cyclohexanone-3/"> GC-HS9832</NavLink></td>
                                                <td><NavLink to="/product/cyclohexanone-3/"> Cyclohexanone GC-HS</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$38.52 – $58.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/dimethyl-sulphoxide/"> GC-HS9833</NavLink></td>
                                                <td><NavLink to="/product/dimethyl-sulphoxide/"> Dimethyl sulphoxide GC-HS</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$154.52 – $236.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/nn-dimethyl-acetamide-2/"> GC-HS9834</NavLink></td>
                                                <td><NavLink to="/product/nn-dimethyl-acetamide-2/"> N,N Dimethyl acetamide GC-HS</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$182.52 – $279.52</td>
                                            </tr>
                                            <tr>
                                                <td><NavLink to="/product/nn-dimethyl-formamide-2/"> GC-HS9835</NavLink></td>
                                                <td><NavLink to="/product/nn-dimethyl-formamide-2/"> N,N-Dimethyl formamide GC-HS</NavLink></td>
                                                <td><NavLink to="/brand/bluster/">Bluster</NavLink></td>
                                                <td>$108.52 – $161.52</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='ind_img'>
                                    <img src='/assets/images/Bluster-group-img-768x729.webp' alt="Bluster" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className='ind_section back_gray'>
                    <div className='container'>
                        <div className='row'>
                            <div className='ind_brands'>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/Bluster.webp' alt="Bluster" />
                                </div>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/ChemieR_Logo1.webp' alt="Chemier" />
                                </div>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/Cusp-276x132.webp' alt="Cusp" />
                                </div>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/EKS_uLogo.webp' alt="EKS" />
                                </div>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/KaPPaa_uLogo.webp' alt="KaPPaa" />
                                </div>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/Lichrom-276x132.webp' alt="Lichrom" />
                                </div>
                                <div className='ind_products_bx'>
                                    <img src='/assets/images/TriStains_Logo1.webp' alt="TriStains" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='ind_section'>
                    <div className='container'>
                        <div className='row'>
                            <h2>Equipment Used in Laboratory</h2>
                            <p>Dawn Scientific’s Consumables and supplies are of a vast range, all offered here. A one stop place for all your scientific needs, buying in bulk or small packs, we have you covered., with a wide selection of quality products that keep your lab running efficiently and effectively. Our consumables including Plasticware, pipette tips, transfer Pipettes, weighing dish, beakers, test tubes, cuvettes, lab notebooks, glassware and more can be used across a variety of applications according to your laboratory needs. These critical supplies offer quality, value, and convenience so you can focus on what is most important for your laboratory work.</p>
                            <div className='ind_products'>
                                <NavLink to="/product-category/consumables-supplies/glassware/glass-buret" className='ind_products_bx'>
                                    <img src='/assets/images/Glassware_2-150x150_2023.webp' alt="Glassware" />
                                    <h3>Buret</h3>
                                    <p>152 products</p>
                                </NavLink>
                                <NavLink to="/product-category/consumables-supplies/beakers/glass-beaker" className='ind_products_bx'>
                                    <img src='/assets/images/Beaker_icons_18-300x300.webp' alt="Beaker" />
                                    <h3>Glass Beaker</h3>
                                    <p>17 products</p>
                                </NavLink>
                                <NavLink to="/product-category/consumables-supplies/filtration/syringe-filters" className='ind_products_bx'>
                                    <img src='/assets/images/Syringe-Filters-300x300.webp' alt="Syringe Filters" />
                                    <h3>Syringe Filters</h3>
                                    <p>1184 products</p>
                                </NavLink>
                                <NavLink to="/product-category/consumables-supplies/flask-consumables-supplies/volumetric-flasks" className='ind_products_bx'>
                                    <img src='/assets/images/Glassware_14-150x150.webp' alt="Glassware" />
                                    <h3>Volumetric Flasks</h3>
                                    <p>778 products</p>
                                </NavLink>
                                <NavLink to="/product-category/equipments/small-equipment/water-analysis-meters-electrodes" className='ind_products_bx'>
                                    <img src='/assets/images/LI0002-150x150.webp' alt="LI0002" />
                                    <h3>Water Analysis Meters & Electrodes</h3>
                                    <p>90 products</p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default AnalyticalLab