import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setname] = useState('');
    const [role, setrole] = useState('');
    const [email, setemail] = useState('');
    const passwordRef = useRef('');
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setname(e.target.value);
    }

    const handleRole = (e) => {
        setrole(e.target.value)
    }

    const handleEmail=(e)=>{
        setemail(e.target.value)
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            const {data}=await axios.post("http://localhost:5000/auth/register",{
                name:name,
                email:email,
                password:passwordRef.current.value,
                role:role
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('role', data.user.role);
            navigate('/');
        } catch (error) {
            console.log(error.response);
        }
    }
  return (
    <>
      <form  onSubmit={handleSumbit}>
          <label>Full Name</label>
          <input
            type="text" placeholder="Enter your full name" value={name}
            onChange={handleNameChange}
          />
        
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
          />
        
          <label >Password</label>
          <input
            type="password"
            placeholder="Create a password"
            ref={passwordRef}
          />
        
          <label>Role</label>
          <select
            value={role}
            onChange={handleRole}
          >
            <option value="">Select your role</option>
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Admin">Admin</option>
          </select>

        <button type="submit">
          Create Account
        </button>
      </form>
    </>
  )
}

export default Register;