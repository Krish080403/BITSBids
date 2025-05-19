import React, { Component } from 'react';
import ProductService from '../services/ProductService';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import axios from 'axios';
import './ProductsList.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import useAuth from '../hooks/useAuth';



const ProductsList = () => {
    const { auth, setAuth } = useAuth();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products";
    useEffect(() => {

        axios.get(PRODUCT_API_BASE_URL + "/all")
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));

    }, []);


    const handleSearch = (event) => {
        event.preventDefault();

        axios.get(PRODUCT_API_BASE_URL + "/search/" + search)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.log(err));
    }


    return (
        <div>
           
            <MDBNavbar>
                <MDBContainer>

                    <form className='d-flex input-group w-auto'>
                        <input type='search' className='form-control' placeholder='Search for product' aria-label='Search' value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        <MDBBtn color='primary' onClick={handleSearch}>Search</MDBBtn>
                    </form>

                </MDBContainer>
            </MDBNavbar>
            <section style={{ backgroundColor: "#FFFFFF"}}>
                <div className="container py-5">
                    {
                        products.map(
                            product =>
                                <div key={product.id} className="row justify-content-center mb-3 product-tile">
                                    <div className="col-md-12 col-xl-10">
                                        <div className="card shadow-0 border rounded-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                                                        <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                            <img src={product.image}
                                                                className="w-100" />
                                                            <a href="#!">
                                                                <div className="hover-overlay">
                                                                    <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6 col-xl-6">
                                                        <h5>{product.name}</h5>
                                                        <div className="d-flex flex-row">
                                                            <div className="text-danger mb-1 me-2">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </div>
                                                            <span>463</span>
                                                        </div>
                                                        <div className="mt-1 mb-0 text-muted small">
                                                            <span>100% Authentic and Certified</span>
                                                            <span className="text-primary"> • </span>
                                                            <span>Period Used: 1990-2000</span>
                                                            <span className="text-primary"> • </span>
                                                            <span>First Owner<br /></span>
                                                        </div>
            
                                                        <p className="text-truncate mb-4 mb-md-0">{product.description}
                                                        </p>
                                                    </div>
                                                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                                                        <div className="d-flex flex-row align-items-center mb-1">
                                                            <h4 className="mb-1 me-1">Rs.{product.basePrice}</h4>
                                                        </div>
                                                        <h6 className="text-success">Free shipping</h6>
                                                        <div className="d-flex flex-column mt-4">
                                                            <Link to="/chat" state={{ productId: product.id, image: product.image, name: product.name, highestBid: product.highestBid, basePrice: product.basePrice, description: product.description, receiverId: product.ownerId }} className="btn btn-outline-primary btn-sm mt-2" type="button" >CHAT</Link>
                                                            <Link to="/bid" state={{ productId: product.id, image: product.image, name: product.name, highestBid: product.highestBid, basePrice: product.basePrice, description: product.description }} className="btn btn-outline-primary btn-sm mt-2" type="button" >BID</Link>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                </div>
            </section>
           
        </div>
    );

}

export default ProductsList;