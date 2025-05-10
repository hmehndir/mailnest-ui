import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { setAuthUser } from '../redux/appSlice';
import './Login.css';

const Login = () => {

    const [input, setInput] = useState({
        email:"",
        password:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
        try {
            const res = await axios.post("https://hmail-service.vercel.app/api/v1/user/login", input, {
                headers:{
                    'Content-Type':"application/json"
                },
                withCredentials:true
            });

            if(res.data.success){
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="login-container">
          <form onSubmit={submitHandler} className="login-form">
            <div className="brand">
            <img src="../src/assets/logo.webp" alt="MailNest" className="brand-icon"/>
            </div>
            <h1>Login</h1>
            <input name="email" type="email" placeholder="Email" onChange={changeHandler} value={input.email} />
            <input name="password" type="password" placeholder="Password" onChange={changeHandler} value={input.password} />
            <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
        </div>
      );
      
}

export default Login