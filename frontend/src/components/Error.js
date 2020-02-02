import React from 'react'
import { connect } from 'react-redux'
import '../stylesheets/general.css'

const Error = ( props ) => {

  

  if(props.error === ''){    
    return null
  }
  else{
    return(
      <div className='error'>
        {props.error}  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
  }
}

export default connect(mapStateToProps, null)(Error)