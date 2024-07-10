import { useRef } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


  
  function Signup(){
  
    const navigate=useNavigate();
    const userName=useRef();
  const passwordId=useRef();
  const userID=useRef();
  const handlOnClick=()=>{
    navigate("/login");
  }
    const handleOnSubmit = async (event) => {
      event.preventDefault();
      const emailId = userID.current.value;
      const username = userName.current.value;
      const password = passwordId.current.value;
     
       
      const data={
        username:username,
        emailId:emailId,
        password:password,
      }
    try{
     const response=await axios.post("https://social-media-app-4-bm12.onrender.com/api/signup", data)
     
        console.log(response);
        console.log(response.status);
          
        alert('successfully signed in');
        navigate("/app");
        
    }
    catch(error){
      const err=  JSON.parse(error.config.data);
         if(err.username===""){
          alert('empty username');
         }
         if(err.password===""){
          alert('empty password');
         }
         if(err.username!==""&&err.password!==""){
     if(error.request.status===500){
        alert('user already registered');
      }
    }
       console.log(error);
      
     }
    }
  
    return <>
    <center>
    <div className="box">
      <h1>SIGN UP</h1>
      <div><input type="email" className="ip" ref={userID} placeholder='Enter your EmailID'></input></div>
      <div> <input type="text" className="ip" ref={userName} placeholder=' username'></input></div>
      <div><input type="password" className="ip" ref={passwordId} placeholder='password'></input></div>
      <button type="button" className="btn btn-primary bt" onClick={handleOnSubmit}>SignUp</button>
      <button type="button" className="btn btn-success bat"onClick={handlOnClick} >Login</button>
        
      </div>
      </center>
    
    </>
  }
  export default Signup;