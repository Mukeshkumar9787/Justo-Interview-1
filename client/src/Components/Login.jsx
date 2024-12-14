import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LOGIN_API } from '../constant';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(LOGIN_API, {username, password})
            .then((response) => {
                if(response.status == 200){
                    sessionStorage.setItem("token",response.data.token);
                    navigate("/home")
                }else{
                    console.log(response?.message);
                }
            }).catch((error) => {
                window.alert(error.response.data.message)
                console.log(error.response.data.message)
            })
    }
    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center", placeContent: "center", flexDirection: "row" }}>
            <form onSubmit={handleSubmit} style={{display: "grid",flexDirection:"col", 
                justifyContent: "center" , }}>
                <div style={{textAlign: "center",}}>Login</div>
                <div style={{display: "flex" , gap: "1px" , padding:"2px"}}>
                    <label htmlFor="">Username</label>
                    <input type="text" required value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                </div>
                <div style={{display: "flex" , gap: "2px" , padding:"px"}}>
                    <label htmlFor="">Password</label>
                    <input type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                        type='submit'
                        style={{ backgroundColor: "blue", color: "white", padding: "1px" }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login