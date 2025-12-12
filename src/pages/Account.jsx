import React, {useEffect, useState, useContext} from 'react';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { useLoader } from "../context/LoaderContext";
import AccountSidebar from '../componments/AccountSidebar';

function Account()
{
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const { user, logout, isLoggedIn } = useContext(AuthContext);
    const token = user?.access_token;
    const { startLoading, stopLoading } = useLoader();

    const [orders, setOrders] = useState([]); 
    const [pendingOrders, setPendingOrders] = useState([]); 
    const [completedOrders, setCompletedOrders] = useState([]); 
    const [role, setRole] = useState("");

    const getOptions = {
        method: "GET",
        headers: {  "Authorization" : `Bearer ${token}`,  "Content-Type": "application/json"},
    };

    useEffect(() => {
        startLoading();
                fetch(`${baseUrl}my-orders`, getOptions)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setOrders(result.data)

                    setPendingOrders(result.data.filter((order) => {
                        return order.status=='pending'
                    }))

                    setCompletedOrders(result.data.filter((order) => {
                        return order.status=='completed'
                    }))
                })
                .catch(error => {
                    console.error('Error fetching Orders data:', error);
                });
            }, 
        []);    

        useEffect(() => {
                fetch(`${baseUrl}user`, getOptions)
                .then(response => {
                    if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(result => {
                    setRole(result.data.role || "")
                    stopLoading()
                })
                .catch(error => {
                    console.error('Error fetching User data:', error);
                });
            }, 
        []);    
    

    return (
        <div>
            <section className="page-title">
                <div className="container">
                    <div className="title-wrapper">
                        <div className="title">
                            <h1>My Account</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="account-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-md-25">
                            <AccountSidebar />
                        </div>
                        <div className="col-md-75">
                            <div className="widget">
                                <h4>Summary</h4>
                                <div className="row">
                                    <div className="col-md-33">
                                        <div className="dashboard-card violet">
                                            <div className="detail">
                                                <h2>{pendingOrders.length}</h2>
                                                <p>Pending Orders</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-list"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-33">
                                        <div className="dashboard-card green">
                                            <div className="detail">
                                                <h2>{completedOrders.length}</h2>
                                                <p>Completed Orders</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-layer-group"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-33">
                                        <div className="dashboard-card red">
                                            <div className="detail">
                                                <h2>{role}</h2>
                                                <p>User Type</p>
                                            </div>
                                            <div className="icon">
                                                <i className="fas fa-user"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget">
                                <h4>Recent Orders</h4>
                                <div className='table_wrapper'>
                                    <table className="order">
                                        <thead>
                                            <tr>
                                                <th>#Order No</th>
                                                <th>Purchased Date</th>
                                                <th>Total</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders && (
                                                orders.map((order) => (
                                                    <tr key={order.id}>
                                                        <td><span className="table-list-code">#{order.id}</span></td>
                                                        <td>{
                                                        (() => {
                                                            const [day, month, year] = order.created_date.split("T")[0].split("-");
                                                            return `${day}-${month}-${year}`;
                                                        })()}</td>
                                                        <td>${order.total}</td>
                                                        <td>
                                                            {order.status=='pending' ? 
                                                                <span className="badge badge-info">Pending</span> : (order.status=='success') ?
                                                                <span className="badge badge-success">Completed</span> : (order.status=='cancelled') ?
                                                                <span className="badge badge-dange">Canclled</span> :  ''
                                                            }
                                                        </td>
                                                        <td>
                                                            <NavLink to={`/user/order/${order.id}`} className="btn btn-outline btn-sm"><i className="far fa-eye"></i></NavLink>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Account;