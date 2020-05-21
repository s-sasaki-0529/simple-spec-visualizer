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

  /**
   * 先頭のExampleを取得する
   */
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
    if (this.parents) return this.parents

    if (this.parent) {
      this.parents = [this.parent].concat(this.parent.getParents())
    } else {
      this.parents = []
    }

    return this.parents
  }

  /**
   * Examleのリストを、childrenを再帰的に走査して取得する
   * @return {[Example]}
   */
  getAllExamples() {
    if (this.allExamples) return this.allExamples

    this.allExamples = this.examples.concat(this.children.map(g => g.getAllExamples())).flat()
    return this.allExamples
  }

  /**
   * 正常終了したExampleの個数を取得する
   */
  getExampleCount(status = null) {
    if (status) {
      return this.getAllExamples().filter(e => e.status === status).length
    } else {
      return this.getAllExamples().length
    }
  }

  getTotalTime() {
    if (this.cachedTotalTime) return this.cachedTotalTime
  }
}
