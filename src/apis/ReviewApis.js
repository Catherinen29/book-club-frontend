import axiosInstance from './AxiosInstance';

// GET request for reviews based on ID
export const getReviews = async(id) => {
    const response = await axiosInstance.get(
        `/books/${id}/reviews`, {
        headers: { "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token") 
                }            
        })
    // .then(response => console.log(response.data))
    .catch(error => console.log("THIS IS THE ERROR ***", error))
    
    return JSON.stringify(response.data)
}

// POST request to create a review
export const createOneReview = (reviewInfo, id) => {

    // Create an object using input data in the format required.
    const reviewDetails = JSON.stringify({
        "title": reviewInfo.title,
        "description": reviewInfo.description,
        "rating": parseInt(reviewInfo.rating),
        "user_id": parseInt(localStorage.getItem("currentUserId")),
        "book_id": parseInt(id)
    })
    console.log(reviewDetails)

    // POST request using new object with book details. 
    const response = axiosInstance.post(`/books/${id}/reviews`, reviewDetails, {
        headers: { "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token") 
        }
    })
    .then((response => console.log(response)))    

    return JSON.stringify(response.data)
}

// DELETE request to remove review from database
export const deleteOneReview = (id, reviewId) => {
    const response = axiosInstance.delete(`/books/${id}/reviews/${reviewId}`, {
        headers: { "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token") 
        }
        // .then(response => console.log(response))
    }) 
}