import { useState, useEffect } from "react"
import { createUserToken } from "../apis/UserApis"
import { useNavigate } from "react-router";


export default function Login({
    isLoggedIn, setIsUserLoggedIn, currentUserId, setCurrentUserId}) {


const [user, setUser] = useState({
        email: "",
        password: ""
    })

const navigate = useNavigate()

function handleInput(e){
    setUser({...user, [e.target.name]: e.target.value})
}

// Create a session using user input & navigate to the home page. 
function findUser(e){
    e.preventDefault()
    createUserToken(user, setCurrentUserId)
    console.log(user)
    isLoggedIn()
    setIsUserLoggedIn(true)
    navigate('/')
}


return (
<div className="formContainer">
    <div className="loginForm">

        <h2>Log in</h2>

        <form>
            <div className="fields">
                <label className="field">Email</label>
                <input
                    className="input-field"
                    name='email'
                    value={user.email}
                    onChange={handleInput}
                    autoComplete="off"
                />
            </div>

            <div className="fields">
                <label className="field">Password</label>
                <input
                    className="input-field"
                    name='password'
                    type='password'
                    value={user.password}
                    onChange={handleInput}
                    autoComplete="off"
                />
            </div>

            <button className="button" onClick={findUser}>Log in</button>
        </form>
    </div>
</div>
)

}