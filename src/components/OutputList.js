import React from 'react'
import Output from './Output'

const OutputList = ({
  outputs
}) => (
  <ul className='output-list'>
    { outputs.map( (output, i) => <Output key={ i } type={ output.type } content={ `${output.prompt} ${output.content}` } /> ) }
  </ul>
)

export default OutputList
