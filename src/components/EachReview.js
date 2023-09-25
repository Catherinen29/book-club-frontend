import { useNavigate } from "react-router"
import { deleteOneReview } from "../apis/ReviewApis"

export default function EachReview({review, id}) {

    const navigate = useNavigate()

    const deleteReview = () => {
        deleteOneReview(id, review.id)
    }

return (

// For each review, show the following details:
    <div className="eachReview">
        <div className="reviewDetails">
            <h4>{review.title}</h4>
            <p>{review.description}</p>
            <p>Rating: <strong>{review.rating}/5</strong></p>
        </div>

        <button onClick={deleteReview} 
        type="button" className="deleteReviewBtn">DELETE</button>
    </div>

    )
}