import Example from './example'

export default class Group {
  constructor(name, children) {
    this.name = name
    this.children = []
    this.examples = []

    Object.keys(children).forEach(childName => {
      if (childName === '_examples') {
        this.examples = Object.keys(children['_examples']).map(exampleName => {
          return new Example(exampleName, children['_examples'][exampleName])
        })
      } else {
        this.children.push(new Group(childName, children[childName]))
      }
    })
  }
}
