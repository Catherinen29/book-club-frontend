import { useEffect, useState } from "react"
import { getOneBook, editOneBook, deleteBook } from "../apis/BookApis"
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { getReviews } from "../apis/ReviewApis"
import EachReview from "./EachReview"
import EditBookForm from "./EditBookForm"
import NewReviewForm from "./NewReviewForm"

export default function BookPage({isUserLoggedIn}) {

const [ singleBook, setSingleBook ] = useState({})
const [ editedBook, setEditedBook ] = useState({})

const [ reviewList, setReviewList ] = useState([])

const [ showForm, setShowForm ] = useState(false)

// Get book id from url param.
const { id } = useParams()
// console.log(id)
const navigate = useNavigate()


const getBook = () => {
    // Call book id to get individual book details using book id. 
    getOneBook(id)
    // .then((book) => book.json())
    .then((data) => {
        // Set above state to hold book details. 
        setSingleBook(data.data)
        setEditedBook(data.data)
        console.log(data)
    })
}

// Get reviews for this book.
const bookReviews = () => {
    // console.log(id)
    getReviews(id)
    .then(review => {
        let reviewData = JSON.parse(review)
        setReviewList(reviewData)
        // console.log(reviewData)
    })
     .catch((error) => console.log(error))

}

// Run these functions on page load and everytime the id parameter changes.
useEffect(() => { 
    getBook(id) 
    bookReviews(id)
}, [])

// Call the delete book API with the current id as a param. 
const deleteOneBook = () => {
    deleteBook(id)
    navigate("/")
}

const editFormBtn = () => {
    setShowForm(!showForm)
}

const [averageRating, setAverageRating] = useState(0)
const [ showRating, setShowRating ] = useState(false)

// Get average rating
const findAverage = () => {

    if (reviewList.length > 0) {
        // For each object in the array, 
        // get the accumulative sum of each rating
        const sum = reviewList.reduce(function (a, b) {
            return {rating: a.rating + b.rating}})
        // console.log(sum)

        const average = ((sum.rating) / reviewList.length).toFixed(1)
        console.log(average)

        setAverageRating(average)
        }
        setShowRating(!showRating)
    }

// if (!reviewList.length) return "Log in or sign up to see this page!"

return (
<div className="wholeBook">


        <h1 className="bookTitle">{singleBook.title}</h1>
    <div className="totalBookDetails">
        <div className="bookDetails">
            <div>Written by: {singleBook.author}</div>
            <div>Genre: {singleBook.genre}</div>
            <div>Published: {singleBook.publishedOn}</div>
            <br></br>
        </div>    
            {!showRating ?
            <button onClick={findAverage} className="btnTwo">Show average rating</button>     
            : null}
            
            {showRating ? 
            <div className="rating">{averageRating}/5</div>
            : null}
            
            <br></br>
            <br></br>
        <div className="meetingDetails">
            <h4>Meeting details</h4>
            <div>Date: {singleBook.meeting_date}</div>
            <div>Location: {singleBook.meeting_location}</div>

            <br></br>
            <div className="bookBtns">
                <button onClick={deleteOneBook} className="deleteBtn">Delete</button>

                <button onClick={editFormBtn} className="deleteBtn">Edit</button>
            </div>
        </div>
    </div>
        <div className="formContainer">
        {showForm ? 
            <EditBookForm 
                singleBook={singleBook}
                setSingleBook={setSingleBook}
                editedBook={editedBook}
                setEditedBook={setEditedBook}
                setShowForm={setShowForm}
                showForm={showForm}
                id={id} />
            : null}

        </div>

    <div className="reviewContainer">
        <h2>Reviews</h2>

            {reviewList.length > 0 ? 
                reviewList.map((review) => 
                <EachReview  review={review} id={id} key={review.id} /> 
                ) : null
            }
        
        <NewReviewForm />
    </div>
</ div>
    )
}
