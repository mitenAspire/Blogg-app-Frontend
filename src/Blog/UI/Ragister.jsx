import { MDBBtn, MDBCheckbox, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
export default function Register() {
  const [username, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [Error, setError] = useState(false);
  const status = useSelector((state) => {
    return state.addblogs;
  });
  const navigate = useNavigate();
  const BaseUrl=process.env.REACT_APP_BASE_URL

 
  useEffect(() => {
    namechange("");
    emailchange("");
    passwordchange("");
  }, [status.success]);

  const handlesubmit = async (e) => {
    e.preventDefault();
  
    if (!username || !email || !password) {
      setError(true);
      return false;
    }

    console.log("wefwde");
    const empdata = { username, email, password, role: "user" };
    console.log(empdata);
    let result = await fetch(`${BaseUrl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(
          localStorage.getItem("login-auth")
        )}`,
      },
      body: JSON.stringify(empdata),
    });
    toast.success("Now U Login!!!", { autoClose: 200 });
    setTimeout(() => {
      
      navigate("/login");
    }, 1500);
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result.username));
    localStorage.setItem("sign-auth", JSON.stringify(result.auth));
  };

  return (
    <div
      className="container w-50 mt-5  bg-light"
      style={{ boxShadow: "2px 2px 20px black" }}
    >
      <form onSubmit={handlesubmit}>
        <div className="text-center mb-3">
          <p>Sign up </p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <ToastContainer />
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>

          <p className="text-center mt-3">OR :</p>
        </div>

        <MDBInput
          wrapperClass="mb-4"
          label="Name"
          value={username}
          onChange={(e) => namechange(e.target.value)}
          id="form3"
          type="text"
        />
        {Error && !username && (
          <Stack
            sx={{ width: "100%" }}
            style={{ "margin-top": "-21px", "margin-bottom": "8px" }}
          >
            {" "}
            <Alert variant="outlined" severity="warning">
              {" "}
              Please filled Username !
            </Alert>
          </Stack>
        )}
        <MDBInput
          wrapperClass="mb-4"
          label="Email"
          value={email}
          onChange={(e) => emailchange(e.target.value)}
          id="form4"
          type="email"
        />
        {Error && !email && (
          <Stack
            sx={{ width: "100%" }}
            style={{ "margin-top": "-21px", "margin-bottom": "8px" }}
          >
            {" "}
            <Alert variant="outlined" severity="warning">
              Please filled Email !
            </Alert>
          </Stack>
        )}
        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form5"
          value={password}
          onChange={(e) => passwordchange(e.target.value)}
          type="password"
        />
        {Error && !password && (
          <Stack
            sx={{ width: "100%" }}
            style={{ "margin-top": "-21px", "margin-bottom": "8px" }}
          >
            {" "}
            <Alert variant="outlined" severity="warning">
              Please filled Password !
            </Alert>
          </Stack>
        )}
        <div className="d-flex justify-content-center mb-4">
          <MDBCheckbox
            name="flexCheck"
            id="flexCheckDefault"
            label="I have read and agree to the terms"
          />
        </div>
        <MDBBtn className="mb-4 w-100" type="submit">
          Sign up
        </MDBBtn>
      </form>
    </div>
  );
}
