import { useState } from "react";
import { createOneBook } from "../apis/BookApis";
import { useNavigate } from "react-router";

export default function NewBook({isUserLoggedIn}) {
    // debugger;
    const navigate = useNavigate()

    const [ newBook, setNewBook ] = useState({
        title: "",
        author: "",
        genre: "",
        publishedOn: "",
        meeting_date: "",
        meeting_location: ""
    })

    function handleInput(e) {
        setNewBook({...newBook, [e.target.name]: e.target.value})
        console.log(e.target.value)
    }

    // Create a new book & navigate to home page. 
    function submitNewBook(e){
        
        e.preventDefault()
        createOneBook(newBook)

        setNewBook({
            title: "",
            author: "",
            genre: "",
            publishedOn: "",
            meeting_date: "",
            meeting_location: ""
        })
        navigate('/')
    }

return (

<div className="formContainer">
    <div className="newBookForm">
        <form>
            <h1>Add our next book</h1>
            
            <br></br>

            <h3>Book details</h3>
            <div className="fields">
            <label className="field">Title</label>
            <input
                className="input-field"
                name="title"
                value={newBook.title}
                onChange={handleInput}
                autoComplete="off"
            />
            </div>

            <div className="fields">
            <label className="field">Author</label>
            <input
                className="input-field"
                name="author"
                value={newBook.author}
                onChange={handleInput}
                autoComplete="off"
            />
            </div>

            <div className="fields">
            <label className="field">Genre</label>
            <input
                className="input-field"
                name="genre"
                value={newBook.genre}
                onChange={handleInput}
                autoComplete="off"
            />
            </div>

            <div className="fields">
            <label className="field">Published:</label>
            <input
                className="input-field"
                type="date"
                name="publishedOn"
                value={newBook.publishedOn}
                onChange={handleInput}
                autoComplete="off"
            />
            </div>

            <h3>Meeting details</h3>

            <br></br>

            <div className="fields">
            <label className="field">Meeting date</label>
            <input
                className="input-field"
                type="date"
                name="meeting_date"
                value={newBook.meeting_date}
                onChange={handleInput}
                autoComplete="off"
            />
            </div>

            <div className="fields">
            <label className="field">Meeting Location</label>
            <input
                className="input-field"
                name="meeting_location"
                value={newBook.meeting_location}
                onChange={handleInput}
                autoComplete="off"
            />
            </div>

            <button onClick={(e) => {
                submitNewBook(e)
            }}>Create book </button>
        </form>
    </div>
</div>
    )
}