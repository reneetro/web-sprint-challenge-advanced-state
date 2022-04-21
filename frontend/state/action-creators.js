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

export function selectAnswer(num) { 
  return {
    type: types.SET_SELECTED_ANSWER,
    payload: num
  }
}

export function setMessage() { }

export function setQuiz() { 

}

export function inputChange() { }

export function resetForm() { }

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
      const answer2 = res.data.answers[1].text
      dispatch({type: types.SET_QUIZ_INTO_STATE, payload: {question, answer1, answer2}})
    })
    .catch(err => {
      debugger
    })
  }
}
export function postAnswer() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
