import Group from './group'
export default class Example {
  /**
   * @param {Group}  parent 親グループ
   * @param {string} name シナリオ名
   * @param {Object} params
   * @param {string} params.expectation 期待値
   * @param {string} params.location 元ソースコード
   * @param {number} params.runTime  実行時間
   * @param {status} params.status   結果種別
   */
  constructor(parent, name, params) {
    this.parent = parent
    this.id = Math.random()
    this.name = name
    this.expectation = params.expectation
    this.location = params.location
    this.runTime = Math.round(params.run_time)
    this.status = params.status
    // this.status = ['passed', 'failed', 'pending'][Number.parseInt((Math.random() * 1000) % 3)]
    this.imageUrl = params.image_url
  }

  /**
   * 親グループの一覧をルートまで遡って取得する
   */
  getParents() {
    if (this.parents !== undefined) return this.parents

    this.parents = [this.parent].concat(this.parent.getParents())
    return this.parents
  }

  /**
   * ルートグループを取得する
   */
  getRootGroup() {
    const parents = this.getParents()
    return parents[parents.length - 1]
  }
}
