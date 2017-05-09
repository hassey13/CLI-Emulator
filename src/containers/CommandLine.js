import React, { Component } from 'react'

import InputForm from '../components/InputForm'

import dispatchCommandAction from '../concerns/dispatchCommandAction'
import { determineCommandIndex, autoComplete } from '../concerns/helper'

export default class CommandLine extends Component {

  constructor(){
    super()

    this.state = {
      content: '',
      commands: [],
      commandsIndex: null,
      autoCompleteIndex: null,
      autoComplete: []

    }

    this.handleInputChange = this.handleInputChange.bind( this )
    this.handleSubmit = this.handleSubmit.bind( this )
    this.handleKeyPress = this.handleKeyPress.bind( this )
    this.interpretCommand = this.interpretCommand.bind( this )
    this.logCommand = this.logCommand.bind( this )
    this.autoCompleteInput = this.autoCompleteInput.bind( this )
  }

  componentWillMount() {
    document.onkeydown = this.handleKeyPress
  }

  handleSubmit( event ){
    event.preventDefault()
    this.props.actions.addOutput( { type: 'normal', content: this.state.content, prompt: `${this.props.directory.display} >> ` } )
    this.interpretCommand( { content: this.state.content, prompt: `${this.props.directory} >> ` } )
    this.logCommand()
    this.resetInput()
  }

  handleKeyPress( event ) {
    event = event || window.event
    let keyPressed = event.keyCode

    switch (keyPressed) {
      case 38:
        if ( this.state.commands.length > 0 ) {
          this.setState({
            commandsIndex: determineCommandIndex( this.state, 'up'),
          })
          this.setState({
            content: `${this.state.commands[this.state.commandsIndex]}`
          })
        }

      break;

      case 40:
        if ( this.state.commands.length > 0 && this.state.commandsIndex ) {
          this.setState({
            commandsIndex: determineCommandIndex( this.state, 'down'),
          })
          this.setState({
            content: `${this.state.commands[this.state.commandsIndex]}`
          })
        }

      break;

      case 39:
      let splitCommand = this.state.content.split(' ').filter(e => e !== '')
      let command = splitCommand[0]
      let path = splitCommand[1]
        if ( this.state.autoComplete.length === 0 ) {
          if ( splitCommand.length === 2 ) {
            let matches = autoComplete( this.props.directory, path )
            this.setState({
              autoComplete: matches
            })
            this.autoCompleteInput( command )
          }
        }
        else {
          this.setState({
            autoCompleteIndex: this.state.autoCompleteIndex < this.state.autoComplete.length - 1 ? this.state.autoCompleteIndex + 1 : 0,
          })
          this.setState({
            content: `${ command } ${this.state.autoComplete[this.state.autoCompleteIndex]}`
          })
        }

      break;
      default:

    }
  }

  handleInputChange( event ){
    this.setState({
      content: event.target.value,
      autoComplete: [],
      autoCompleteIndex: null
    })
  }

  autoCompleteInput( command ) {
    if ( this.state.autoComplete.length > 0 ) {
      this.setState({
        content: `${ command } ${ this.state.autoComplete[0]}`,
        autoCompleteIndex: 0
      })
    }
  }

  resetInput() {
    this.setState( {
      content: '',
      commandsIndex: null
     } )
  }

  logCommand() {
    this.setState( { commands: [ this.state.content, ...this.state.commands ] } )
  }

  interpretCommand( command ){
    var  [ action, ...args ] = command.content.split(' ')
    dispatchCommandAction.call( this, action, args )
  }

  render() {

    return (
      <InputForm
        onSubmit={ this.handleSubmit }
        onChange={ this.handleInputChange }
        cwd={ this.props.directory.display }
        symbol={ ">>" }
        value={ this.state.content } />
    )
  }
}
