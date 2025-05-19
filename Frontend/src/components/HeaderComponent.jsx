import React, { useEffect, useState } from 'react';
import ProductsList from './ProductsList';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LinkContainer } from 'react-router-bootstrap'
import useAuth from '../hooks/useAuth';
import logo from "./logo.png";
import Toggle from "./toggle";
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
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderComponent() {
  const [openBasic, setOpenBasic] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const logOut = () => {
    googleLogout();
    setAuth({});
    navigate("/");
  };

  return (

    <MDBNavbar expand='lg' light style={{ backgroundColor: '#FFF9F3' }}>
      <MDBContainer fluid>
        <LinkContainer to="/">
          <MDBNavbarBrand><img src={logo} alt="logo" style={{ width: "80px", height: "70px" }} /></MDBNavbarBrand>
        </LinkContainer>
         <Toggle/>

        
            
        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <LinkContainer to="/">
                <MDBNavbarLink >Home</MDBNavbarLink>
              </LinkContainer>
            </MDBNavbarItem>
            
            


            {/* <MDBNavbarItem>
              <LinkContainer to="/addproduct">
                <MDBNavbarLink >Add Product</MDBNavbarLink>
              </LinkContainer>

            </MDBNavbarItem> */}

            <MDBNavbarItem>
              <LinkContainer to="/chats">
                <MDBNavbarLink >Chats</MDBNavbarLink>
              </LinkContainer>

            </MDBNavbarItem>

            <MDBNavbarItem>
              <LinkContainer to="/user">
                <MDBNavbarLink >Profile</MDBNavbarLink>
              </LinkContainer>

            </MDBNavbarItem>

            {Object.keys(auth).length === 0 ? <MDBNavbarItem>
              <LinkContainer to="/login">
                <MDBNavbarLink >Login</MDBNavbarLink>
              </LinkContainer>

            </MDBNavbarItem> : <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  {auth.name}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link onClick={logOut}>Logout</MDBDropdownItem>
                  <MDBDropdownItem link>Another action</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>}


          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}