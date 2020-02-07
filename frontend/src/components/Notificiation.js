import React from 'react'
import { connect } from 'react-redux'
import '../stylesheets/general.css'

const Notification = ( props ) => {



  if(props.notification === ''){
    return null
  }
  else{
    return(
      <div className='notification'>
        {props.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
