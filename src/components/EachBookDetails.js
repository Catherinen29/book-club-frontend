import { Link } from "react-router-dom";


export default function EachBookDetails({book, isUserLoggedIn}) {

    // For each book API call on Homepage, show the following:
    return(
        // <div>
            <div className="eachBookDetails">
                <div>{book.title}</div>
                <br></br>
                <div>By {book.author}</div>

                <br></br>

                {isUserLoggedIn ? 
                    <Link to={`/books/${book.id}`} 
                    className='linkBtn'>
                        Show me more!</Link>
                : null}  

            </div>
        // </div>
    )
}