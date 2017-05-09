const ADD_OUTPUT = 'ADD_OUTPUT'
const CLEAR_OUTPUT = 'CLEAR_OUTPUT'

export const addOutput = ( output ) => {
  return {
    type: ADD_OUTPUT,
    payload: output
  }
}

export const clearWindow = () => {
  return {
    type: CLEAR_OUTPUT,
    payload: ''
  }
}
