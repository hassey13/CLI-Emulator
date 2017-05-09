import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { createRenderer } from 'react-test-renderer/shallow'
import expect from 'expect'
import expectJSX from 'expect-jsx'
expect.extend(expectJSX)

import Header from '../src/components/Header'
import Input from '../src/components/Input'
import InputForm from '../src/components/InputForm'
import Output from '../src/components/Output'
import OutputList from '../src/components/OutputList'
import Prompt from '../src/components/Prompt'

const renderer = createRenderer()

describe('Header Component', () => {
  it('renders correct text "CLI Application by Eric Hasselbring"', () => {
    renderer.render( <Header /> )
    const actual = renderer.getRenderOutput()
    const expected = 'CLI Application by Eric Hasselbring'
    expect( actual ).toIncludeJSX( expected )
  })
})

describe('Input Component', () => {
  it('renders correct input value "cd ./users"', () => {
    renderer.render( <Input value={'cd ./users'} /> )
    const actual = renderer.getRenderOutput()
    const expected = 'cd ./users'
    expect( actual ).toIncludeJSX( expected )
  })

  it('contains an input element', () => {
    renderer.render( <Input /> )
    const actual = renderer.getRenderOutput().type
    const expected = 'input'
    expect( actual ).toIncludeJSX( expected )
  })

  it('has a property for onChange', () => {
    renderer.render( <Input /> )
    const actual = 'onChange' in renderer.getRenderOutput().props
    const expected = true
    expect( actual ).toEqual( expected )
  })
})

describe('Prompt Component', () => {
  it('renders correct cwd value "root"', () => {
    renderer.render( <Prompt cwd={'root'} /> )
    const actual = renderer.getRenderOutput()
    const expected = 'root'
    expect( actual ).toIncludeJSX( expected )
  })

  it('renders correct symbol value ">>"', () => {
    renderer.render( <Prompt cwd={'>>'} /> )
    const actual = renderer.getRenderOutput()
    const expected = '>>'
    expect( actual ).toIncludeJSX( expected )
  })
})

describe('InputForm', () => {

  it('contains a form', () => {
    renderer.render( <InputForm /> )
    const actual = renderer.getRenderOutput().type
    const expected = 'form'
    expect( actual ).toIncludeJSX( expected )
  })

  it('renders the Prompt Component', () => {
    renderer.render( <InputForm /> )
    const actual = renderer.getRenderOutput().props.children[0].type.name
    const expected = 'Prompt'
    expect( actual ).toIncludeJSX( expected )
  })

  it('renders the Input Component', () => {
    renderer.render( <InputForm /> )
    const actual = renderer.getRenderOutput().props.children[1].type.name
    const expected = 'Input'
    expect( actual ).toIncludeJSX( expected )
  })

  it('has a property for onSubmit', () => {
    renderer.render( <InputForm /> )
    const actual = 'onSubmit' in renderer.getRenderOutput().props
    const expected = true
    expect( actual ).toEqual( expected )
  })

  it('handles cwd as a string', () => {
    renderer.render( <InputForm cwd={'root'} /> )
    const actual = renderer.getRenderOutput()
    const expected = 'root'
    expect( actual ).toIncludeJSX( expected )
  })

  it('handles symbol as a string', () => {
    renderer.render( <InputForm symbol={'>>'} /> )
    const actual = renderer.getRenderOutput()
    const expected = '>>'
    expect( actual ).toIncludeJSX( expected )
  })
})
