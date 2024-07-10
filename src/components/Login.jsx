import { useRef } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Login=()=>{
  const userName=useRef();
  const passwordId=useRef();
  const navigate=useNavigate();
  const handlOnClick=()=>{
    navigate("/");
  }
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const username = userName.current.value;
    const password = passwordId.current.value;
    const data={
      username:username,
      password:password,
    }
    try{
    const response= await axios.post("https://social-media-app-4-bm12.onrender.com/api/login", data)
    console.log(response);
        console.log(response.status);
        navigate("/app");
    }
    catch(error){
      console.log(error);
  alert('invalid username or password');
      console.log(error);
    }
  }
  return <>
  <center>
<div className="box1">
      <h1>Login page</h1>
      <div> <input type="text" className="ip" ref={userName} placeholder=' username'></input></div>
      <div><input type="password" className="ip" ref={passwordId} placeholder='password'></input></div>
      <div className="but">
     <span> <button type="button" className="btn btn-primary bt" onClick={handleOnSubmit}>Login</button></span>
     <span><button type="button" className="btn btn-success bat"onClick={handlOnClick} >SignUp</button></span>
      </div>
      </div>
     
      </center>

  </>
}
export default Login;