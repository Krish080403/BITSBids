import React, { useEffect, useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCardText, MDBCardBody, MDBCardImage, MDBCard } from 'mdb-react-ui-kit';
export default function User() {


    const { auth, setAuth } = useAuth();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState("");
    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/user";




    useEffect(() => {
        axios.get(PRODUCT_API_BASE_URL + "/get/" + auth.email)
            .then((res) => {
                console.log('User => ' + JSON.stringify(res.data));
                setName(res.data.name);
                setAddress(res.data.adress);
                setCountry(res.data.country);
                setPhone(res.data.phone);
                setImage(res.data.image);
                setId(res.data.id);
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);






    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('id => ' + id);
        let usr = { id: id, name: name, address: address, country: country, phone: phone, email: auth.email };
        console.log('User => ' + JSON.stringify(usr));
        axios.post(PRODUCT_API_BASE_URL + '/save', usr)
            .then(response => {
                console.log(response);
                alert("User Updated successfully!");
            })
            .catch(err => {
                console.log(err);
            })
    }




    return (
        <>
            <section style={{ backgroundColor: '#eee' }}>

                <MDBContainer className="py-5">

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src={image}
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                    <p className="text-muted mb-1">{name}</p>
                                    <p className="text-muted mb-4">{auth.email}</p>

                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <form>

                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{auth.email}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBInput
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    label='Name'

                                                    type='text'
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBInput
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    label='Phone'
                                                    type='text'
                                                />
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />

                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Hostel</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBInput
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    label='Hostel'
                                                    type='text'
                                                />

                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Address</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBInput
                                                    value={country}
                                                    onChange={(e) => setCountry(e.target.value)}
                                                    label='Country'
                                                    type='text'
                                                />

                                            </MDBCol>
                                        </MDBRow>
                                        <hr />


                                        <MDBRow>
                                            <MDBCol sm="4">
                                            </MDBCol>
                                            <MDBCol sm="4">
                                                <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
                                                    Submit
                                                </MDBBtn>
                                            </MDBCol>
                                            <MDBCol sm="4">
                                            </MDBCol>
                                        </MDBRow>

                                    </form>
                                </MDBCardBody>
                            </MDBCard>



                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

        </>


    );
}