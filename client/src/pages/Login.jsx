import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const passwordRef = useRef('');
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const {data}=await axios.post("http://localhost:5000/api/auth/login",{
            email:email,
            password:passwordRef.current.value
        })
        console.log("response=>",data);
        
        const userRole = data.role;
    
        localStorage.setItem('token',data.token);
        localStorage.setItem('isLogged','true')
        localStorage.setItem('role',userRole);
        
        if(userRole==='Project Manager' || userRole==='Admin'){
            navigate('/Profile');
        } else {
            navigate('/dashboard')
        }
    }catch(err){
        console.log(err.response);
    }
  };

  return(
  <>
    <form onSubmit={handleSubmit}>
      <label> Email:</label>
      <input type="email" id="email" placeholder="Enter your email" required value={email} onChange={handleEmail}/>
      <label> Password:</label>
      <input type="password" id="password" placeholder="Enter your password" required ref={passwordRef} />
      <button type="submit">Login</button>
    </form>
  </>
  )
}

export default Login;

