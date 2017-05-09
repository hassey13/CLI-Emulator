import React from 'react'

import Input from '../components/Input'
import Prompt from '../components/Prompt'

const InputForm = ({
  onSubmit,
  onChange,
  symbol,
  cwd,
  value
}) => (
    <form
      onSubmit={ onSubmit }>
        <Prompt
          cwd={ cwd}
          symbol={ symbol } />
        <Input
          onChange={ onChange }
          value={ value } />
    </form>
  )

export default InputForm
