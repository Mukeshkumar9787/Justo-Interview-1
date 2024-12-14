import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_API_GENERATE_ONE_TIME_LINK, USER_API_REVOKE } from '../constant';

const GenerateLink = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        axios.post(USER_API_GENERATE_ONE_TIME_LINK, {username})
            .then((response) => {
                if(response.status == 200){
                    window.open(response?.data?.link)
                }else{
                    console.log(response?.message);
                }
            }).catch((error) => {
                console.log(error?.response?.data?.message)
            })
    }
    return (
        <div style={{ display: "flex", width: "100%", justifyContent: "center", placeContent: "center", flexDirection: "row" }}>
            <form onSubmit={handleSubmit} style={{display: "grid",flexDirection:"col", 
                justifyContent: "center" , }}>
                <div style={{textAlign: "center",}}>Enter User To Generate a One Time Link</div>
                <div style={{display: "flex" , gap: "1px" , padding:"2px"}}>
                    <label htmlFor="">Username</label>
                    <input type="text" required value={username} onChange={(e)=>{setUsername(e.target.value)}} />
                </div>
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                        type='submit'
                        style={{ backgroundColor: "blue", color: "white", padding: "1px" }}>
                        Generate
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GenerateLink