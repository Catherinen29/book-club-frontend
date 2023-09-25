import axiosInstance from './AxiosInstance';

// GET request for all books
export const getAllBooks = () => {
    return axiosInstance.get(`/books`)
}

// GET request for one book, by ID
export const getOneBook = (id) => {
    return axiosInstance.get(`/books/${id}`)
}

// POST request to create book
export const createOneBook = (bookInfo) => {
    // Create an object using input data in the format required.
    const bookDetails = JSON.stringify({
        "title": bookInfo.title,
        "author": bookInfo.author,
        "genre": bookInfo.genre,
        "publishedOn": bookInfo.publishedOn,
        "meeting_date": bookInfo.meeting_date,
        "meeting_location": bookInfo.meeting_location,
        "user_id": parseInt(localStorage.getItem("currentUserId"))
    })
    console.log(bookDetails)

    // POST request using new object with book details. 
    const response = axiosInstance.post(`/books`, bookDetails, {
        headers: { "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") 
        }
    })
    .then((response => console.log(response)))

}

// PATCH request to edit an existing book
// Updated book details and book id are required. 
export const editOneBook = (bookInfo, id) => {
    const bookDetails = JSON.stringify({
        "title": bookInfo.title,
        "author": bookInfo.author,
        "genre": bookInfo.genre,
        "publishedOn": bookInfo.publishedOn, 
        "meeting_date": bookInfo.meeting_date,
        "meeting_location": bookInfo.meeting_location,
        "user_id": parseInt(localStorage.getItem("currentUserId"))
    })

    console.log(bookDetails)

    // Using above book details to make patch request. 
    const response = axiosInstance.patch(`/books/${id}`, bookDetails, {
        headers: { "Content-Type": "application/json"
        ,
        "Authorization": localStorage.getItem("token") 
        }
    })
    .then(response => console.log(JSON.stringify(response)))
}

// DELETE request to remove book from database
export const deleteBook = (id) => {
    const response = axiosInstance.delete(`/books/${id}`, {
        headers: { "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") 
        }
        // .then(response => console.log(response))
    })
}