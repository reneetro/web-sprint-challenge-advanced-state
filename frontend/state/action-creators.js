import * as types from './action-types';
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return{
    type: types.MOVE_CLOCKWISE
  }
 }

export function moveCounterClockwise() { 
  return{
    type: types.MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer(id) { 
  return {
    type: types.SET_SELECTED_ANSWER,
    payload: id
  }
}

export function setMessage() { 
  return {
    type: types.SET_INFO_MESSAGE
  }
}

export function setQuiz() { 

}

export const inputChange = (id, value) => {
  return {
    type: types.INPUT_CHANGE,
    payload: { id, value},
  }
}

export function resetForm() {
  return {
    type: types.RESET_FORM,
  }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state

    axios.get('http://localhost:9000/api/quiz/next')
    .then(res => {
      const question = res.data.question
      const answer1 = res.data.answers[0].text
      const answer1Id = res.data.answers[0].answer_id
      const answer2 = res.data.answers[1].text
      const answer2Id = res.data.answers[1].answer_id
      const quizId = res.data.quiz_id
      dispatch({type: types.SET_QUIZ_INTO_STATE, payload: {question, answer1, answer2, quizId, answer1Id, answer2Id}})
    })
    .catch(err => {
      debugger
    })
  }
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    const submission = {
       "quiz_id": `${quizId}`, "answer_id": `${answerId}`
    }
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', submission)
      .then(res => {
        dispatch({type: types.SET_SELECTED_ANSWER, payload: null})
        dispatch({type: types.SET_INFO_MESSAGE, payload: res.data.message})
        dispatch(fetchQuiz())
      })
      .catch(err => {
        debugger
      })
      
  }
}
export function postQuiz(question, trueAnswer, falseAnswer) {
  return function (dispatch) {
    const newQuestion = {
      "question_text": `${question}`, 
      "true_answer_text": `${trueAnswer}`,
      "false_answer_text": `${falseAnswer}` 
    }
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', newQuestion)
      .then(res => {
        dispatch({type: types.SET_INFO_MESSAGE, payload: `Congrats: "${res.data.question}" is a great question!`})
        dispatch(resetForm())
      })
      .catch(err =>{
        debugger
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
