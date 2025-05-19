import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Users() {
    const { auth, setAuth } = useAuth();
    const [users, setUsers] = useState([]);

    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/user";

    useEffect(
        () => {
            axios.get(PRODUCT_API_BASE_URL + "/all")
                .then((res) => {
                    setUsers(res.data);
                })
                .catch((err) => { console.log(err) })

        }, []);


    return (

        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col' className='d-flex align-items-left'>Name</th>
                    <th scope='col'>Hostel</th>
                    <th scope='col'>Phone</th>
                    <th scope='col'>Coins</th>
                    <th scope='col'>Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {
                    users.map(
                        usr =>
                            <tr key={usr.id}>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <img
                                            src={usr.image}
                                            alt=''
                                            style={{ width: '45px', height: '45px' }}
                                            className='rounded-circle'
                                        />
                                        <div className='ms-3'>
                                            <p className='fw-bold mb-1'>{usr.name}</p>
                                            <p className='text-muted mb-0'>{usr.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{usr.address}</p>
                                    <p className='text-muted mb-0'>{usr.country}</p>
                                </td>
                                <td>
                                    <p className='fw-normal mb-1'>{usr.phone}</p>
                                </td>

                                <td> <p className='fw-normal mb-1'>{usr.coins}</p> </td>
                                <td>
                                    <Link type="button" color='link' rounded size='sm' to="/user" state={{ user: usr }}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                    )}

            </MDBTableBody>
        </MDBTable>
    );
}