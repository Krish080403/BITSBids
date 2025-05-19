import React from 'react';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


import { useNavigate, useNavigation } from 'react-router-dom';
import { Button } from 'bootstrap';
import axios from 'axios';
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import useAuth from '../hooks/useAuth';
function AddProduct() {
    
    const { auth, setAuth } = useAuth();
    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/products";

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [basePrice, setBasePrice] = useState("");
    const [bidStartDate, setBidStartDate] = useState(new Date());
    const [bidEndDate, setBidEndDate] = useState(new Date());
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        let product = { image: image, name: name, description: description, basePrice: basePrice, bidStartDateTime: bidStartDate+"T00:00:00.000", bidEndDateTime: bidEndDate+"T00:00:00.000", ownerId:  auth.email};
        console.log('product => ' + JSON.stringify(product));
        axios.post(PRODUCT_API_BASE_URL + '/add', product)
            .then(response => {
                console.log(response);
                setImage("");
                setName("");
                setDescription("");
                setBasePrice("");
                setBidStartDate("");
                setBidEndDate("");
                alert("Product added successfully!");
            })
            .catch(err => {
                console.log(err);
                
            })
    }
    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/");
    }

    const convertToBase64 = (e) =>{
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload =() => {
            console.log(reader.result);
            setImage(reader.result);
        };
        reader.onerror = (error)=> {
            console.log("Error", error);
        };
    }

    return (
       
            <div className="container">

                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>

                            <MDBRow className='mb-4'>
                                    <MDBCol> 
                                 {image==""||image==null?"" : <img width={100} height={100} src={image} />}       
                                    </MDBCol>
                                </MDBRow>
                            <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput type="file"  onChange={convertToBase64} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput label='Product Name:' type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput label='Description' type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput type="number" min="1" label='Base Price'
                                            value={basePrice}
                                            onChange={(e) => setBasePrice(e.target.value)} required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput type="date" label='Bid Start Date'
                                         value={bidStartDate}
                                         onChange={(e) => setBidStartDate(e.target.value)}
                                            required />
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBInput type="date"  label='Bid End Date'
                                         value={bidEndDate}
                                         onChange={(e) => setBidEndDate(e.target.value)}
                                            />
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow className='mb-4'>
                                    <MDBCol>
                                        <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit}>
                                            Submit
                                        </MDBBtn> </MDBCol><MDBCol>
                                        <MDBBtn type='submit' className='mb-4' block color='danger' onClick={handleCancel}>
                                            Cancel
                                        </MDBBtn> </MDBCol>
                                </MDBRow>
                               
                            </form>
                           
                        </div>
                    </div>
                </div>
            </div >
           
    )
}

export default AddProduct;