import { React, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";

import { Context } from "../../utils/context";
import Modal from "../model";

function ShowProfile() {
  const { setIsAuthorised, showUserPanel, setShowUserPanel } =
    useContext(Context);
  const toggleUserPanel = () => {
    setShowUserPanel(true);
  };
  var localStorageData = JSON.parse(localStorage.getItem("user"));
  // This effect will run whenever the component mounts

  var username = localStorageData.username;
  const handlelogout = () => {
    const url = `http://localhost:1337/api/auth/logout`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        toast.success("Logout successfully!");
        localStorage.removeItem("user", localStorageData);
        setIsAuthorised(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <FaUserCircle onClick={toggleUserPanel} />
      <Modal open={showUserPanel}>
        <MDBContainer className="container py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol md="12" xl="4">
              <MDBCard style={{ borderRadius: "15px" }}>
                <MDBCardBody className="text-center">
                  <span
                    className="close-btn"
                    onClick={() => setShowUserPanel(false)}
                  >
                    <MdClose />
                  </span>

                  <div className="mt-3 mb-4">
                    <MDBCardImage
                      src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boAt_logo_small.svg?v=1682421543"
                      className="rounded-rectangle"
                      fluid
                      style={{ width: "100px" }}
                    />
                  </div>
                  <MDBTypography tag="h4">{username}</MDBTypography>

                  <MDBBtn
                    color="danger"
                    rounded
                    size="lg"
                    onClick={handlelogout}
                  >
                    Logout
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Modal>
    </div>
  );
}
export default ShowProfile;
