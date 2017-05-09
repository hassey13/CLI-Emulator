import React, { Component } from 'react'
import { connect } from 'react-redux'

import OutputList from '../components/OutputList'

class OutputWindow extends Component {

  render() {
    const outputs = this.props.outputs

    return (
      <div className='output-window-container'>
        <OutputList outputs={ outputs } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    output: state.output
  }
}

export default connect( mapStateToProps , null )( OutputWindow )
