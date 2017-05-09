import { hasDirectoryOrFile, hasFile } from '../concerns/helper'

export default function( action, args ){
    const directory = this.props.directory
    const firstArg = args[0]

    if ( args.length > 1 ) {
      let additionalArgs = args.slice(1,args.length).join(' ')
      this.props.actions.addOutput( { type: 'error', content: `cli: - Too many arguments. ${additionalArgs}: Additional arguments were ignored`, prompt: '' } )
    }

    switch ( action ) {
      case 'cd':
        if ( hasFile( directory, firstArg ) ) {
          this.props.actions.addOutput( { type: 'error', content: `cli: ${firstArg} is not a directory`, prompt: '' } )
        }
        else if ( !!directory.selectDirectory( firstArg) ) {
          this.props.actions.changeDirectory( directory, firstArg )
        }
        else {
          this.props.actions.addOutput( { type: 'error', content: `cli: ${firstArg} - No such file or directory`, prompt: '' } )
        }
        break

      case 'mkdir':
        if ( hasDirectoryOrFile( directory, firstArg)) {
          this.props.actions.addOutput( { type: 'error', content: `cli: ${firstArg} already exists`, prompt: '' } )
        }
        else {
          this.props.actions.addDirectory( directory, firstArg )
        }
        break

      case 'touch':
        if ( hasDirectoryOrFile( directory, firstArg)) {
          this.props.actions.addOutput( { type: 'error', content: `cli: ${firstArg} already exists`, prompt: '' } )
        }
        else {
          this.props.actions.addFile( directory, firstArg )
        }
        break

      case 'ls':
        this.props.actions.listChildren( directory )
        break

      case 'pwd':
        this.props.actions.printWorkingDirectory( directory )
        break

      case 'clear':
        this.props.actions.clearWindow()
        break

      default:
        let command = this.state.content.split(' ')[0]
        this.props.actions.addOutput( { type: 'error', content: `cli: ${command}: command not found`, prompt: '' } )
    }
  }
