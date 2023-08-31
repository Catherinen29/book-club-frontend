
import { getAllBooks } from '../apis/BookApis'
import { deleteUser, getUser } from '../apis/UserApis'
import { useEffect, useState } from "react"
import "../App.css"
import EachBookDetails from './EachBookDetails'
import NewBook from './NewBook'
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";

export default function Home({isUserLoggedIn, currentUserId}) {

    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [currentUserName, setCurrentUserName] = useState({})

//  Get all books via Book APIs and save to above state variable.
useEffect(() => {
    getAllBooks()
    .then(response => { setBooks(response.data) })

    .catch((error) => error.message)
    
    // console.log("Local storage id:", localStorage.getItem("currentUserId"))
    // console.log(!!currentUserId)
    // console.log(isUserLoggedIn)
    // if (localStorage.getItem("token")) {
    //     findUserName()
    // }
    if (isUserLoggedIn && currentUserId){
        findUserName()
    }
}, [currentUserId])

// Get current user details and set data into currentUserName state.
const findUserName = () => {
    getUser(currentUserId)
    getUser(localStorage.getItem("currentUserId"))
    // .then(response => console.log(response))
    .then(response => setCurrentUserName(response))
}

// Check through books array for each date, looking for the largest date
const findCurrentBook = books.reduce((a, b) => {
    return new Date(a.meeting_date) > new Date(b.meeting_date) ? a : b
}, {})

const deleteAccount = () => {
   
    deleteUser(parseInt(localStorage.getItem("currentUserId")))
    localStorage.removeItem("token")
    localStorage.removeItem("currentUserId")
    navigate('/')
}

return(
<div className='home'>
    <div className='welcome'>
        {!isUserLoggedIn ? 
            <h1>Hello Readers</h1>
            :
            <h1>Hello again {currentUserName.username}</h1>
        }  
    </div>

    <div className="homeDetails">   
        <div className="currentBookContainer">
            <h2 className="currentHeading">Our current book</h2>
            <div className='currentBook'>
                <h3>{findCurrentBook.title}</h3>
                <p>{findCurrentBook.author}</p>
                <br></br>
                <p><strong>Meeting: </strong>{findCurrentBook.meeting_date}</p>
                <p><strong>Location: </strong>{findCurrentBook.meeting_location}</p>
                {isUserLoggedIn ? 
                <div><Link to={`/books/${findCurrentBook.id}`} 
                        className='linkBtn'>
                            More</Link></div>
                : null}
            </div>

        </div>
    { isUserLoggedIn &&
        <div className="userDetails">
            <h3>My details</h3>
            <div><strong>Username: </strong>{currentUserName.username}</div>
            <div><strong>First name: </strong>{currentUserName.firstname}</div>
            <div><strong>Last name: </strong>{currentUserName.lastname}</div>
            <div><strong>Email: </strong>{currentUserName.email}</div>


            <button onClick={deleteAccount} 
                    type="button" className="deleteBtn">
            Delete account</button>
        </div>
    }
    </div> 

    <div> 
        <h2 className='allBooksHeader'>All books</h2>
        <div class="allBooksContainer">
            {/* Map over all outputs from above call. */}
            {books.map((book, index) => <div><EachBookDetails 
                    book={book} key={book.id} index={index}
                    isUserLoggedIn={isUserLoggedIn} /></div>)}
         </div>
    </div>

</div>

    )
}