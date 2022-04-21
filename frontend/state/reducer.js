// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import * as types from './action-types'


const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    case types.MOVE_CLOCKWISE:
      if(state < 5 ){
        return state+1
      } else {
        return state=0
      }
    case types.MOVE_COUNTERCLOCKWISE:
      if(state > 0 ){
        return state-1
      } else {
        return state=5
      }
    default:
      return state
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
