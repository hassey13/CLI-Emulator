import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../components/Header'
import OutputWindow from './OutputWindow'
import CommandLine from './CommandLine'

import * as cliActions from '../actions/index'

class App extends Component {

  componentWillMount() {
    this.props.actions.initDirectory()
  }

  render() {
    const { directory, outputs, actions } = this.props

    if ( Object.keys(directory).length === 0 ) {
      return (<div>Initializing...</div>)
    }

    return (
      <div>
        <Header />
        <OutputWindow
          outputs={ outputs } />
        <CommandLine
          directory={ directory }
          actions={ actions } />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    directory: state.directory,
    outputs: state.outputs
  }
}

const mapDispatchToProps = ( dispatch ) => {
  return ({
    actions: bindActionCreators(cliActions, dispatch)
})}

export default connect(
  mapStateToProps,
  mapDispatchToProps)( App )
