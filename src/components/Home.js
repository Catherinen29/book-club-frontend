
import { getAllBooks } from '../apis/BookApis'
import { deleteUser, getUser } from '../apis/UserApis'
import { useEffect, useState } from "react"
import "../App.css"
import EachBookDetails from './EachBookDetails'
import NewBook from './NewBook'
import Logout from './Logout'
import { useNavigate } from 'react-router'

export default function Home(props) {

    const isUserLoggedIn = props;
    const navigate = useNavigate()

    const [books, setBooks] = useState([])
    // const [currentUserName, setCurrentUserName] = useState({})

//  Get all books via Book APIs and save to above state variable.
useEffect(() => {
    getAllBooks()
    .then(books => books.json())
    .then(data => {
        setBooks(data)
        console.log(data)})
    .catch((error) => error.message)

}, [])

// const findUserName = () => {
//     // console.log(localStorage.getItem("currentUserId"))
//     getUser(parseInt(localStorage.getItem("currentUserId")))
//     // .then(response => console.log(JSON.parse(response)))
//     .then(data => setCurrentUserName(data))

//     // console.log(currentUserName)
// }

// Check through books array for each date, looking for the largest date
// const findCurrentBook = books.reduce((a, b) => {
//     return new Date(a.meeting_date) > new Date(b.meeting_date) ? a : b
// })

// console.log(findCurrentBook)

const deleteAccount = () => {
   
    deleteUser(parseInt(localStorage.getItem("currentUserId")))
    localStorage.removeItem("token")
    localStorage.removeItem("currentUserId")
    navigate('/')
}

return(
    <>
{/* <button onClick={findUserName}>Click</button> */}
{!localStorage.getItem("token") ? 
    <h1>Hello Readers</h1>
    :
    <h1>Hello again</h1>
}
{localStorage.getItem("token") ?
    <button onClick={deleteAccount} 
            type="button" class="btn btn-outline-dark btn-sm">
                Delete account</button>
    : null
}

{/* If user is logged in, show new book button */}
{!isUserLoggedIn ? 
    <div className='AddBook'>
        <NewBook />
    </div>
: null }
    
        {/* <div>Current book</div>
        <div>New book</div> */}
    <div class="border border-5 border-success 
            bg-danger-subtle p-4 m-4">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco 
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
    dolor in reprehenderit in voluptate velit esse cillum dolore eu 
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>

    <div class="container"> 
        <h2>All books</h2>
        <div class="row row-gap-4">
            {/* Map over all outputs from above call. */}
            {books.map((book, index) => <div class="col-md-4"><EachBookDetails 
                    book={book} key={book.id} index={index}
                    isUserLoggedIn={isUserLoggedIn} /></div>)}
         </div>
    </div>
    </>

    )
}