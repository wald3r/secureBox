import { useState } from 'react'
import { connect } from 'react-redux'
import { handleNotification } from '../reducers/notificationReducer'
import { handleError } from '../reducers/errorReducer'


const SessionTimer = ( props ) => {


  const [events, setEvents] = useState(['load', 'mousemove', 'mousedown', 'click', 'scroll', 'keypress'])
  const [warningTime, setWarningTime] = useState(1000*60*2)
  const [signoutTime, setSignoutTime] = useState(1000*60*5)
  const [warnTimeout, setWarnTimeout] = useState('')
  const [logoutTimeout, setLogoutTimeout] = useState('')

  const setTimeout = () => {
    setWarnTimeout(setTimeout(window.alert('You will be logged out automatically in 1 minute'), warningTime))
    setLogoutTimeout(setTimeout(window.alert('You will be logged out automatically in 0 minute'), signoutTime))
  }

  const resetTimer = () => {
    if(warnTimeout){
      clearTimeout(warnTimeout)
    }
    if(logoutTimeout){
      clearTimeout(logoutTimeout)
    }
  }

  for(let a = 0; a < events.length; a++){
    window.addEventListener(events[a], resetTimer)
  }

}





const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  handleNotification,
  handleError,
}


export default connect(mapStateToProps, mapDispatchToProps)(SessionTimer)