import { GroupOwnable } from './interfaces'
import Example from './example'
import { STATUS, SORT_KEY, SORT_ORDER } from './types'

export default class Group implements GroupOwnable {
  // フィールド
  id: number
  name: string
  examples: Example[]
  parent: Group
  groups: Group[]

  // キャッシュ
  parents: Group[]
  allExamples: Example[]
  totalExampleCount: number
  passedExampleCount: number
  failedExampleCount: number
  pendingExampleCount: number
  totalTime: number
  formattedTotalTime: string

  constructor(parent: Group, name: string, groupsSource: any) {
    this.parent = parent
    this.name = name
    this.id = Math.random()
    this.groups = []
    this.examples = []

    Object.keys(groupsSource).forEach(childName => {
      if (childName === '_examples') {
        this.examples = Object.keys(groupsSource['_examples']).map(exampleName => {
          return new Example(this, exampleName, groupsSource['_examples'][exampleName])
        })
      } else {
        this.groups.push(new Group(this, childName, groupsSource[childName]))
      }
    })
  }

  /**
   * グループリストをソートする
   */
  static sort(groups: Group[], key: SORT_KEY, order: SORT_ORDER, recursive: Boolean = true) {
    if (recursive) {
      groups.forEach(group => Group.sort(group.groups, key, order))
    }
    switch (key) {
      case 'Name':
        groups.sort((a, b) => ('' + a.name).localeCompare(b.name))
        break
      case 'Tests':
        groups.sort((a, b) => (a.getTotalExampleCount() > b.getTotalExampleCount() ? 1 : -1))
        break
      case 'Faileds':
        groups.sort((a, b) => (a.getFailedExampleCount() > b.getFailedExampleCount() ? 1 : -1))
        break
      case 'Time':
        groups.sort((a, b) => (a.getTotalTime() > b.getTotalTime() ? 1 : -1))
        break
      default:
        break
    }
    if (order === 'desc') {
      groups.reverse()
    }
  }

  /**
   * Exampleステータスに応じて自身とChildrenをフィルタリングする
   */
  filterByExampleStatus({ passed = true, failed = true, pending = true }): boolean {
    this.examples = this.examples.filter(example => {
      return (
        (passed && example.status === 'passed') ||
        (failed && example.status === 'failed') ||
        (pending && example.status === 'pending')
      )
    })

    this.groups = this.groups.filter(group => group.filterByExampleStatus({ passed, failed, pending }))
    return this.examples.length > 0 || this.groups.length > 0
  }

  /**
   *  キーワードに応じて自身とChildrenをフィルタリングする
   * FIXME: 絞り込み条件以外は filterByExampleStatus と一緒なので共通化する
   */
  filterByKeyword(keyword: string): boolean {
    this.examples = this.examples.filter(example => {
      return example.name.match(keyword) || example.expectation.match(keyword)
    })
    this.groups = this.groups.filter(group => group.filterByKeyword(keyword))
    return this.examples.length > 0 || this.groups.length > 0
  }

  /**
   * 先頭のExampleを取得する
   */
  firstExample(): Example {
    if (this.examples.length > 0) return this.examples[0]

    let result = null
    this.groups.forEach(group => {
      result = group.firstExample()
      if (result) return
    })

    return result
  }

  /**
   * 親グループの一覧をルートまで遡って取得する
   */
  getParents(): Group[] {
    if (this.parents !== undefined) return this.parents

    if (this.parent) {
      this.parents = [this.parent].concat(this.parent.getParents())
    } else {
      this.parents = []
    }

    return this.parents
  }

  /**
   * Examleのリストを、groupsを再帰的に走査して取得する
   */
  getAllExamples(): Example[] {
    if (this.allExamples !== undefined) return this.allExamples

    this.allExamples = this.examples.concat(this.groups.map(g => g.getAllExamples()).flat())
    return this.allExamples
  }

  /**
   * 指定した終了ステータスを持つExampleの個数を取得する
   */
  getExampleCount(status?: STATUS) {
    if (status) {
      return this.getAllExamples().filter(e => e.status === status).length
    } else {
      return this.getAllExamples().length
    }
  }

  /**
   * 全Example数を取得する
   */
  getTotalExampleCount(): number {
    if (this.totalExampleCount !== undefined) return this.totalExampleCount

    this.totalExampleCount = this.getExampleCount()
    return this.totalExampleCount
  }

  /**
   * 全成功Example数を取得する
   */
  getPassedExampleCount(): number {
    if (this.passedExampleCount !== undefined) return this.passedExampleCount

    this.passedExampleCount = this.getExampleCount('passed')
    return this.passedExampleCount
  }

  /**
   * 全失敗Example数を取得する
   */
  getFailedExampleCount(): number {
    if (this.failedExampleCount !== undefined) return this.failedExampleCount

    this.failedExampleCount = this.getExampleCount('failed')
    return this.failedExampleCount
  }

  /**
   * 全保留Example数を取得する
   */
  getPendingExampleCount(): number {
    if (this.pendingExampleCount !== undefined) return this.pendingExampleCount

    this.pendingExampleCount = this.getExampleCount('pending')
    return this.pendingExampleCount
  }

  /**
   * 総実行時間を取得する
   */
  getTotalTime(): number {
    if (this.totalTime !== undefined) return this.totalTime

    this.totalTime = 0
    this.groups.forEach(child => (this.totalTime += child.getTotalTime()))
    this.examples.forEach(example => (this.totalTime += example.runTime || 0))
    return this.totalTime
  }

  /**
   * 失敗したExampleの一覧を取得する
   */
  getFailedExamples(): Example[] {
    const failedExamples = this.examples.filter(e => e.status === 'failed')
    const childFailedExamples = this.groups.reduce((failedExamples, group) => {
      return failedExamples.concat(group.getFailedExamples())
    }, [])

    return failedExamples.concat(childFailedExamples)
  }

  /**
   * 実行時間をフォーマットした文字列を戻す
   * 未実行の場合00:00が戻るので注意
   */
  getFormattedTotalTime(): string {
    if (this.formattedTotalTime !== undefined) return this.formattedTotalTime

    const m = Math.floor(this.getTotalTime() / 60)
    const s = this.getTotalTime() % 60
    this.formattedTotalTime = `${('00' + String(m)).substr(-2)}:${('00' + String(s)).substr(-2)}`
    return this.formattedTotalTime
  }

  /**
   * ルートグループまで遡って、全てのグループ名を結合したフルネームを取得する
   */
  getFullNames(): string[] {
    return this.getParents()
      .reverse()
      .map(g => g.name)
      .concat(this.name)
  }
}
