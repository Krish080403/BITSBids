import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FooterComponent from "./FooterComponent";
import HeaderComponent from "./HeaderComponent";
import dayjs from "dayjs";

export default function Chats() {
  const { auth, setAuth } = useAuth();

  const [productId, setProductId] = useState("");
  const [currentReceiverId, setCurrentReceiverId] = useState(null);
  const [chatters, setChatters] = useState([]);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState("");


  const PRODUCT_API_BASE_URL = "http://localhost:8080/api/v1/chat";
  useEffect(() => {
    console.log(auth);
    if (!auth.email)
      alert('You are not logged in');

    axios.get(PRODUCT_API_BASE_URL + "/chatters/" + auth.email)
      .then((res) => {
        setChatters(res.data);
        console.log("chatters: " + res.data)

        if (currentReceiverId) {
          axios.get(PRODUCT_API_BASE_URL + "/chattersChat/" + auth.email + "/" + currentReceiverId)
            .then((res) => {
              setChats(res.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));

  }, [dateTime]);



  const changeCurrentReceiverId = (receiver, index) => {
    setCurrentReceiverId(receiver);
    setCurrentIndex(index);
    console.log(receiver);
    setDateTime(new Date());
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    let chat = { senderId: auth.email, receiverId: currentReceiverId, productId: productId, message: message };
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

    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <h5 className="font-weight-bold mb-3 text-center text-lg-start">
            Member
          </h5>

          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">

                {
                  chatters.map(
                    (chatter, index) =>

                      <li key={chatter}
                        className="p-2 border-bottom" onClick={() => changeCurrentReceiverId(chatter, index + 1)}
                        style={{ backgroundColor: currentReceiverId == chatter ? "#eee" : "" }}
                      >
                        <a href="#!" className="d-flex justify-content-between">
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">{index + 1}</p>
                              <p className="small text-muted">

                              </p>
                            </div>
                          </div>

                        </a>
                      </li>

                  )}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">

          <MDBTypography listUnStyled>

            {
              chats.map(
                (chat, index) =>



                  <li key={chat.id} className={currentReceiverId != chat.receiverId ? "d-flex justify-content-start mb-4" : "d-flex justify-content-end mb-4"}>
                    {currentReceiverId != chat.receiverId ? (<img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                      width="60"
                    />) : ("")}
                    <MDBCard>
                      <MDBCardHeader className="d-flex justify-content-center p-3">
                        <p className="fw-bold mb-0">{currentReceiverId != chat.receiverId ? currentIndex : "Me"}</p>
                        <p className="text-muted small mb-0"><br />
                          {/*  <MDBIcon far icon="clock" /> {/* dayjs(chat.dateTime).format("DD-MM-YYYY HH:mm") */}
                        </p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0">
                          {chat.message}
                        </p>
                      </MDBCardBody>
                    </MDBCard>

                    {currentReceiverId == chat.receiverId ? (<img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                      width="60"
                    />) : ("")}


                  </li>
              )}
            <form>
              <li className="bg-white mb-3">
                <MDBTextArea label="Message" id="textAreaExample" rows={4} value={message}
                  onChange={(e) => setMessage(e.target.value)} />
              </li>
              <MDBBtn color="info" rounded className="float-end" onClick={handleSubmit}>
                Send
              </MDBBtn>
            </form>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

  );
}