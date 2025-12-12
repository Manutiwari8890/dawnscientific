import React, {useEffect, useState, useRef} from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { CartContext } from '../context/cart'
import { AuthContext } from '../context/AuthContext';
import { useLoader } from "../context/LoaderContext";


function Header({ onToggleCart, isOverlay, isCart }){
    const location = useLocation();
    const navigate = useNavigate();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { getTotalItem, fetchCartFromApi, isCartOpen } = useContext(CartContext)
    const { logout, isLoggedIn } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [menus, setMenus] = useState([]);
    const [accountMenu, setAccountMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const { startLoading, stopLoading } = useLoader();
    const [category, setCategory] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [focused, setFocused] = useState(false);

    const searchWrapperRef = useRef(null);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuRef = useRef(null);
    const navRef = useRef(null);
    const seacrhRef = useRef(null);

    useEffect(() => {
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setActiveMenuId(null); // close menu if clicked outside
        }
        }
        if (activeMenuId) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeMenuId]);

    useEffect(() => {
        setAccountMenu(false);
        setIsOpen(false); 
        setSearchOpen(false); 
        setFocused(false)
    }, [location.pathname])

    const toggleMenu = (id) => {
        if (navRef.current) {
        navRef.current.scrollTo({
            top: 0,
            behavior: "smooth", // smooth scrolling
        });
        }
        setActiveMenuId(activeMenuId === id ? null : id);
    };
    
    const handleSideToggle = () => {
        fetchCartFromApi(); 
        onToggleCart();
    }

    useEffect(() => {
        startLoading();
        fetch(`${baseUrl}get-front-category`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(({ data }) => {
                const formattedMenus = data?.header?.map((menu) => {
                    const mergedChildren = menu.children_recursive_front.flatMap((f) => {
                        if (f.children_recursive?.length) {
                            return [f, ...f.children_recursive];
                        }
                        return [f];
                    });

                    return {
                        ...menu,
                        children_recursive_front: mergedChildren,
                    };
                });

                setMenus(formattedMenus);
                stopLoading();
            })
            .catch((err) => {
                console.error("Error fetching menu data:", err);
                stopLoading();
            });

    }, []);

    useEffect(() => {
    const header = document.querySelector('.main-head');
    const scrollTop = document.querySelector('#scroll-top');

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      setAccountMenu(false);
      setActiveMenuId("");
      if (scrollPosition > scrollThreshold) {
        header?.classList.add('fixed-top');
        scrollTop?.classList.add('active');
      } else {
        header?.classList.remove('fixed-top');
        scrollTop?.classList.remove('active');
      }
    };
    const handleScrollTopClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        };

        window.addEventListener('scroll', handleScroll);
        scrollTop?.addEventListener('click', handleScrollTopClick);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        scrollTop?.removeEventListener('click', handleScrollTopClick);
        };
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        navigate(`/search?s=${searchText}`, { state: { value: searchText } });
        setSearchText("");
    }


    const handleSuggestions = async () => {
        if(searchText){
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
        }else{
            setCategory([])
            setProducts([])
            setBrands([])
        }
    }


    return (
        <>
            <header ref={menuRef}>
                {(isOpen || isOverlay) &&
                    <div className={`body-overlay active`} 
                        onClick={() => {
                            if(isCartOpen || isCart)  onToggleCart();
                            document.documentElement.style.overflow = "auto";
                            setIsOpen(false);
                        }}>
                    </div>
                }
                    

                <div className="top-head">
                    <div className="container_fluid">
                        <div className="d-flex justify-content-space-between">
                            <h6 className="contact-detail">
                                <a href="mailto:sales@dawnscientific.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" ><path d="M19,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V6A5.006,5.006,0,0,0,19,1ZM5,3H19a3,3,0,0,1,2.78,1.887l-7.658,7.659a3.007,3.007,0,0,1-4.244,0L2.22,4.887A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V7.5L8.464,13.96a5.007,5.007,0,0,0,7.072,0L22,7.5V18A3,3,0,0,1,19,21Z" fill="currentColor" /></svg>
                                    sales@dawnscientific.com
                                </a>
                                <a href="tel:1-800-DAWN-SCI">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M21,12.424V11A9,9,0,0,0,3,11v1.424A5,5,0,0,0,5,22a2,2,0,0,0,2-2V14a2,2,0,0,0-2-2V11a7,7,0,0,1,14,0v1a2,2,0,0,0-2,2v6H14a1,1,0,0,0,0,2h5a5,5,0,0,0,2-9.576ZM5,20H5a3,3,0,0,1,0-6Zm14,0V14a3,3,0,0,1,0,6Z" fill="currentColor" /></svg>
                                    1-800-DAWN-SCI  
                                </a>
                                <a href="tel:732-902-6300">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z" fill="currentColor" /></svg>
                                    <b>(24x7)</b> Call 732-902-6300  </a>
                            </h6>
                            <marquee behavior="smooth" direction="left">
                                Attention: If you are experiencing any checkout issues, please call 732-902-6300 | We are currently updating the price listed on our website.
                            </marquee>
                            <nav>
                                <ul>
                                    <li className={`nav-item has-children ${activeMenuId === 'industrie' ? "open" : ""}`} onClick={() => {toggleMenu('industrie')}}>
                                        <Link to="/industrie">Industries</Link>
                                        <ul className="sub-menu">
                                            <div className="d-flex">
                                                <ul>
                                                    <li className="nav-item">
                                                        <Link to='/analytical-lab' aria-label="Analytical Chemistry">Analytical Chemistry</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/biotechnology' aria-label="Biotechnology">Biotechnology</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/botanical' aria-label="Botanical">Botanical</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/cannabis-oil-extraction' aria-label="Cannabis Oil Extraction">Cannabis Oil Extraction</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/educational" aria-label="Educational">Educational</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/environmental-chemistry' aria-label="Environmental Chemistry">Environmental Chemistry</Link>
                                                    </li>
                                                </ul>
                                                <ul>
                                                    <li className="nav-item">
                                                        <Link to='/food-beverage-testing' aria-label="Food and Beverage">Food and Beverage</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/microbiology-lab' aria-label="Microbiology Lab">Microbiology Lab</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/petroleum' aria-label="Petroleum">Petroleum</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/pharmaceutical' aria-label="Pharmaceutical">Pharmaceutical</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/rd-laboratory' aria-label="R&D laboratory">R&D laboratory</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to='/product-category/consumables-supplies/chemistry/' aria-label="School & Colleges">School & Colleges</Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/alcohols" aria-label="Alcohols">Alcohols</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/about" aria-label="About Dawn Scientific">About Us</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/get-quote" aria-label="Get Quote">Get Quote</Link>
                                    </li>
                                    
                                    <li className={`nav-item has-children ${activeMenuId === 'support' ? "open" : ""}`} onClick={() => {toggleMenu('support')}}>
                                        <Link  rel="noopener noreferrer">Support</Link>
                                        <ul className="sub-menu">
                                            <li className="nav-item">
                                                <Link to="/literature" aria-label="Literature">Literature</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/faqs" aria-label="FAQ">FAQ's</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/join-us" aria-label="Join Us">Join Us</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/career" aria-label="Career">Career</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <Link to="/contact" aria-label="Contact">Contact</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="main-head">
                    <div className="container_fluid">
                        <div className="d-flex justify-content-space-between">
                            <div className="logo">
                                <Link to="/" aria-label="Dawn Scientific">
                                    <img src="/assets/images/Website-logo-1.webp" alt="Dawn Scientific" width="200" height="60" />
                                </Link>
                            </div>
                            <nav className={`navbar-menu ${isOpen ? 'active' : ''}`} ref={navRef}>
                                <div className="offcanvas-header">
                                    <Link to="/" className="logo" aria-label="Dawn Scientific">
                                        <img src="/assets/images/Website-logo-1.webp" alt="Dawn Scientific"  loading="lazy" width="200" height="60" />
                                    </Link>
                                    <button className="close-navbar" onClick={() => {
                                        document.documentElement.style.overflow = "auto";                             
                                        setIsOpen(false)
                                    }} aria-label="Close Menu">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                    </button>
                                    <button className={`back-btn btn ${(activeMenuId || accountMenu) ? "active" : ""}`} onClick={() => {
                                            toggleMenu("")
                                            setAccountMenu(false);
                                        }
                                    }>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" fill="currentColor" /></svg>
                                        Back
                                    </button>
                                </div>
                                <ul>
                                   {menus && menus.map(menu => (
                                    <li
                                        key={menu?.id}
                                        className={`nav-item ${menu?.children_recursive_front && menu?.children_recursive_front.length ? 'has-children' : ''} ${activeMenuId === menu.id ? "active" : ""}`}
                                    >
                                        <Link to={`/product-category/${menu?.slug}`} aria-label={menu?.name}>
                                                {menu.name}
                                        </Link>
                                        {menu?.children_recursive_front && menu?.children_recursive_front.length > 0 &&
                                            <button className={`drop-toggle ${activeMenuId === menu?.id ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu(menu.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" fill="currentColor" /></svg>
                                            </button>
                                        }
                                        {menu?.children_recursive_front && menu?.children_recursive_front.length > 0 && (
                                        <ul className={`sub-menu ${activeMenuId === menu.id ? 'open' : ''}`}>
                                            <div className="d-flex">
                                                {Array.from({ length: 5 }).map((_, i) => {
                                                const chunkSize = Math.ceil(menu?.children_recursive_front.length / 5);
                                                const start = i * chunkSize;
                                                const end = start + chunkSize;
                                                const chunk = menu?.children_recursive_front.slice(start, end);
                                                    
                                                return (
                                                    <ul key={i}>
                                                    {chunk.map(child => (
                                                            <li key={child?.id} className="nav-item">
                                                                <Link to={`/product-category/${menu?.slug}/${child?.slug}`} aria-label={child?.name}>{child?.name}</Link>
                                                            </li>                                                        
                                                    ))}
                                                    </ul>
                                                );
                                                })}
                                            </div>
                                        </ul>
                                        )}
                                    </li>
                                    ))}
                                    {/* <li>
                                        <Link to="/suppliers" aria-label="Dawn Scientific Suppliers">Suppliers</Link>
                                    </li>
                                    <li className={`nav-item has-children ${activeMenuId === "456" ? 'active' : ''}`}>
                                        <NavLink to="/applications" aria-label="Application">Application</NavLink>
                                        <button className={`drop-toggle ${activeMenuId === "456" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("456")}><i className="fa fa-chevron-right"></i></button>
                                        <ul className="sub-menu">
                                            <li className="nav-item">
                                                <NavLink to="/application_chromatography-supplies" aria-label="Chromatography">Chromatography supplies</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/application_cryogenic" aria-label="Cryogenic">Cryogenic</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/application_liquid-handling" aria-label="Liquid Handling">Liquid handling</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/application_microbiological" aria-label="Microbiological">Microbiological</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/application_safety" aria-label="Safety">Safety</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/application_sample-preparation" aria-label="Sample Preparation">Sample Preparation</NavLink>
                                            </li>
                                            
                                        </ul>
                                    </li> */}
                                    <li className="responsive-hidden">
                                        <ul className="flex-wrap">
                                            <li className={`nav-item has-children ${activeMenuId === 'industrie' ? "active" : ""}`}>
                                                <Link to="/industrie">Industries</Link>
                                                <button className={`drop-toggle ${activeMenuId === "industrie" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("industrie")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" fill="currentColor" /></svg>
                                                </button>
                                                <ul className="sub-menu">
                                                    <div className="d-flex">
                                                        <ul>
                                                            <li className="nav-item">
                                                                <Link to='/analytical-lab' aria-label="Analytical Chemistry">Analytical Chemistry</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/biotechnology' aria-label="Biotechnology">Biotechnology</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/botanical' aria-label="Botanical">Botanical</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/cannabis-oil-extraction' aria-label="Cannabis Oil Extraction">Cannabis Oil Extraction</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to="/educational" aria-label="Educational">Educational</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/environmental-chemistry' aria-label="Environmental Chemistry">Environmental Chemistry</Link>
                                                            </li>
                                                        </ul>
                                                        <ul>
                                                            <li className="nav-item">
                                                                <Link to='/food-beverage-testing' aria-label="Food and Beverage">Food and Beverage</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/microbiology-lab' aria-label="Microbiology Lab">Microbiology Lab</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/petroleum' aria-label="Petroleum">Petroleum</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/pharmaceutical' aria-label="Pharmaceutical">Pharmaceutical</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/rd-laboratory' aria-label="R&D laboratory">R&D laboratory</Link>
                                                            </li>
                                                            <li className="nav-item">
                                                                <Link to='/product-category/consumables-supplies/chemistry/' aria-label="School & Colleges">School & Colleges</Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/alcohols" aria-label="Alcohols">Alcohols</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/about" aria-label="About Dawn Scientific">About Us</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/get-quote" aria-label="Get Quote">Get Quote</Link>
                                            </li>
                                            <li className={`nav-item has-children ${activeMenuId === 'support' ? "active" : ""}`}>
                                                <Link  rel="noopener noreferrer">Support</Link>
                                                <button className={`drop-toggle ${activeMenuId === "support" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("support")}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" fill="currentColor" /></svg>
                                                </button>
                                                <ul className="sub-menu">
                                                    <li className="nav-item">
                                                        <Link to="/literature" aria-label="Literature">Literature</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/faqs" aria-label="FAQ">FAQ's</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/join-us" aria-label="Join Us">Join Us</Link>
                                                    </li>
                                                    <li className="nav-item">
                                                        <Link to="/career" aria-label="Career">Career</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link to="/contact" aria-label="Contact">Contact</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className={`long-search ${searchOpen ? "active" : ""}`} ref={searchWrapperRef}>
                                    <form onSubmit={(e) => handleSearch(e)}>
                                        <div className="d-flex w-full">
                                            <div className="form-group">
                                                <input type="text" name="search" placeholder="Type in Product Names, Product Numbers, or CAS Numbers to see suggestions." value={searchText} onChange={(e) => setSearchText(e.target.value)} onKeyUp={() => handleSuggestions()} onFocus={() => setFocused(true)} />
                                                <button className="close-all" type="button"
                                                    onClick={() => {
                                                        setSearchText("");
                                                        setFocused(false);
                                                        setSearchOpen(false);
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg> 
                                                </button>
                                            </div>
                                            <button className="btn btn-primary" aria-label="Search">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xml:space="preserve">
                                                    <g>
                                                        <path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor" />
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                    </form>
                                    {focused && (
                                        <div className={`search-result-wrapper ${loading ? "search-loading" : null}`}>
                                            <div className={`search-result ${searchText ? "active" : ""}`}>
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <h4>Find Products by name, product code, or CAS number.</h4>
                                                        <p>Try : EC410” or Acetone”</p>
                                                        <div className="product-wrapper">
                                                            {products.map(pro => (
                                                                <div className="product-list-content" key={pro?.id}>
                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <h2 className="product_title">
                                                                                <NavLink to={`/product/${pro?.slug}`}> {pro?.name}</NavLink>
                                                                            </h2>
                                                                        </div>
                                                                        <div className="col-md-25">
                                                                            <h2 className="product_sku">
                                                                                <span className="badge badge-yellow">{pro?.sku}</span>
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
                                                        {products?.length>0 &&
                                                            <div className="categories">
                                                                <ul className="flex-wrap">
                                                                    <li>
                                                                        <h4>Categories :</h4>
                                                                    </li>
                                                                    {category?.map((cate) => (
                                                                        <li key={cate?.id}>
                                                                            <Link to={`/product-category/${cate?.slug}`}>{cate?.name}</Link>
                                                                        </li>    
                                                                    ))}
                                                                </ul>
                                                                <ul className="flex-wrap">
                                                                    <li>
                                                                        <h4>Brands :</h4>
                                                                    </li>
                                                                    {brands?.map((brand) => (
                                                                        <li key={brand?.id}>
                                                                            <Link to={`/brand/${brand?.slug}`}>{brand?.name}</Link>
                                                                        </li>    
                                                                    ))}
                                                                </ul>
                                                                <Link to="/product-category" className="btn btn-text m-auto">See More</Link>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <a href="https://doc.dawnscientific.com/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary small">FIND SDS, COA and SPECIFICATION</a>                             */}
                                    {isLoggedIn ?
                                        <div className={`nav-right-link has-children my_account ${accountMenu ? 'open' : ''}`}>
                                            <div className="clickBtn" onClick={() => {
                                                if (navRef.current) {
                                                navRef.current.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth", 
                                                })
                                                }
                                                setAccountMenu(!accountMenu)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" fill="currentColor" /></svg>
                                                 My Account 
                                                 {accountMenu ? 
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="arrow"><path d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z" fill="currentColor" /></svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="arrow"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" fill="currentColor" /></svg>
                                                 }
                                            </div>
                                            <ul className={accountMenu ? "active" : ""} onClick={(e) => e.preventDefault()}>
                                                <li><NavLink  to="/user/account" data-discover="true" aria-label="User Account"><i className="fas fa-gauge-high"></i> Dashboard</NavLink></li>
                                                <li><NavLink  to="/user/orders" data-discover="true" aria-label="User Orders"><i className="fas fa-shopping-bag"></i> My Order List</NavLink></li>
                                                <li><NavLink to="/user/company"><i className="fas fa-globe" aria-label="User Company"></i> Corporate Account</NavLink></li>
                                                <li><NavLink  to="/user/profile" data-discover="true" aria-label="User Profile"><i className="fas fa-user"></i> Profile</NavLink></li>
                                                <li><NavLink  to="/user/addresses" data-discover="true" aria-label="User Address"><i className="fas fa-location-dot"></i> Addresses</NavLink></li>
                                                <li><NavLink  to="/user/wishlist" data-discover="true" aria-label="User Wishlist"> <i className="fas fa-heart"></i> Wishlist</NavLink></li>
                                                <li><button onClick={() => {
                                                    logout(); 
                                                    setAccountMenu(!accountMenu); 
                                                }} aria-label="User Logout"><i className="fas fa-sign-out" aria-label="Logout"></i> Logout</button></li>
                                            </ul>
                                        </div> :
                                        <div className="d-flex gap-15">
                                            <NavLink to="/login" className="btn btn-primary login_btn w-100" aria-label="Login/Sign Up">Login/Sign up</NavLink>
                                        </div>
                                    }
                            </nav>
                            <div className="support-links d-flex gap-20 align-center w-auto">
                                
                                {/* <button className="nav-right-link search-button" onClick={onToggleSearch} aria-label="Open search"><i className="fa fa-search"></i></button>         */}
                                <button className="nav-right-link search-button" onClick={() => {
                                    setSearchOpen(!searchOpen)
                                }}
                                aria-label="Open search">
                                    {searchOpen ? 
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" fill="currentColor" /></svg>  :
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 513.749 513.749" xml:space="preserve"><g><path d="M504.352,459.061l-99.435-99.477c74.402-99.427,54.115-240.344-45.312-314.746S119.261-9.277,44.859,90.15   S-9.256,330.494,90.171,404.896c79.868,59.766,189.565,59.766,269.434,0l99.477,99.477c12.501,12.501,32.769,12.501,45.269,0   c12.501-12.501,12.501-32.769,0-45.269L504.352,459.061z M225.717,385.696c-88.366,0-160-71.634-160-160s71.634-160,160-160   s160,71.634,160,160C385.623,314.022,314.044,385.602,225.717,385.696z" fill="currentColor"></path></g></svg> 
                                    }
                                </button> 
                                <button className="nav-right-link cart-link  d-flex align-center" onClick={() => handleSideToggle()} aria-label="Open Cart">
                                    <svg className="svg_icon" width="32" height="32" fill="red">
                                        <use xlinkHref="/sprite.svg#cart" />
                                    </svg>
                                    <span className="count">{getTotalItem()}</span>  
                                </button>
                                <button className="navbar-toggler" onClick={() => {
                                    document.documentElement.style.overflow = "hidden"; 
                                    setIsOpen(true)
                                }} aria-label="Open Sidebar">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                                
                                {/* <div className={`short-search ${searchOpen ? "active" : ""}`} ref={seacrhRef}>
                                    <div className="searchwrapper">
                                        <form onSubmit={(e) => {handleSearch(e)}}>
                                            <div className="form-group">
                                                <input type="text" name="search" placeholder="Search Products" value={searchText} onChange={(e) => setSearchText(e.target.value)} required />
                                            </div>
                                            <button className="btn btn-primary" aria-label="Search"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>    
                </div>       
            </header>
        </>
    )
}

export default React.memo(Header);
