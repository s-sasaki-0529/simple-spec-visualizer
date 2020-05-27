import Group from './group'
import { STATUS } from './types'

export default class Example {
  // フィールド
  id: number
  expectation: string
  exception: string
  location: string
  runTime: number
  status: STATUS
  imageUrl: string

  // キャッシュ
  parents: any[]

  /**
   * @param {Group}  parent 親グループ
   * @param {string} name シナリオ名
   * @param {Object} params
   * @param {string} params.expectation 期待値
   * @param {string} params.location 元ソースコード
   * @param {number} params.runTime  実行時間
   * @param {status} params.status   結果種別
   */
  constructor(public parent: any, public name: string, params: any) {
    this.id = Math.random()
    this.expectation = params.expectation
    this.exception = params.exception
    this.location = params.location
    this.runTime = Math.round(params.run_time)
    this.status = params.status
    //    this.status = ['passed', 'failed', 'pending'][Number.parseInt((Math.random() * 1000) % 3)]
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

  getFullText(separator: string = ' > '): string {
    const names = this.getParents()
      .map(g => g.name)
      .reverse()
      .concat(this.name)
    return names.join(separator)
  }
}
