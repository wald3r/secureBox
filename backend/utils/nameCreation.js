


const createDocumentName = (name, type) => {

  const types = type.split('/')
  const newName = name.replace(`.${types[1]}`, '')
  const date = new Date()
  const dateString = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
  return `${newName}_${dateString}.${types[1]}`


}


module.exports = { createDocumentName }