export default class File {

  constructor( parent, name ) {
    this.parent = parent
    this.children = null
    this.name = name
  }

  changeParentDirectory( parent ) {
    this.parent = parent
  }

}
