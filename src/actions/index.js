import * as directoryActions from './directoryActions'
import * as outputActions from './outputActions'

export const initDirectory = () => directoryActions.initDirectory()

export const changeDirectory = ( dir, path ) => directoryActions.changeDirectory( dir, path )
export const addDirectory = ( dir, name ) => directoryActions.addDirectory( dir, name )
export const addFile = ( dir, name ) => directoryActions.addFile( dir, name )
export const listChildren = ( dir ) => directoryActions.listChildren( dir )
export const printWorkingDirectory = ( dir ) => directoryActions.printWorkingDirectory( dir )

export const addOutput = ( output ) => outputActions.addOutput( output )
export const clearWindow = () => outputActions.clearWindow()
