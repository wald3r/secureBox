import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Error = ( props ) => {



  if(props.error === ''){
    return null
  }
  else{
    return(
      <div>
        {(props.error &&
        <Alert variant='danger'>
          {props.error}
        </Alert>
      )}
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  }
}

export default connect(mapStateToProps)(Error)