import React, {useEffect, useMemo} from 'react'
import { useContext } from 'react';
import { CartContext } from '../context/cart';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Select from 'react-select'
import { useLoader } from "../context/LoaderContext";
import { tr } from 'framer-motion/client';



function Checkout(){
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const { cartItems, addToCart, removeFromCart, cartDetail, clearCart, getCartTotal, fetchCartFromApi, updateCartItemQuantity } = useContext(CartContext)
    const { user, logout, isLoggedIn, login } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [checkoutData, setCheckoutData] = useState({});
    const [shipAdds, setShipAdds] = useState("");
    const { startLoading, stopLoading } = useLoader();
    const [selectShip, setSelectShip] = useState();

    const [cartLoading, setCartLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [coupon, setCoupon] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [couponLoading, setCouponLoading] = useState(false);

    const [billing_fname, setBfname] = useState("");
    const [billing_lname, setBlname] = useState("");
    const [billing_company, setBcompany] = useState("");
    const [billing_email, setBemail] = useState("");
    const [billing_phone, setBphone] = useState("");
    const [billing_address, setBaddress] = useState("");
    const [billing_address2, setBaddress2] = useState("");
    const [billing_country, setBcountry] = useState("United States");
    const [billing_city, setBcity] = useState("");
    const [billing_postcode, setBpostCode] = useState("");
    const [billing_state, setBstate] = useState("");
    const [billing_message, setBmessage] = useState("");

    const [shipping_fname, setSfname] = useState("");
    const [shipping_lname, setSlname] = useState("");
    const [shipping_company, setScompany] = useState("");
    const [shipping_email, setSemail] = useState("");
    const [shipping_phone, setSphone] = useState("");
    const [shipping_address, setSaddress] = useState("");
    const [shipping_address2, setSaddress2] = useState("");
    const [shipping_country, setScountry] = useState("United States");
    const [shipping_city, setScity] = useState("");
    const [shipping_postcode, setSpostCode] = useState("");
    const [shipping_state, setSstate] = useState("");
    const [shipping_message, setSmessage] = useState("");
    const [shipping_residential, setSresident] = useState(false);
    const [shipDiff, setShidpDiff] = useState(false);
    const [checkTerm, setCheckTerm] = useState(false);


    const [billErrors, setBillErrors] = useState({});
    const [messageType, setMessageType] = useState(false);


    const states = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' },
    ];


    if(!isLoggedIn){
        navigate('/login');
    }

    useEffect(() => {
        startLoading();
        const getShipAddresses = async ()=>{
            try{
                const response = await fetch(`${baseUrl}user/addresses`,{
                    method: "GET",
                    headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error("Shipping Address Fetch Unsuccessful");
                }

                const result = await response.json();
                if(result.status){
                    setShipAdds(result.data)
                }
            }catch(err){
                console.error(err)
            }
        }

        getShipAddresses();
    }, [])

    useEffect(() => {
        const fetchBill = async () => {
            try{
                const response = await fetch(`${baseUrl}user/address`,{
                    method : "GET",
                    headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                })

                if(!response.ok){
                    throw new Error ("Update Bill Failed")
                }
                const result = await response.json();
                if(result.status){
                    setBfname(result.data.billing_first_name)
                    setBlname(result.data.billing_last_name)
                    setBemail(result.data.billing_email)
                    setBphone(result.data.billing_phone)
                    setBcompany(result.data.billing_company ? result.data.billing_company : "")
                    setBaddress(result.data.billing_address_1)
                    setBaddress2(result.data.billing_address_2)
                    setBcity(result.data.billing_city)
                    setBstate(result.data.billing_state)
                    setBpostCode(result.data.billing_postcode)
                }
                
            }catch(err){
                console.error(err)
            }
        }

        fetchBill();
    }, [])
    
    useEffect(() => {
        const fetchCartDetail = async ()=>{
            const data = await cartDetail()
            setCheckoutData(data);
            stopLoading();
        }
        fetchCartDetail();
        
    }, [])


    useEffect(() => {
        const fetchCartDetail = async (add)=>{
            try{
                const response = await fetch(`${baseUrl}cart/detail`, {
                    method: 'POST',
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                    guest_token: localStorage.getItem("guest_key_token"),
                    address_id: selectShip,
                    city: add[4],
                    state: add[5],
                    postcode: add[6],
                    country: add[9],
                    address_1: add[7],
                    first_name: add[0],
                    last_name: add[1],
                    company: add[8],
                    phone: add[3],
                    email: add[2]
                    }),
                })

                if(!response.ok){
                    throw new Error("Cart Detail Ftech Unsuccessful");
                }
                const result = await response.json();
                setCheckoutData(result.data)

            }catch(err){
                console.error(err)
            }
            setIsLoading(false);
        }

        if(!shipDiff && billing_fname && billing_lname && billing_email && billing_phone && billing_city && billing_state && billing_postcode){
            setIsLoading(true);
            fetchCartDetail([billing_fname, billing_lname, billing_email, billing_phone, billing_city, billing_state, billing_postcode, billing_address, billing_company, billing_country]);
        }
        if(shipDiff || (shipDiff && shipping_fname && shipping_lname && shipping_email && shipping_phone && shipping_city && shipping_state && shipping_postcode)){
            setIsLoading(true);
            fetchCartDetail([shipping_fname, shipping_lname, shipping_email, shipping_phone, shipping_city, shipping_state, shipping_postcode, shipping_address, shipping_company, shipping_country]);
        }
    }, [billing_fname, billing_lname, billing_email, billing_phone, billing_city, billing_state, billing_postcode, cartItems, shipDiff, shipping_fname, shipping_lname, shipping_email, shipping_phone, shipping_city, shipping_state, shipping_postcode, shipping_address, shipping_company])
    

    const customerDetails = {
        coupon_code : coupon,
        billing_first_name : billing_fname,
        billing_last_name : billing_lname,
        billing_email : billing_email,
        billing_company : billing_company,
        billing_phone : billing_phone,
        billing_address_1 : billing_address,
        billing_city : billing_city,
        billing_country : billing_country,
        billing_postcode : billing_postcode,
        billing_state : billing_state,
        notes : billing_message,

        ship_to_different_address : shipDiff,
        shipping_first_name : shipping_fname,
        shipping_last_name : shipping_lname,
        shipping_company : shipping_company,
        shipping_email : shipping_email,
        shipping_phone : shipping_phone,
        shipping_address_1 : shipping_address,
        shipping_country : shipping_country,
        shipping_city : shipping_city,
        shipping_postcode : shipping_postcode,
        shipping_state : shipping_state,
        shipping_message : shipping_message,

        user_discount : checkoutData?.user_discount,
        tariff_charge : checkoutData?.tariff,
        fuel_surcharge : checkoutData?.fuel_surcharge,
        packing_handling_charges : checkoutData?.packing_handling_charges,
        hazmat_charges : checkoutData?.hazmat_charges,
        coupon_discount : checkoutData?.coupon_discount,
        subtotal : checkoutData?.sub_total,
        total : checkoutData?.total,
    }

    async function placeOrder(e) {
        e.preventDefault();
        const errors = billingFormValidate(customerDetails);
        setBillErrors(errors)
        if(Object.keys(errors).length === 0)
        {
            setIsLoading(true);
                    const orderData = {
                        ...customerDetails,
                        amount: checkoutData.total,
                        payment_method: 'stripe',
                    };
                    const intentData = {
                        amount: checkoutData.total,
                        currency: 'usd',
                    };
                    const res = await fetch(`${baseUrl}create-payment-intent`, {
                        method: 'POST',
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(intentData),
                        });
                        //here first intent api then get response client_secret and check successed
                        const data = await res.json();
                        if (res.ok) {  
                        const result = await stripe.confirmCardPayment(data.clientSecret, {
                            payment_method: {
                                card: elements.getElement(CardElement),
                            },
                        });
                        if (result.error) {
                            alert(result.error.message);
                            setIsLoading(false);
                            return;
                        }
                        // Step 2: Call same checkout API again with payment_intent_id
                        
                        const orderRes = await fetch(`${baseUrl}checkout`, {
                            method: 'POST',
                            headers: {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ 
                                ...orderData, payment_intent_id: result.paymentIntent.id,
                            }),
                        });

                        const orderResult = await orderRes.json();
                        const clearCart = await fetchCartFromApi();
                        if(orderResult && orderResult.status){
                            navigate("/thankyou", { state: { data:result } });
                        }
                    }
                   
        }
            setIsLoading(false);
        }

    const billingFormValidate = (val) =>
    {
        const billingError = {}
        if(!val.billing_first_name)
        {
            billingError.fname = "The billing first name field is required."
        }
        if(!val.billing_last_name)
        {
            billingError.lname = "The billing last name field is required."
        }
        if(!val.billing_company)
        {
            billingError.company = "The billing company field is required."
        }
        if(!val.billing_email)
        {
            billingError.email = "The billing email field is required."
        }
        if(!val.billing_phone)
        {
            billingError.phone = "The billing phone field is required."
        }
        if(!val.billing_address_1)
        {
            billingError.address = "The billing address field is required."
        }
        if(!val.billing_city)
        {
            billingError.city = "The billing city field is required."
        }
        if(!val.billing_country)
        {
            billingError.country = "The billing country field is required."
        }
        if(!val.billing_postcode)
        {
            billingError.postcode = "The billing postcode field is required."
        }
        if(!val.billing_state)
        {
            billingError.state = "The billing state field is required."
        }
        if(!shipping_residential && !selectShip)
        {
            billingError.resdetial = "Please Confirm !"
        }
        if(!checkTerm)
        {
            billingError.checkTerm = "Please Confirm !"
        }
        if(!checkoutData?.products[0].charges?.net_charge){
            billingError.fedexError = "Fedex Error"
        }
        if(shipDiff){
            if(!shipping_fname)
            {
                billingError.sfname = "The Shipping first name field is required."
            }
            if(!shipping_lname)
            {
                billingError.slname = "The Shipping last name field is required."
            }
            if(!shipping_company)
            {
                billingError.scompany = "The Shipping company field is required."
            }
            if(!shipping_email)
            {
                billingError.semail = "The Shipping email field is required."
            }
            if(!shipping_phone)
            {
                billingError.sphone = "The Shipping phone field is required."
            }
            if(!shipping_address)
            {
                billingError.saddress = "The Shipping address field is required."
            }
            if(!shipping_city)
            {
                billingError.scity = "The Shipping city field is required."
            }
            if(!billing_country)
            {
                billingError.scountry = "The Shipping country field is required."
            }
            if(!shipping_postcode)
            {
                billingError.spostcode = "The Shipping postcode field is required."
            }
            if(!shipping_state)
            {
                billingError.sstate = "The Shipping state field is required."
            }
        }

        return billingError
    }    


    async function handleCoupon()
    {
        setCouponLoading(true);
        try{
            const response = await fetch(`${baseUrl}cart/coupon`, {
                method:"POST",
                headers:{"Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
                body:JSON.stringify({coupon_code : coupon})
            })

            if(!response.ok){
                throw new Error("Coupon Fetch UnsuccessFul");
            }

            const result = await response.json();
            setMessageType((result.status) ? true : false)
            const newData = await cartDetail(coupon);
            setCheckoutData(newData)
            setCouponMessage(result.status ? "Coupon Added" : result.message)
            setCouponLoading(false);  
        }catch(err){
            console.error(err)
        }
    }

    const handleAdds = (id)=>{
        const newAdd = shipAdds.find(item => item.id === id)
        if(newAdd){
            setSfname(newAdd.first_name);
            setSlname(newAdd.last_name);
            setScompany(newAdd.company || "");
            setSemail(newAdd.email);
            setSphone(newAdd.phone);
            setSaddress(newAdd.address_1);
            setSaddress2(newAdd.address_2);
            setScity(newAdd.city);
            setSpostCode(newAdd.postcode);
            const foundState = states.find(st => st.value === newAdd.state);
            setSstate(foundState.value || "");
        }else{
            setSfname("");
            setSlname("");
            setScompany("");
            setSemail("");
            setSphone("");
            setSaddress("");
            setSaddress2("");
            setScity("");
            setSpostCode("");
            setSstate("");
        }
        
    }

    return (
        <div>           
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>CHECKOUT</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="checkout">
                <div className="container">
                    <div className="col-md-5">
                        <NavLink to="/cart" className="btn btn-secondary mb-2"><i className="fa fa-arrow-left"></i> Cart</NavLink>
                    </div>
                    <form onSubmit={placeOrder}>
                        <div className="row">
                            <div className="col-md-5">
                                <div className="accordion-item widget">
                                    <h2 className="accordion-header">
                                        <button type="button" className={`accordion-button collapsed`} aria-label="Toggle Billing Address">Your Billing Address <i className="fa fa-chevron-down"></i></button>
                                    </h2>
                                    <div className={`accordion-collapse  show`}>
                                        <div className="accordion-body">
                                            <div className="row">
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <input type="text" className="form-control" placeholder="First Name" value={billing_fname} onChange={(e) => setBfname(e.target.value)} />
                                                        {billErrors.fname && <p className="error">{billErrors.fname}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Last Name</label>
                                                        <input type="text" className="form-control" placeholder="Last Name" value={billing_lname} onChange={(e) => setBlname(e.target.value)} required />
                                                        {billErrors.lname && <p className="error">{billErrors.lname}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input type="email" className="form-control" placeholder="Email Address" value={billing_email} onChange={(e) => setBemail(e.target.value)} required />
                                                        {billErrors.email && <p className="error">{billErrors.email}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Phone</label>
                                                        <input type="tel" className="form-control" placeholder="Phone Number" value={billing_phone} onChange={(e) => setBphone(e.target.value)} />
                                                        {billErrors.phone && <p className="error">{billErrors.phone}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Company</label>
                                                        <input type="text" className="form-control" placeholder="Company" value={billing_company} onChange={(e) => setBcompany(e.target.value)} />
                                                        {billErrors.company && <p className="error">{billErrors.company}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Country</label>
                                                        <input type="text" className="form-control" placeholder="Country" value={billing_country} readOnly />
                                                        {billErrors.country && <p className="error">{billErrors.country}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Address Line 1</label>
                                                        <input type="text" className="form-control" placeholder="Address Line 1" value={billing_address} onChange={(e) => setBaddress(e.target.value)}  />
                                                        {billErrors.address && <p className="error">{billErrors.address}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Address Line 2 (Optional)</label>
                                                        <input type="text" className="form-control" placeholder="Address Line 2 " value={billing_address2} onChange={(e) => setBaddress2(e.target.value)}  />
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" className="form-control" placeholder="City" value={billing_city} onChange={(e) => setBcity(e.target.value)} required />
                                                        {billErrors.city && <p className="error">{billErrors.city}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>Postcode</label>
                                                        <input type="text" className="form-control" placeholder="Post Code" value={billing_postcode} onChange={(e) => setBpostCode(e.target.value)} required />
                                                        {billErrors.postcode && <p className="error">{billErrors.postcode}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-5">
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        <Select options={states} value={states.find((option) => option.value === billing_state)} onChange={(selectedOption) => setBstate(selectedOption.value)} />        
                                                        {billErrors.state && <p className="error">{billErrors.state}</p>}
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-group">
                                                        <label>Your Message For Order</label>
                                                        <textarea rows="5" onChange={(e) => setBmessage(e.target.value)} defaultValue={billing_message}></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-10">
                                                    <div className="form-check">
                                                        <label htmlFor="shipdiff">
                                                            <input type="checkbox" id="shipdiff" checked={shipDiff} onChange={() => setShidpDiff(!shipDiff)} className="form-check-input" />
                                                            <p>Ship to a different address?</p>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {shipDiff &&  
                                    <>
                                        <div className="widget">
                                            <div className="title">
                                                <h3>Shipping Address and Billing Address</h3>
                                            </div>
                                            <div className="previous-wrapper">
                                                <div className="row">
                                                    <div className="col-md-10">
                                                        <label className="address-radio">
                                                            <input type="radio" name="preAdd" defaultValue={""} onChange={() => handleAdds("")} selected={selectShip === ""} />
                                                            <div className="address">
                                                                <p><i className="fas fa-location-dot"></i>  Ship to a different address?</p>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    {shipAdds.length>0 && 
                                                        shipAdds.map((adds) => (
                                                            <div className="col-md-10" key={adds.id}>
                                                                <label className="address-radio">
                                                                    <input type="radio" name="preAdd"  defaultValue={adds.id} onChange={() => handleAdds(adds.id)} selected={adds.id === selectShip} />
                                                                    <div className="address">
                                                                        <p>Name : {adds.first_name}</p>
                                                                        <p>Email : {adds.email}</p>
                                                                        <p><i className="fas fa-location-dot"></i> {adds.address_1}</p>
                                                                    </div>
                                                                </label>
                                                            </div>
                                                        ))
                                                    }  
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item widget">
                                            <h2 className="accordion-header">
                                                <button type="button" className={`accordion-button collapsed`} aria-label="Toggle Shipping Address">Your Shipping Address <i className="fa fa-chevron-down"></i></button>
                                            </h2>
                                            <div className={`accordion-collapse ${ shipDiff ? "show" : ""} ${selectShip ? "loading-wrapper" : ""}`}>
                                                <div className="accordion-body">
                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>First Name</label>
                                                                <input type="text" className="form-control" placeholder="First Name" value={shipping_fname} onChange={(e) => setSfname(e.target.value)} />
                                                                {billErrors.sfname && <p className="error">{billErrors.sfname}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Last Name</label>
                                                                <input type="text" className="form-control" placeholder="Last Name" value={shipping_lname} onChange={(e) => setSlname(e.target.value)} />
                                                                {billErrors.slname && <p className="error">{billErrors.slname}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input type="email" className="form-control" placeholder="Email Address" value={shipping_email} onChange={(e) => setSemail(e.target.value)} />
                                                                {billErrors.semail && <p className="error">{billErrors.semail}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Phone</label>
                                                                <input type="tel" className="form-control" placeholder="Phone Number" value={shipping_phone} onChange={(e) => setSphone(e.target.value)} />
                                                                {billErrors.sphone && <p className="error">{billErrors.sphone}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Company</label>
                                                                <input type="text" className="form-control" placeholder="Company" value={shipping_company} onChange={(e) => setScompany(e.target.value)} />
                                                                {billErrors.scompany && <p className="error">{billErrors.scompany}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Country</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 1" value={shipping_country} readOnly />
                                                                {billErrors.scountry && <p className="error">{billErrors.scountry}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Address Line 1</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 1" value={shipping_address} onChange={(e) => setSaddress(e.target.value)} />
                                                                {billErrors.saddress && <p className="error">{billErrors.saddress}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Address Line 2 (Optional)</label>
                                                                <input type="text" className="form-control" placeholder="Address Line 2 " value={shipping_address2} onChange={(e) => setSaddress2(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>City</label>
                                                                <input type="text" className="form-control" placeholder="City" value={shipping_city} onChange={(e) => setScity(e.target.value)} />
                                                                {billErrors.scity && <p className="error">{billErrors.scity}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Postcode</label>
                                                                <input type="text" className="form-control" placeholder="Post Code" value={shipping_postcode} onChange={(e) => setSpostCode(e.target.value)} />
                                                                {billErrors.spostcode && <p className="error">{billErrors.spostcode}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>State</label>
                                                                <Select options={states} value={states.find((option) => option.value === shipping_state)} onChange={(selectedOption) =>setSstate(selectedOption.value)} />        
                                                                {billErrors.sstate && <p className="error">{billErrors.sstate}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5">
                                                            <div className="form-group">
                                                                <label>Your Message For Order</label>
                                                                <textarea name="" rows="5" defaultValue={shipping_message} onChange={(e) => setSmessage(e.target.value)} ></textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                                
                                
                            </div>
                            <div className="col-md-5">
                                <div className={`widget ${couponLoading ? "loading-wrapper" : ""}`}>
                                    <div className="coupon-wrapper">
                                        <input type="text" placeholder="Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                                        <button className={`btn btn-primary ${couponLoading ? "loading" : ""}`} type="button" onClick={handleCoupon}  disabled={!coupon ? true : false} aria-label="Apply Coupon"> {!couponLoading ? "APPLY COUPON" : ""}</button>
                                    </div>
                                    {couponMessage &&  <p className={messageType ? "success" : "error"}>{couponMessage}</p>}
                                </div>
                                
                                <div className={`widget ${isLoading ? "loading-wrapper" : ""}`}>
                                    <h4>Cart totals</h4>
                                    <table className="cart-total">
                                        <tbody>
                                            <tr>
                                                <th>Product</th>
                                                <th>Subtotal</th>
                                            </tr>
                                            {checkoutData &&
                                                checkoutData?.products?.map((product) => (
                                                    <tr key={product?.id}>
                                                        <th><NavLink to={`/product/${product?.slug}`}>{product?.name}</NavLink> x {product?.quantity} 
                                                            <br /> 
                                                            <span className="badge badge-yellow small">{product?.sku} </span>
                                                        </th>
                                                        <td>${product?.subtotal}</td>
                                                    </tr>
                                                ))
                                            } 
                                            <tr>
                                                <td colSpan="2">
                                                    <hr />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>&nbsp;&nbsp;${checkoutData?.sub_total}</td>
                                            </tr>
                                            {checkoutData?.products?.map((product, index) => (
                                                (product?.charges?.net_charge ? 
                                                    <tr key={product?.id}>
                                                        <th>Shipping{index>0 ? index+1 : ''}</th>
                                                        <td>Fedex Ground : ${product?.charges?.net_charge} <br /><p className="small-name">{product?.name}</p></td>
                                                    </tr> :
                                                    null
                                                )
                                                
                                            ))}
                                            {Number(checkoutData?.fuel_surcharge?.replace(/,/g, ""))>0 ? 
                                                <tr>
                                                    <th>Fuel Surcharges</th>
                                                    <td>+ ${checkoutData?.fuel_surcharge}</td>
                                                </tr> : null
                                            }
                                            {Number(checkoutData?.packing_handling_charges?.replace(/,/g, "")>0) ?
                                                <tr>
                                                    <th>Packing & Handling Charges</th>
                                                    <td>+ ${checkoutData?.packing_handling_charges}</td>
                                                </tr> : null
                                            }
                                            {Number(checkoutData?.tariff?.replace(/,/g, ""))>0 ? 
                                                <tr>
                                                    <th>Tariff Charge</th>
                                                    <td>+ ${checkoutData?.tariff} ({checkoutData?.tariff_charge}%)</td>
                                                </tr> : null
                                            }
                                            {Number(checkoutData?.hazmat_charges?.replace(/,/g, ""))>0 ? 
                                                <tr>
                                                    <th>Hazmat Charges</th>
                                                    <td>+ ${checkoutData?.hazmat_charges}</td>
                                                </tr> : null
                                            }
                                            <tr>
                                                <th>You Save</th>
                                                <td className="price"> ${checkoutData?.user_discount}</td>
                                            </tr>
                                            {checkoutData?.coupon_discount != "0.00" && 
                                                <tr>
                                                    <th>Coupon Discount</th>
                                                    <td>- ${checkoutData?.coupon_discount}</td>
                                                </tr>
                                            }
                                            <tr>
                                                <th>Total</th>
                                                <td><b>&nbsp;&nbsp;${checkoutData?.total}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="payment-wrapper">
                                        <div className="form-group">
                                            <label>
                                                <div className="title">
                                                    <img src="/assets/images/atm-card.webp" loading="lazy" />
                                                    Credit/Debit Card
                                                </div>
                                            </label>
                                        </div>
                                        <div className="form-group card-details">
                                            <CardElement />
                                        </div>
                                        <div className="confirmation">
                                            <div className="form-check mb-2">
                                                <label htmlFor="residential">
                                                    <input type="checkbox" id="residential" checked={shipping_residential} onChange={() => setSresident(!shipping_residential)} className="form-check-input" />
                                                    <p>Please Note that Dawn Scientific Inc DO NOT ship any chemicals to home / Residential address. It will be cancelled without Notice and issue a full refund to your account</p> 
                                                </label>
                                            </div>
                                            {billErrors.resdetial &&
                                                <div className="message">
                                                    <p className="error">{billErrors.resdetial}</p>
                                                </div>
                                            }
                                            <div className="form-check mt-2 mb-2">
                                                <label htmlFor="term">
                                                    <input type="checkbox" id="term" checked={checkTerm} onChange={() => setCheckTerm(!checkTerm)} className="form-check-input" />
                                                    <p>By placing an order, I am confirming that I understand that Dawn Scientific's products are not for human or animal use and are not shipped to residential address and have read and agree with the <NavLink to="/billing-terms-and-conditions">terms and conditions</NavLink>.</p> 
                                                </label>
                                            </div>
                                            {billErrors.checkTerm &&
                                                <div className="message">
                                                    <p className="error">{billErrors.checkTerm}</p>
                                                </div>
                                            }
                                            {checkoutData?.products?.length>0 &&
                                                !checkoutData?.products[0].charges?.net_charge && billErrors.fedexError &&
                                                
                                                    <div className="message mt-1">
                                                        <p className="error">{checkoutData?.products[0].charges}</p>
                                                    </div>
                                                }
                                        </div>
                                    </div>
                                        <button className={`btn btn-primary w-100 ${isLoading ? 'loading' : ''}`} type="submit" onClick={placeOrder} aria-label="Place Order">{!isLoading ? "Place Order" : ""}</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    )
}

export default Checkout