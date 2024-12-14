import React, { useEffect, useState } from 'react'
import { USER_API_GET_TIME } from '../constant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GetTime = () => {
    const [time, setTime] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(USER_API_GET_TIME,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionStorage.getItem("token")
                },
            })
            .then((response) => {
                if(response.status == 200){
                    setTime(response.data.time);
                }else{
                    console.log(response?.message);
                }
            }).catch((error) => {
                navigate("/");
            })
    },[])
    return (
        <div>
            {JSON.stringify(time)}
        </div>
    )
}

export default GetTime