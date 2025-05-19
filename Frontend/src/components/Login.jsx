import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox,
    MDBCardTitle, MDBCardText, MDBCardImage
}
    from 'mdb-react-ui-kit';

const Login = () => {
    const { auth, setAuth } = useAuth();


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();


    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/user";

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            console.log(user);
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                        setAuth(res.data);
                        console.log(auth);
                        console.log(res.data);
                        const emailId = res.data.email;

                        console.log("emailId: "+emailId);
                        axios
                        .get(PRODUCT_API_BASE_URL+"/get/"+emailId)
                        .then((res) => {
                            console.log('User already registered');
                            console.log(res.data);
                        })
                        .catch((err) => {console.log(err)
                            console.log('Register User');




                            
                            let newUser = { email: res.data.email, name: res.data.name };
                            axios.post(PRODUCT_API_BASE_URL + '/save', newUser);
                                alert("User registered successfully!");
                            })



                        navigate(from, { replace: true });
                    })
                    .catch((err) => console.log(err));
            }
        }, [user]);


    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
       
    };
    
    const RedirectHome = () =>{
        navigate("/", { replace: true });
    };

    return (
        <div>
            {profile ? (

                <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
                    <MDBContainer>
                        <MDBRow className="justify-content-center">
                            <MDBCol md="9" lg="7" xl="5" className="mt-5">
                                <MDBCard style={{ borderRadius: '15px' }}>
                                    <MDBCardBody className="p-4">
                                        <div className="d-flex text-black">
                                            <div className="flex-shrink-0">
                                                <MDBCardImage
                                                    style={{ width: '180px', borderRadius: '10px' }}
                                                    src={profile.picture}
                                                    alt='Generic placeholder image'
                                                    fluid />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <MDBCardTitle>{profile.name}</MDBCardTitle>
                                                <MDBCardText>{profile.email}</MDBCardText>

                                                <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                                                    style={{ backgroundColor: '#efefef' }}>
                                                    <div>
                                                        <p className="small text-muted mb-1">Listed</p>
                                                        <p className="mb-0">41</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="small text-muted mb-1">Bids Received</p>
                                                        <p className="mb-0">976</p>
                                                    </div>
                                                    <div>
                                                        <p className="small text-muted mb-1">Bidded</p>
                                                        <p className="mb-0">8.5</p>
                                                    </div>
                                                </div>
                                                <div className="d-flex pt-1">
                                                    <MDBBtn outline className="me-1 flex-grow-1" onClick={RedirectHome}>Goto Home</MDBBtn>
                                                    <MDBBtn className="flex-grow-1" onClick={logOut}>Logout</MDBBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>


            ) : (

                <MDBContainer fluid>

                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                        <MDBCol col='12'>

                            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                                <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                    <h2 className="fw-bold mb-2 text-center">Sign in</h2>
                                    <p className="text-white-50 mb-3">Please enter your login and password!</p>

                                    <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" />
                                    <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" />

                                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                                    <MDBBtn size='lg'>
                                        Login
                                    </MDBBtn>

                                    <hr className="my-4" />

                                    <MDBBtn onClick={() => login()} className="mb-2 w-100" size="lg" style={{ backgroundColor: '#dd4b39' }}>
                                        <MDBIcon fab icon="google" className="mx-2" />
                                        Sign in with google
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>

            )}
        </div>
    );
}

export default Login