import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
  
  useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch feedbacl
  const fetchFeedback = async () => {
    const response = await fetch("/feedback?_sort=id&_order=desc")
    const data = await response.json()

    setFeedback(data)
    setIsLoading(false)
  }

  //Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()
    
    setFeedback([data, ...feedback])
  }

  //Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter(item => item.id != id))
    }

    setFeedbackEdit({
      item: {},
      edit: false
    })
  }

  //Set feedbackItem to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //Update Feedback
  const updateFeedback = (id, updatedItem) => {
    setFeedback(feedback.map((item) => (item.id === id) ? {...item, ...updatedItem} : item))
  }

  //Reset feedbackEdit
  const cancelEdit = () => {
    setFeedbackEdit({
      item: {},
      edit: false
    })
  }

  return (
    <FeedbackContext.Provider 
      value={{
        feedback, 
        feedbackEdit,
        isLoading,
        deleteFeedback, 
        addFeedback, 
        editFeedback,
        updateFeedback,
        cancelEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
  
}

export default FeedbackContext