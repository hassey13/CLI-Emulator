import React from 'react'

const Prompt = ({
  cwd, symbol
}) => (
  <span className='prompt'>{ `${cwd} ${symbol} ` }</span>
)

export default Prompt
