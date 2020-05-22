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
   * Exampleステータスに応じて自身とChildrenをフィルタリングする
   * @param {Object} params
   * @param {boolean} params.passed
   * @param {boolean} params.failed
   * @param {boolean} params.pending
   */
  filterByExampleStatus({ passed = true, failed = true, pending = true }) {
    this.examples = this.examples.filter(example => {
      return (
        (passed && example.status === 'passed') ||
        (failed && example.status === 'failed') ||
        (pending && example.status === 'pending')
      )
    })

    this.children = this.children.filter(group => group.filterByExampleStatus({ passed, failed, pending }))
    return this.examples.length > 0 || this.children.length > 0
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
    if (this.parents !== undefined) return this.parents

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
    if (this.allExamples !== undefined) return this.allExamples

    this.allExamples = this.examples.concat(this.children.map(g => g.getAllExamples())).flat()
    return this.allExamples
  }

  /**
   * 指定した終了ステータスを持つExampleの個数を取得する
   */
  getExampleCount(status = null) {
    if (status) {
      return this.getAllExamples().filter(e => e.status === status).length
    } else {
      return this.getAllExamples().length
    }
  }

  /**
   * 全Example数を取得する
   */
  getTotalExampleCount() {
    if (this.totalExampleCount !== undefined) return this.totalExampleCount

    this.totalExampleCount = this.getExampleCount()
    return this.totalExampleCount
  }

  /**
   * 全成功Example数を取得する
   */
  getPassedExampleCount() {
    if (this.passedExampleCount !== undefined) return this.passedExampleCount

    this.passedExampleCount = this.getExampleCount('passed')
    return this.passedExampleCount
  }

  /**
   * 全失敗Example数を取得する
   */
  getFailedExampleCount() {
    if (this.failedExampleCount !== undefined) return this.failedExampleCount

    this.failedExampleCount = this.getExampleCount('failed')
    return this.failedExampleCount
  }

  /**
   * 全保留Example数を取得する
   */
  getPendingExampleCount() {
    if (this.pendingExampleCount !== undefined) return this.pendingExampleCount

    this.pendingExampleCount = this.getExampleCount('pending')
    return this.pendingExampleCount
  }

  /**
   * 総実行時間を取得する
   */
  getTotalTime() {
    if (this.totalTime !== undefined) return this.totalTime

    this.totalTime = 0
    this.children.forEach(child => (this.totalTime += child.getTotalTime()))
    this.examples.forEach(example => (this.totalTime += example.runTime || 0))
    return this.totalTime
  }

  /**
   * 実行時間をフォーマットした文字列を戻す
   * 未実行の場合00:00が戻るので注意
   */
  getFormattedTotalTime() {
    if (this.formattedTotalTime !== undefined) return this.formattedTotalTime

    const m = Math.round(this.getTotalTime() / 60)
    const s = this.getTotalTime() % 60
    this.formattedTotalTime = `${('00' + String(m)).substr(-2)}:${('00' + String(s)).substr(-2)}`
    return this.formattedTotalTime
  }

  /**
   * 指定したステータスを持ったExampleを一つ以上所有しているか
   * @param {'passed'|'pending'|'failed'} status
   */
  hasExampleByStatus(status) {
    return this.examples.some(e => e.status === status) || this.children.some(c => c.hasExampleByStatus(status))
  }
}
