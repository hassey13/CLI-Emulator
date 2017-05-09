import File from './File'

export default class Directory {

  constructor( parentObj, name ) {
    this.name = name
    this.children = []

    switch (name) {
      case '.':
        this.parent = parentObj.parent
        this.children = parentObj.children
        this.display = parentObj.display
        break;

      case '..':
        if ( !!parentObj.parent ) {
          this.parent = parentObj.parent.parent
          this.children = parentObj.parent.children
          this.display = parentObj.parent.display
        }
        else {
          this.parent = parentObj.parent
          this.children = parentObj.children
          this.display = parentObj.display
        }
        break;

      default:
        this.display = this.name
        this.parent = parentObj
        this.children.push( new Directory( this , '.') )
        this.children.push( new Directory( this , '..') )
        break;
    }
  }

  addDirectory( dirName ) {
    let dir = new Directory( this, dirName )
    this.children.push( dir )
  }

  addFile( fileName ) {
    let file = new File( this, fileName )
    this.children.push( file )
  }

  findDirectory( dir, dirName ) {
    for (var i = 0; i < dir.children.length; i++) {
      if ( dir.children[i].name === dirName && dir.children[i] instanceof Directory) {
        return dir.children[i]
      }
    }
    return false
  }

  selectDirectory( path ) {
    let instructions = path.split('/').filter(e => e !== '')
    let index = 0
    let cwd = this

    if ( instructions[0] === "~" ) {
      while ( !!cwd.parent ) {
        cwd = cwd.parent
      }
      return cwd
    }

    while ( index < instructions.length  && !!cwd ) {
      cwd = this.findDirectory( cwd, instructions[index] )
      index++
    }
    return cwd
  }

  printWorkingDirectory() {
    let path = []
    let cwd = this

    while ( cwd.parent ) {
      path.unshift(cwd.display)
      cwd = cwd.parent
    }

    return `/${path.join('/')}`
  }

  listChildren() {
    let children = []

    for (var i = 0; i < this.children.length; i++) {
      if ( this.children[i].name[0] !== '.' ) { children.push( this.children[i].name ) }
    }
    return children
  }

}
