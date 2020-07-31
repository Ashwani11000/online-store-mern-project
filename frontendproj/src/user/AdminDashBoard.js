import React from 'react';
import Base from '../core/Base';
import {isAutheticated} from "../auth/helper/index";
import { Link } from 'react-router-dom';


const AdminDashBoard = () =>{

    const {user: {name ,email} } = isAutheticated();
    const adminleft =()=>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link text-info" to="/admin/create/category">Create categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-info" to="/admin/create/product">Create Product</Link>
                        </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-info" to="/admin/products">Manage Products</Link>
                        </li>
                    <li className="list-group-item">
                        <Link className="nav-link text-info" to="/admin/orders">Manage Orders</Link>
                    </li>
                </ul>
            </div>
        );
    }


    const adminright =()=>{
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name: </span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email: </span> {email}
                    </li>
                </ul>
            </div>
        )
    }

    


    return(
        <Base title="Welcome to Admin page" description="Manage all the services here." className="container bg-success p-3" >
        <div className="row">
            <div className="col-3">
                {adminleft()}
            </div>
            <div className="col-9">{adminright()}</div>
        </div>
            
        </Base>
    )
}

export default AdminDashBoard;