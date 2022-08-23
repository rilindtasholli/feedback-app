import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [feedback, setFeedbackItem] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 10
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 8
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 4
    }
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
  
  //Add Feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)
    setFeedbackItem([newFeedback, ...feedback])
  }

  //Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedbackItem(feedback.filter(item => item.id != id))
    }
  }

  //Set feedbackItem to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return (
    <FeedbackContext.Provider value={{feedback, deleteFeedback, addFeedback, editFeedback, feedbackEdit}}>
      {children}
    </FeedbackContext.Provider>
  )
  
}

export default FeedbackContext