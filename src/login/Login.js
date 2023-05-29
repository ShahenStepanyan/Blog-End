import React, {useState} from 'react';
import { useNavigate} from "react-router-dom";



function Login(props) {

    const [username, userupdate] = useState('')
    const [password, passupdate] = useState('')
    const navigate = useNavigate();
    const ProceedLogin = (e) => {
        e.preventDefault()
        if(validate()) {
            fetch(" http://localhost:3001/user/" + username).then((res) => {
                return res.json()
            }).then((resp) => {
                console.log(resp)
                if(Object.keys(resp).length === 0) {
                    alert('Please Enter Valid Email')
                }else {
                    if(resp.password === password){
                        localStorage.setItem('token', username)
                        navigate('/home')

                    }else{
                        alert('Please Enter Valid Password')
                    }
                }

            })
        }
    }



    const validate = () => {
        let result = true;
        if(username === '' || username === null) {
            result = false

            alert('Please Enter Email ')
        }
        if(password === '' || password === null) {
            result = false
            alert('Please Enter Password ')
        }
        return result
    }


    return (
        <div style={{textAlign: "center"}}>

            <h1>React Project Media</h1>
            <form onSubmit={ProceedLogin} className="container" >
                <input value={username} onChange={(e) => {userupdate(e.target.value)}} type="text"/>
                <br/>
                <input value={password} onChange={(e) => {passupdate(e.target.value)}} type="password"/>
                <br/>
                <button type="submit">Log In</button>

            </form>
        </div>
    );
}


export default Login;
