import axios from 'axios';
import React from 'react'
import { useEffect , useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



function Update() {

    const {id} = useParams();

    const [inputData, setInputData] = useState({
        id: id,
        title: '',
        body: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3002/post/'+id)
        .then(res => setInputData(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:3002/post/'+id , inputData)
        .then(res => {
            alert("Data Updated Successfully!")
            navigate('/home')
        })
    }


  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
        <div className='w-50 border bg-secondary text-white p-5'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input type="number" disabled name='id' className='form-control' value={inputData.id}
                    />
                </div>
                <div>
                    <label htmlFor="name">Title</label>
                    <input type="text" name='name' className='form-control' value={inputData.title}
                    onChange={e => setInputData({...inputData, title: e.target.value})}/>
                </div>
                <div>

                    <label htmlFor="email">Body</label>
                    <input type="text" name='email' className='form-control' value={inputData.body}
                    onChange={e => setInputData({...inputData, body: e.target.value})}/>
                </div><br />
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update