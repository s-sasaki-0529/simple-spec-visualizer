import Group from './group'
import { STATUS } from './types'

export default class Example {
  // フィールド
  id: string
  expectation: string
  exception: string
  location: string
  runTime: number
  status: STATUS
  imageUrl: string

  // キャッシュ
  parents: any[]

  constructor(public parent: any, public name: string, params: any) {
    this.id = this.getFullText(',')
    this.expectation = params.expectation
    this.exception = params.exception
    this.location = params.location
    this.runTime = Math.round(params.run_time)
    this.status = params.status
    this.imageUrl = params.image_url
  }

  /**
   * 親グループの一覧をルートまで遡って取得する
   */
  getParents(): Group[] {
    if (this.parents !== undefined) return this.parents

    this.parents = [this.parent].concat(this.parent.getParents())
    return this.parents
  }

  /**
   * ルートグループを取得する
   */
  getRootGroup(): Group {
    const parents = this.getParents()
    return parents[parents.length - 1]
  }

  getAllNames(): string[] {
    return this.getParents()
      .map(g => g.name)
      .reverse()
      .concat(this.name)
  }

  getFullText(separator: string = ' > '): string {
    return this.getAllNames().join(separator)
  }
}
