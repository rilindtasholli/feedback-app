import { useState } from "react"
import { useContext } from 'react'
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
  const [text, setText] = useState("")
  const [rating, setRating] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState("")

  const { addFeedback } = useContext(FeedbackContext)

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

      addFeedback(newFeedBack)
      
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
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
