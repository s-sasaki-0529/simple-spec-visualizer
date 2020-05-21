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
    this.runTime = params.run_time
    this.status = ['passed', 'failed', 'pending'][Number.parseInt((Math.random() * 1000) % 3)]
    this.imageUrl = encodeURI(
      'https://studist-staging-documents.s3.amazonaws.com/snapshots/capybara/develop/e2e/actual/W001_グループID入力画面/グループID入力フォーム/値が空の場合/値が入力されてない旨のエラーが表示されている.png'
    )
  }

  /**
   * 親グループの一覧をルートまで遡って取得する
   */
  getParents() {
    return [this.parent].concat(this.parent.getParents())
  }

  /**
   * ルートグループを取得する
   */
  getRootGroup() {
    const parents = this.getParents()
    return parents[parents.length - 1]
  }
}
