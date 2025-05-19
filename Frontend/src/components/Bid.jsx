import React, { useState } from 'react'
import { MDBBtn, MDBInput, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Route, Link, useLocation } from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
const Bid = () => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const { from } = location.state
    const productId = location.state.productId;
    const image = location.state.image;
    const name = location.state.name;
    const highestBid = location.state.highestBid;
    const basePrice = location.state.basePrice;
    const description = location.state.description;
    const [bidPrice, setBidPrice] = useState("");

    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/bid";

    const handleSubmit = (event) => {
        event.preventDefault();

        alert(productId);
        let bid = { productId: productId, bidderId: auth.email, bidPrice: bidPrice};
        console.log('bid => ' + JSON.stringify(bid));
        axios.post(PRODUCT_API_BASE_URL + '/save', bid)
            .then(response => {
                console.log(response);
                alert("Bid placed successfully!");
            })
            .catch(err => {
                console.log(err);
                
            })
    }


    return (
        <>
           
            <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="6" className="mb-4 mb-lg-0">
                            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                                <MDBRow className="g-0">
                                    <MDBCol md="4" className="gradient-custom text-center text-red"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <MDBCardImage src={image}
                                            alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                                        <MDBTypography tag="h5">{name}</MDBTypography>
                                        <MDBCardText>{description}</MDBCardText>
                                        <MDBIcon far icon="edit mb-5" />
                                    </MDBCol>
                                    <MDBCol md="8">
                                        <MDBCardBody className="p-4">
                                            <MDBTypography tag="h6">Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <MDBRow className="pt-1">
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">Base Price</MDBTypography>
                                                    <MDBCardText className="text-muted">{basePrice}</MDBCardText>
                                                </MDBCol>
                                                <MDBCol size="6" className="mb-3">
                                                    <MDBTypography tag="h6">High Bid</MDBTypography>
                                                    <MDBCardText className="text-muted">{highestBid}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>

                                            <MDBTypography tag="h6">Information</MDBTypography>
                                            <hr className="mt-0 mb-4" />
                                            <form onSubmit={handleSubmit}>
                                                <MDBRow className='mb-4'>
                                                <MDBCol size="6" className="mb-3">

                                                        <MDBInput type="number" min="1" label='Bid Price'
                                                            value={bidPrice}
                                                            onChange={(e) => setBidPrice(e.target.value)} required />

                                                    </MDBCol>
                                                
                                                    <MDBCol size="6" className="mb-3">
                                                        <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
                                                            Submit
                                                        </MDBBtn> </MDBCol>
                                                </MDBRow>
                                            </form>

                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
           
        </>
    )
}

export default Bid