import { useState, useContext, useEffect, useInsertionEffect } from "react"
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [text, setText] = useState("")
  const [rating, setRating] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit == true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
      console.log(feedbackEdit)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const validate = () => {
    if(text === ""){
      setBtnDisabled(true)
      setMessage(null)
    }else if(text !== "" && text.trim().length < 10){
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

      setText('')
      setBtnDisabled(true)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate our service with us?</h2>
        
        <RatingSelect select={(rating) => {setRating(rating)}}/>

        <div className="input-group">
          <input
            onChange={handleTextChange}
            onKeyUp={validate}
            type="text"
            placeholder="Write a review"
            value={text || ""}
          />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
