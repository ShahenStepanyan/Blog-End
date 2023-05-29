import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Create() {
    const [inputData, setInputData] = useState({
        title: '',
        body: '',
        creator: localStorage.getItem('token')
    })
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3002/post', inputData)
        .then(res => {
            alert("Data Posted Successfully!")

            navigate('/home')
        })
    }
  return (
    <div>
        <div style={{textAlign:"center"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">title</label>
                    <br/>
                    <input type="text" name='title'

                    onChange={e => setInputData({...inputData, title: e.target.value})}/>
                </div>
                <div>
                    <label htmlFor="text">body</label>
                    <br/>
                    <input type="text" name='body'
                    onChange={e => setInputData({...inputData, body: e.target.value})}/>
                </div><br />
                <button className='btn btn-info'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create