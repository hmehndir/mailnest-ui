import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast';
import './Signup.css';
import logo from '../assets/logo.webp';

const Signup = () => {
    const [input, setInput] = useState({
        fullname:"",
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://hmail-service.onrender.com/api/v1/user/register", input, {
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });
            if(res.data.success){
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="signup-container">
          <form onSubmit={submitHandler} className="signup-form">
            <div className="brand">
            <img src= {logo} alt="MailNest" className="brand-icon" />
              {/* <span className="brand-name">MailNest</span> */}
            </div>
            <h1>Signup</h1>
            <input name="fullname" type="text" placeholder="Username" onChange={changeHandler} value={input.fullname} />
            <input name="email" type="email" placeholder="Email" onChange={changeHandler} value={input.email} />
            <input name="password" type="password" placeholder="Password" onChange={changeHandler} value={input.password} />
            <button type="submit">Signup</button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      );
}

export default Signup