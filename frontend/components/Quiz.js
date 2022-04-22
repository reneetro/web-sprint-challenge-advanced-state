import React, { useEffect }  from 'react'
import {connect} from 'react-redux'
import * as actions from '../state/action-creators'

export function Quiz(props) {
const {quiz, selectAnswer, fetchQuiz, selectedAnswer, postAnswer } = props
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
              <div className={selectedAnswer === quiz.answer1Id ? 'answer selected' : 'answer'}>
                {quiz.answer1}
                <button onClick={() => selectAnswer(quiz.answer1Id)}>
                {selectedAnswer === quiz.answer1Id ? 'SELECTED' : 'select'}
                </button>
              </div>

              <div className={selectedAnswer === quiz.answer2Id ? 'answer selected' : 'answer'}>
              {quiz.answer2}
              <button onClick={() => selectAnswer(quiz.answer2Id)}>
              {selectedAnswer === quiz.answer2Id ? 'SELECTED' : 'select'}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" disabled={selectedAnswer ? false : true} onClick={() => postAnswer(quiz.quizId, selectedAnswer)}>Submit answer</button>
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