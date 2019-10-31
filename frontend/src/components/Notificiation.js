import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ( props ) => {



  if(props.notification === ''){
    return null
  }
  else{
    return(
      <div>
        {(props.notification &&
          <Alert variant='success'>
            {props.notification}
          </Alert>
        )}
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