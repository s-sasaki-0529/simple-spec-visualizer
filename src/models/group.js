import Example from './example'

export default class Group {
  constructor(parent, name, children) {
    this.parent = parent
    this.id = Math.random()
    this.name = name
    this.children = []
    this.examples = []

    Object.keys(children).forEach(childName => {
      if (childName === '_examples') {
        this.examples = Object.keys(children['_examples']).map(exampleName => {
          return new Example(this, exampleName, children['_examples'][exampleName])
        })
      } else {
        this.children.push(new Group(this, childName, children[childName]))
      }
    })
  }

  firstExample() {
    if (this.examples.length > 0) return this.examples[0]

    let result = null
    this.children.forEach(group => {
      result = group.firstExample()
      if (result) return
    })

    return result
  }

  /**
   * 親グループの一覧をルートまで遡って取得する
   * @return {[Group]}
   */
  getParents() {
    if (this.parent) {
      return [this.parent].concat(this.parent.getParents())
    } else {
      return []
    }
  }
}
