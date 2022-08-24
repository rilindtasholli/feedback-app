import { FaCheck, FaTimes } from 'react-icons/fa'
import { useState, useContext, useEffect, useInsertionEffect } from "react"
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [text, setText] = useState("")
  const [rating, setRating] = useState(8)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")

  const { addFeedback, feedbackEdit, updateFeedback, cancelEdit } = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit == true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      setMessage(null)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const validate = () => {
    if(text === ""){
      setBtnDisabled(true)
      setMessage(null)
    }else if(text !== "" && text.split(' ').join('').length < 10){
      setBtnDisabled(true)
      setMessage("Text must be at least 10 characters")
    }else{
      setMessage(null)
      setBtnDisabled(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(text.trim().length > 10){
      const newFeedBack = {
        text,
        rating
      }

      if(feedbackEdit.edit === true){
        updateFeedback(feedbackEdit.item.id, newFeedBack)
      }else{
        addFeedback(newFeedBack)
      }

      resetForm()
    }
  }

  const resetForm = () => {
    setText('')
    setBtnDisabled(true)
    setMessage(null)
    cancelEdit()
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our service with us?</h2>
        
        <RatingSelect setRating={setRating} selected={rating}/>

        {feedbackEdit.edit && <div className='edit-group'>
          <p>Edit Item: </p>
          <button onClick={resetForm} className='cancel-edit'>
            Cancel
          </button>
        </div>
        }

        <div className="input-group">
          <input
            onChange={handleTextChange}
            onKeyUp={validate}
            type="text"
            placeholder="Write a review"
            value={text || ""}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            <FaCheck/>
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
