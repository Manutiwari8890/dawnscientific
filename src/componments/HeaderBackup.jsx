import React, {useEffect, useState, useRef} from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Search from './search';
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

    const [activeMenuId, setActiveMenuId] = useState(null);
    const { startLoading, stopLoading } = useLoader();
    
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
        startLoading();;
        fetch(`${baseUrl}get-front-category`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const filter = data.data.header.map((men) => {
                const fil = men.children_recursive_front.map((f) => {
                    let sm = [];

                    if (f.children_recursive && f.children_recursive.length) {
                        sm = f.children_recursive.map(s => s); 
                    }

                    return [f, ...sm]; 
                });

                men.children_recursive_front = fil.flat();  return men
            });

            setMenus(filter); 
            stopLoading();
        })
        .catch(error => {
            console.error('Error fetching menu data:', error);
        });
        
    }, []);

    useEffect(() => {
    const header = document.querySelector('.main-head');
    const scrollTop = document.querySelector('#scroll-top');

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      setSearchOpen(false);
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
                                <a href="mailto:sales@dawnscientific.com"><i className="fa fa-envelope"></i> sales@dawnscientific.com</a>
                                <a href="tel:1-800-DAWN-SCI"><i className="fa fa-headset"></i>  1-800-DAWN-SCI  </a>
                                <a href="tel:732-902-6300"><i className="fa fa-phone"></i><b>(24x7)</b> Call 732-902-6300  </a>
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
                                        <i className="fa fa-close"></i>
                                    </button>
                                    <button className={`back-btn btn ${(activeMenuId || accountMenu) ? "active" : ""}`} onClick={() => {
                                            toggleMenu("")
                                            setAccountMenu(false);
                                        }
                                    }><i className="fa fa-chevron-left"></i> Back</button>
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
                                            <button className={`drop-toggle ${activeMenuId === menu?.id ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu(menu.id)}><i className="fa fa-chevron-right"></i></button>
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
                                    <li>
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
                                    </li>
                                    <li className="responsive-hidden">
                                        <ul className="flex-wrap">
                                            <li className={`nav-item has-children ${activeMenuId === 'industrie' ? "active" : ""}`}>
                                                <Link to="/industrie">Industries</Link>
                                                <button className={`drop-toggle ${activeMenuId === "industrie" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("industrie")}><i className="fa fa-chevron-right"></i></button>
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
                                                <button className={`drop-toggle ${activeMenuId === "support" ? "active" : ""}`} aria-label="toggle menu" onClick={() => toggleMenu("support")}><i className="fa fa-chevron-right"></i></button>
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
                                <a href="https://doc.dawnscientific.com/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary small">FIND SDS, COA and SPECIFICATION</a>                            
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
                                                <i className="fa-solid fa-user"></i> My Account <i className={`fa-solid fa-angle-${accountMenu ? 'up' : 'down'}`}></i>
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
                                <button className="nav-right-link search-button" onClick={() => setSearchOpen(!searchOpen)} aria-label="Open search"><i className={`fa fa-${!searchOpen ? "search" : "times" }`}></i></button>
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
                                <div className={`short-search ${searchOpen ? "active" : ""}`} ref={seacrhRef}>
                                    <div className="searchwrapper">
                                        <form onSubmit={(e) => {handleSearch(e)}}>
                                            <div className="form-group">
                                                <input type="text" name="search" placeholder="Search Products" value={searchText} onChange={(e) => setSearchText(e.target.value)} required />
                                            </div>
                                            <button className="btn btn-primary" aria-label="Search"><i className="fa fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>       
            </header>
        </>
    )
}

export default Header