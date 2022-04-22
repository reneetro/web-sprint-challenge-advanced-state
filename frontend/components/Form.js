import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const {inputChange, form, postQuiz} = props
  const onChange = evt => {
    const { id, value } = evt.target
    inputChange(id, value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
  }

  const checkDisabled = () => {
    if(form.newFalseAnswer.trim().length > 1 && form.newTrueAnswer.trim().length > 1 && form.newQuestion.trim().length > 1){
      return false
    }else{
      return true
    }
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={checkDisabled()} onClick={() => postQuiz(form.newQuestion, form.newFalseAnswer, form.newTrueAnswer)}>Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
