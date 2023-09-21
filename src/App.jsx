import React, { useState } from "react";
import Game from "./screens/Game/Game";
import "./App.css";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwtDecode from "jwt-decode";

const App =  () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
      <div className="App">
          {!loggedIn && <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decodedToken = jwtDecode(credentialResponse.credential);
              setName(decodedToken.name);
              setImage(decodedToken.picture);
              setEmail(decodedToken.email);
              setLoggedIn(true);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />}
        {loggedIn && <LoggedIn key={email} image={image} name={name} logout={() => {
          googleLogout();
          setName("");
          setImage("");
          setEmail("");
          setLoggedIn(false);
        }} />}
        {!loggedIn && <h1 style={{marginTop:"10px"}}>Please Login at top left corner of the screen to Play</h1>}
        {loggedIn&&<Game name={name} image={image} email={email} isloggedin={loggedIn} />}
      </div>
  );
};

function LoggedIn(props) {
  return (
    <div style={{ marginLeft: "10px", display:"flex", justifyContent:"start", gap:"0.75rem" }}>
      <img style={{ borderRadius: "50px", width: "50px", marginLeft: "10px" }} src={props.image} alt="profile" />
      <h4 style={{marginTop:"15px"}}>Welcome {props.name}</h4>
      <button style={{ color: "white", backgroundColor: "blue", borderRadius: "16px", width: "80px", height:"30px", marginTop:"10px" }} onClick={props.logout}>Logout</button>
    </div>
  )
}

export default App;

