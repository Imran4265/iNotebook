import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    let navigate=useNavigate();

    const [Credentials, setCredentials] = useState({email: "", password: ""})

    const onChange = (e) => {
        setCredentials({...Credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },      
            body: JSON.stringify({
                email: Credentials.email,
                password: Credentials.password
            })
        })
        const json=await response.json();
        console.log(json);
        if(json.success){
// assuming the response from the login API contains a token field
const  token  = json.token;
localStorage.setItem('token', token);
            console.log("debugging");
            console.log(localStorage.getItem("token"));
            navigate("/");
        }
        else{
            alert("Invalid Credentials");
        }
    }
        
    return (
        <div>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            value={Credentials.email} 
                            id="exampleInputEmail1" 
                            onChange={onChange} 
                            name="email"
                            aria-describedby="emailHelp" 
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            value={Credentials.password} 
                            onChange={onChange} 
                            name="password"
                            id="exampleInputPassword1" 
                            placeholder="Password "
                        />
                    </div>
                    <button type="submit" className="btn btn-primary my-3">Submit</button>
                </form>
            </div>
        </div>
    )
}
