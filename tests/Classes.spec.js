import expect from 'expect'

import Directory from '../src/classes/Directory'
import File from '../src/classes/File'

import { hasDirectory, hasFile, startsWith } from '../src/concerns/helper'

describe('directory functionality', () => {
  let root = new Directory( null, 'root')
  root.addDirectory( 'users' )

  it('should create a directory', () => {
    let users = new Directory( root, 'users')
    expect(users instanceof Directory).toEqual(true)
  })

  it('should have a name', () => {
    let users = new Directory( root, 'users')
    expect(users.name).toEqual('users')
  })

  it('should have a parent', () => {
    let users = new Directory( root, 'users')
    expect(users.parent.name).toEqual('root')
  })

  it('parent should have new directory as a child', () => {
    expect( hasDirectory( root, 'users' ) ).toEqual(true)
  })
})

describe('directory created with refs', () => {
  let root = new Directory( null, 'root')

  it('has a . directory', () => {
    expect(hasDirectory( root, '.' )).toEqual(true)
  })

  it('has a .. directory', () => {
    expect(hasDirectory( root, '..' )).toEqual(true)
  })
})

describe('. directory functionality', () => {
  let root = new Directory( null, 'root')
  let dot = root.selectDirectory('.')

  it('has the correct display name', () => {
    expect( dot.display ).toEqual( 'root' )
  })

  it('has the correct parent name', () => {
    expect( dot.parent ).toEqual( null )
  })

  it('has the correct children', () => {
    expect( dot.children.length ).toEqual( 2 )
    expect( dot.children[0].name ).toEqual( '.' )
    expect( dot.children[1].name ).toEqual( '..' )
  })

})

describe('selectDirectory function', () => {
  let root = new Directory( null, 'root')
  root.addDirectory( 'users' )
  let users = root.selectDirectory( 'users' )
  users.addDirectory( 'ExecThread')
  let exec = users.selectDirectory( 'ExecThread')
  exec.addFile( 'readme.md' )

  it('can return a directory that is a direct child', () => {
    expect( root.selectDirectory( 'users' ).name ).toEqual( 'users' )
  })

  it('returns false if a directory is not a direct child', () => {
    expect( root.selectDirectory( 'ExecThread' ) ).toEqual( false )
  })

  it('select a directory if given path', () => {
    expect( root.selectDirectory( 'users/ExecThread' ).name ).toEqual( 'ExecThread' )
  })

  it('select a directory if given path with preceeding .', () => {
    expect( root.selectDirectory( './users/ExecThread' ).name ).toEqual( 'ExecThread' )
  })

  it('select a directory if given path with preceeding ..', () => {
    expect( users.selectDirectory( '../users/ExecThread' ).name ).toEqual( 'ExecThread' )
  })

  it('select a directory if given path with proceeding /', () => {
    expect( users.selectDirectory( './ExecThread/' ).name ).toEqual( 'ExecThread' )
  })

  it('can take a valid but strange path', () => {
    expect( users.selectDirectory( './ExecThread/..' ).display ).toEqual( 'users' )
  })

  it('can take a valid but really strange path', () => {
    expect( users.selectDirectory( './ExecThread/../../users/././..' ).display ).toEqual( 'root' )
  })

  it('returns false for an invalid path', () => {
    expect( root.selectDirectory( './ExecThread' ) ).toEqual( false )
    expect( root.selectDirectory( './ExecThread/' ) ).toEqual( false )
  })

  it('.. on root returns root', () => {
    expect( root.selectDirectory( '..' ).display ).toEqual( 'root' )
  })

  it('~ returns root from root', () => {
    expect( root.selectDirectory( '~' ).display ).toEqual( 'root' )
  })

  it('~ returns root', () => {
    expect( exec.selectDirectory( '~' ).display ).toEqual( 'root' )
  })

  it('cannot select a file', () => {
    expect( exec.selectDirectory( 'readme.md' ) ).toEqual( false )
  })
})

describe('create a file in a directory', () => {
  let root = new Directory( null, 'root')
  root.addFile( 'Readme.md')

  it('file has the correct parent directory', () => {
    expect( hasFile( root, 'Readme.md') ).toEqual(true)
  })

  it('parent has the file as a child', () => {
    expect( root.children[2].name ).toEqual('Readme.md')
  })
})

describe('print working directory', () => {
  let root = new Directory( null, 'root')
  root.addDirectory( 'Users' )
  let users = root.selectDirectory( 'Users' )
  users.addDirectory( 'ExecThread')
  let exec = users.selectDirectory( 'ExecThread')

  it('output correctly matches the location', () => {
    expect( exec.printWorkingDirectory() ).toEqual('/Users/ExecThread')
  })
})

describe('print children', () => {
  let root = new Directory( null, 'root')
  root.addDirectory( 'Users' )
  root.addFile( 'readme.md' )

  it('lists the children as strings in an array', () => {
    expect( root.listChildren() ).toEqual(['Users', 'readme.md'])
  })
})

describe('starts with', () => {

  it('returns the boolean value', () => {
    expect( startsWith( "hello", "hel" ) ).toEqual( true )
    expect( startsWith( "hello", "el" ) ).toEqual( false )
  })
})
