import React, { useEffect }  from 'react'
import {connect} from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
const {quiz, selectAnswer, fetchQuiz, selectedAnswer } = props
console.log(props)

useEffect(() => {
  fetchQuiz()
},[])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={selectedAnswer === 1 ? 'answer selected' : 'answer'}>
                {quiz.answer1}
                <button onClick={() => selectAnswer(1)}>
                {selectedAnswer === 1 ? 'SELECTED' : 'select'}
                </button>
              </div>

              <div className={selectedAnswer === 2 ? 'answer selected' : 'answer'}>
              {quiz.answer2}
              <button onClick={() => selectAnswer(2)}>
              {selectedAnswer === 2 ? 'SELECTED' : 'select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={selectedAnswer ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = state => {
  console.log('states', state)
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, actions)(Quiz)