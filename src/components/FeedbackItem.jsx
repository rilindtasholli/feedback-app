import { FaTimes } from "react-icons/fa"
import { useContext } from 'react'
import PropTypes from "prop-types"
import Card from "./shared/Card"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackItem({ feedbackItem }) {
  const { deleteFeedback } = useContext(FeedbackContext)

  return (
    <Card>
      <div className="num-display">{feedbackItem.rating}</div>
      <button onClick={() => deleteFeedback(feedbackItem.id)} className="close">
        <FaTimes color="purple" />
      </button>
      <div className="text-display">{feedbackItem.text}</div>
    </Card>
  )
}

FeedbackItem.propTypes = {
  feedbackItem: PropTypes.object.isRequired,
}

export default FeedbackItem
