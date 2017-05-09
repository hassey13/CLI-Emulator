import React from 'react'

const Input = ({
  onChange,
  value
}) => (
  <input type='text' className='input' onChange={ onChange } placeholder={ 'Type a command...' } value={ value } />
)

export default Input
