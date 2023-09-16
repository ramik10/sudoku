import React, {useState} from "react";
import Game from "./screens/Game/Game";
import "./App.css";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import jwtDecode from "jwt-decode";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <div>
      {!loggedIn&&<GoogleLogin
         onSuccess={credentialResponse => {
          console.log(loggedIn);
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
      </div>
      {loggedIn && <LoggedIn key= {email} image= {image} name={name} Logout={() => {
        googleLogout();
        setLoggedIn(false);
        setName("");
        setImage("");
        setEmail("");
      }} />}
    <div className="App">
      <Game key={email} name={name} image={image} />
    </div>
    </>
  );
};

export default App;

function LoggedIn(props){
  return (
    <div style={{marginLeft:"10px"}}>
      <img style={{borderRadius:"50px", width:"50px", marginLeft:"10px"}} src={props.image} alt="profile" />
      <h1>Welcome {props.name}</h1>
      <button style={{color:"white", backgroundColor:"blue", borderRadius:"16px", width:"80px"}} onClick={props.Logout}>Logout</button>
    </div>
  )
}