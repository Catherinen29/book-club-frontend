
import { removeUserToken } from "../apis/UserApis"
import { useNavigate } from "react-router"

export default function Logout ({setIsUserLoggedIn}) {

const navigate = useNavigate()

// End user session & navigate to home page.
function logUserOut() {
    removeUserToken()
    setIsUserLoggedIn(false)
    navigate('/')
}
return(

    <button onClick={logUserOut} className="button">Log out</button>
    )
}