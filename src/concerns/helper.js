import Directory from '../classes/Directory'
import File from '../classes/File'

export function hasDirectory( directory, dirName ) {
  for (var i = 0; i < directory.children.length; i++) {
    if ( directory.children[i].name === dirName && directory.children[i] instanceof Directory) {
      return true
    }
  }
  return false
}

export function hasFile( directory, fileName ) {
  for (var i = 0; i < directory.children.length; i++) {
    if ( directory.children[i].name === fileName && directory.children[i] instanceof File) {
      return true
    }
  }
  return false
}

export function hasDirectoryOrFile( directory, name ) {
  for (var i = 0; i < directory.children.length; i++) {
    if ( directory.children[i].name === name ) {
      return true
    }
  }
  return false
}

export function determineCommandIndex( state, action ) {
  let numberOfCommands = state.commands.length
  let index = state.commandsIndex

  if ( index === null ) return 0

  if ( action === 'up' ) {
    return index < numberOfCommands - 1 ? index + 1 : 0
  }
  else {
    return index > 0 ? index - 1 : 0
  }
}

export function autoComplete( dir, input ) {
  let instructions = input.split('/').filter(e => e !== '')
  let lastDirectoryName = instructions.pop()
  let directory = findDirectory( dir, instructions )
  let matches = []

  for (var i = 0; i < directory.children.length; i++) {
    if ( startsWith( directory.children[i].display, lastDirectoryName ) ) {
      if ( instructions.length > 0 ) {
        matches.push( `${instructions.join('/')}/${directory.children[i].display}` )
      }
      else {
        matches.push( `${directory.children[i].display}` )
      }
    }
  }
  return matches
}

export function startsWith( fullValue, partialValue ){
  return partialValue === fullValue.substr(0, partialValue.length )
}

export function findDirectory( dir, instructions ){
  if ( instructions.length > 0 ) {
    return dir.selectDirectory( instructions.join('/') )
  }
  else {
    return dir
  }
}
