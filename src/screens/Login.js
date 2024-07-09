import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function Login() {

    const [credential, setCredential] = useState({ password: "", email: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: credential.email, password: credential.password })
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem("userEmail" , credential.email);
                localStorage.setItem("authToken" , json.authToken);
                console.log(localStorage.getItem("authToken"));
                navigate('/');
            }
        }
        catch (error) {
            console.log('Error creating user:', error);
            alert('An error occurred while creating your account. Please try again later.');
        }
    }

    const onChange = (events) => {
        setCredential({ ...credential, [events.target.name]: events.target.value });
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">Create user</Link>
                </form>
            </div>
        </>
    )
}
