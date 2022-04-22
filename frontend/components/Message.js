import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../state/action-creators'

export function Message(props) {
  const {infoMessage} = props
  return <div id="message">{infoMessage}</div>
}

const mapStateToProps = state => {
  console.log('states', state)
  return {
    infoMessage: state.infoMessage
  }
}

export default connect(mapStateToProps, actions)(Message)