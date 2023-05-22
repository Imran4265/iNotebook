import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function SignUp() {
    let navigate=useNavigate();

    const [Credentials, setCredentials] = useState({name:"",email: "", password: ""})

    const onChange = (e) => {
        setCredentials({...Credentials, [e.target.name]: e.target.value})
    }
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, email, password } = Credentials;
    
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // add Authorization header
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
    
      const json = await response.json();
      console.log(json);
    
      if (json.success) {
        const token=json.token;
        localStorage.setItem('token', token);
        navigate("/");
      } else {
        alert("User already exists");
      }
    
            
    };
    
  return (
    <div>
        <div className="container">
            <h1>Register Yourself</h1>
        <form onSubmit={handleSubmit} >
<div className="form-group my-3">
    <label htmlFor="exampleInputName1">Name</label>
    <input type="text" className="form-control" id="name1"  name="name" aria-describedby="emailHelp" placeholder="Enter Name" onChange={onChange}/>
    
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email"     onChange={onChange}
/>
    
  </div>
  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"name='password' placeholder="Password"     onChange={onChange} minLength={5} required
/>
  </div>
{/*  <div className="form-group my-3">
    <label htmlFor="exampleInputPassword1">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword2"name='cpassword' placeholder=" Confirm Password"      minLength={5} required
  />
  </div>
  */}
  <button  type="submit" className="btn btn-primary my-3">Submit</button>
</form>
        </div>
    </div>
  )
}
