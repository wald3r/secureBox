import parameter from './parameter'



const catchException = (error, props) => {
  if(error.response){
    props.handleError(error.response.data, parameter.errorTime)
  }
  else if(error.request){
    props.handleError(error.request.data, parameter.errorTime)
  }else{
    props.handleError(error.message, parameter.errorTime)
  }
  console.error(error)
}







export default { catchException }