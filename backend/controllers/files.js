var filesRouter = require('express').Router()



filesRouter.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  console.log(req.files)
  return res.status(200).send('All files uploaded.')
  
})
/*
filesRouter.post('/upload', (req, res, next) => {

  console.log(req.file)
  console.log(req.files)
  console.log(req.body)
})
*/
module.exports = filesRouter