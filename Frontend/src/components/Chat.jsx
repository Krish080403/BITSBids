import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function Chat() {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const { from } = location.state
  const productId = location.state.productId;
  const image = location.state.image;
  const name = location.state.name;
  const highestBid = location.state.highestBid;
  const basePrice = location.state.basePrice;
  const description = location.state.description;
  const receiverId = location.state.receiverId;
  const senderId = auth.email;

  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState(new Date());

  const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/chat";
  useEffect(() => {
    console.log(auth);
    if (!auth.email)
      alert('You are not logged in');

    axios.get(PRODUCT_API_BASE_URL + "/chattersChat/" + senderId + "/" + receiverId)
      .then((res) => {
        setChats(res.data);

      })
      .catch((err) => console.log(err));

  }, [dateTime]);

  const handleSubmit = (event) => {
    event.preventDefault();

    let chat = { senderId: senderId, receiverId: receiverId, productId: productId, message: message };
    console.log('chat => ' + JSON.stringify(chat));
    axios.post(PRODUCT_API_BASE_URL + '/save', chat)
      .then(response => {
        console.log(response);
        setDateTime(new Date());
        setMessage("");
      })
      .catch(err => {
        console.log(err);

      })
  }


  return (

    <MDBContainer className="py-5">
      <MDBRow className="d-flex justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
            <MDBCardHeader
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <MDBIcon fas icon="angle-left" />
              <p className="mb-0 fw-bold">Live chat</p>
              <MDBIcon fas icon="times" />
            </MDBCardHeader>

            <MDBCardBody>

              {
                chats.map(
                  chat =>
                    <div key={chat.id}>
                      {
                        (chat.receiverId == auth.email) ?
                          (
                            <div className="d-flex flex-row justify-content-start mb-4">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                              <div className="p-3 ms-3" style={{ borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)", }}                            >
                                <p className="small mb-0">
                                  {chat.message}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex flex-row justify-content-end mb-4">
                              <div
                                className="p-3 me-3 border"
                                style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
                              >
                                <p className="small mb-0">
                                  {chat.message}
                                </p>
                              </div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                alt="avatar 1"
                                style={{ width: "45px", height: "100%" }}
                              />
                            </div>
                          )}
                    </div>
                )}





              <form>
                <MDBInput wrapperClass='mb-4' textarea rows={4} label='Type your message' value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <br />
                <MDBBtn type='submit' className='mb-4' block onClick={handleSubmit} >
                  Send
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
}

