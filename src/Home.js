import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'




function Home() {



    const [data, setData] = useState([])


    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:3002/post')
            .then(res => {

                return setData(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function tes(value) {
        let tok = localStorage.getItem('token')
        if(tok === value){
            return <a>Update</a>
        }
    }
    function  tesdel(value) {
        let tok = localStorage.getItem('token')
        if(tok === value) {
            return <a>Delete</a>
        }
    }
    const [currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = data.slice(firstIndex,lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage)
    const numbers = [...Array(npage + 1).keys()].slice(1)

    return (
            <div className='container '>


                <h2>Blog</h2>
                <Link to="/create" className='btn btn-success my-3'>Create +</Link>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>title</th>
                        <th>body</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((d, i) => (
                        <tr key={i}>
                            <td style={{border: '1px solid black'}}>{d.title}</td>
                            <td style={{border: '1px solid black'}}>{d.body}</td>

                            <td>
                                <Link className='text-decoration-none btn btn-sm btn-success' to={`/update/${d.id}`}>{tes(d.creator)}</Link>
                                <span> </span>
                                <Link className='text-decoration-none btn btn-sm btn-danger'
                                        onClick={e => handleDelete(d.id)}>{tesdel(d.creator)}</Link>
                                <span> </span>
                                <Link className='text-decoration-none btn btn-sm btn-primary'
                                      to={`/read/${d.id}`}>Read</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                    <nav>
                        <ul style={{display: "inline"}}>
                            {
                                numbers.map((n,i) => {
                                    return (
                                        <>
                                        <li style={{display: "inline", border: "1px solid black", cursor:"pointer"}} key={i} onClick={() => changeCPage(n)}>
                                            {n}
                                        </li>
                                         <span> </span>
                                      </>
                                    );
                                })
                            }
                        </ul>
                    </nav>
            </div>
        )


        function handleDelete(id) {
            const confirm = window.confirm("Do you like to Delete?");
            if (confirm) {
                axios.delete('http://localhost:3002/post/' + id)
                    .then(res => {
                        alert("Record Deleted");
                        navigate('/home')
                        window.location.reload()
                    })
            }
        }
     function changeCPage(id) {
        setCurrentPage(id)
    }



}
export default Home