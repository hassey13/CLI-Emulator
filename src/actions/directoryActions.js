import Directory from '../classes/Directory'

const INIT_DIRECTORY = 'INIT_DIRECTORY'
const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY'
const ADD_DIRECTORY = 'ADD_DIRECTORY'
const ADD_FILE = 'ADD_FILE'
const ADD_OUTPUT = 'ADD_OUTPUT'

export const initDirectory = () => {
  let dir = new Directory( null, 'root' )
  dir.addDirectory( 'users' )
  let users = dir.selectDirectory( 'users' )
  users.addDirectory( 'Eric' )
  let Eric = users.selectDirectory( 'Eric' )
  Eric.addDirectory( 'applications' )
  Eric.addDirectory( 'downloads' )
  Eric.addDirectory( 'documents' )
  Eric.addDirectory( 'projects' )
  let projects = Eric.selectDirectory( 'projects' )
  projects.addDirectory( 'rails-app' )
  projects.addDirectory( 'website' )
  let website = projects.selectDirectory( 'website' )
  website.addFile( 'index.html' )
  website.addFile( 'style.css' )
  website.addFile( 'index.js' )

  return {
    type: INIT_DIRECTORY,
    payload: dir
  }
}

export const addDirectory = ( dir, name ) => {
  dir.addDirectory( name )
  let response = dir

  return {
    type: ADD_DIRECTORY,
    payload: response
  }
}

export const addFile = ( dir, name ) => {
  dir.addFile( name )
  let response = dir

  return {
    type: ADD_FILE,
    payload: response
  }
}

export const changeDirectory = ( dir, path ) => {
  let response = dir.selectDirectory( path )

  return {
    type: CHANGE_DIRECTORY,
    payload: response
  }
}

export const listChildren = ( dir ) => {
  let list = dir.listChildren()
  let response = {type: 'normal', prompt: '', content: list.join('\xa0\xa0\xa0\xa0\xa0')}

  return {
    type: ADD_OUTPUT,
    payload: response
  }
}

export const printWorkingDirectory = ( dir ) => {
  let response = {type: 'normal', prompt: '', content: dir.printWorkingDirectory() }

  return {
    type: ADD_OUTPUT,
    payload: response
  }
}
